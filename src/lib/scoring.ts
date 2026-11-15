import { LIGHT_ITEMS, type QuizItem } from '../data/items'

export type StyleCode = 'S1' | 'S2' | 'S3' | 'S4' | 'S5' | 'S6'

export interface StyleInfo {
  code: StyleCode
  name: string
  blurb: string
}

export const STYLE_CATALOG: Record<StyleCode, StyleInfo> = {
  S1: {
    code: 'S1',
    name: '同频协作型',
    blurb: '沟通与修复都偏顺，张力信号不高——你更像在「一起把事谈清楚」的轨道上。',
  },
  S2: {
    code: 'S2',
    name: '温柔投入型',
    blurb: '善意与投入很足，冲突处理偏软；把在意说得更清楚，对方会更容易接到。',
  },
  S3: {
    code: 'S3',
    name: '对齐讨论型',
    blurb: '总体还愿意靠近，但关键感受可能差一截——需要双方数据才能确认是否同频。',
  },
  S4: {
    code: 'S4',
    name: '修复练习型',
    blurb:
      '你很愿意把关系放在心上；当前更卡在「吵完以后怎么接上话」，而不是「要不要继续」。',
  },
  S5: {
    code: 'S5',
    name: '冷静抽离型',
    blurb: '升温时更常选择暂停或拉开距离；把「需要一点时间」说出口，会比直接消失更稳。',
  },
  S6: {
    code: 'S6',
    name: '高温拉锯型',
    blurb: '淹没、批评或防御的信号相对突出；先降温再谈，比硬撑着说完更有用。',
  },
}

export interface DiscussionCard {
  title: string
  prompt: string
}

export interface PersonalReport {
  style: StyleInfo
  tint?: string
  cards: DiscussionCard[]
  constructs: Record<string, number>
  flow: number
  tension: number
  warm: number
  attnPassed: boolean
  caveatFallback: boolean
}

export type AnswerMap = Record<string, number | string>

function mean(values: number[]): number {
  if (values.length === 0) return NaN
  return values.reduce((a, b) => a + b, 0) / values.length
}

function scoredValue(item: QuizItem, raw: number): number {
  if (item.reverse) return 6 - raw
  return raw
}

/** 构念均值（reverse 已处理）；DEMO / ATTN 不计 */
export function computeConstructMeans(answers: AnswerMap): Record<string, number> {
  const buckets: Record<string, number[]> = {}
  for (const item of LIGHT_ITEMS) {
    if (!item.scored) continue
    const raw = answers[item.itemId]
    if (typeof raw !== 'number') continue
    const v = scoredValue(item, raw)
    if (!buckets[item.constructId]) buckets[item.constructId] = []
    buckets[item.constructId].push(v)
  }
  const out: Record<string, number> = {}
  for (const [k, vals] of Object.entries(buckets)) {
    out[k] = mean(vals)
  }
  return out
}

function axisMean(constructs: Record<string, number>, ids: string[]): number {
  const vals = ids.map((id) => constructs[id]).filter((v) => !Number.isNaN(v))
  return mean(vals)
}

/**
 * LIGHT 个人路径 · 轴 A · 按序命中即停
 * 见 docs/style-scoring-rules-light.md §3.1
 */
export function matchPersonalStyle(
  constructs: Record<string, number>,
): { code: StyleCode; caveatFallback: boolean; tint?: string } {
  const flow = axisMean(constructs, [
    'P-COMM',
    'P-CONF',
    'P-SOOTH',
    'P-EFF',
    'P-BOUND',
  ])
  const tension = axisMean(constructs, [
    'P-CRIT',
    'P-DEF',
    'P-STONE',
    'P-FLOOD',
  ])
  const warm = axisMean(constructs, ['P-EFF', 'I-KIND'])
  const pEff = constructs['P-EFF'] ?? NaN
  const pComm = constructs['P-COMM'] ?? NaN
  const pConf = constructs['P-CONF'] ?? NaN
  const pSooth = constructs['P-SOOTH'] ?? NaN
  const pCrit = constructs['P-CRIT'] ?? NaN
  const pDef = constructs['P-DEF'] ?? NaN
  const pStone = constructs['P-STONE'] ?? NaN
  const pFlood = constructs['P-FLOOD'] ?? NaN

  // 1 S6
  if (
    tension >= 3.8 ||
    pFlood >= 3.8 ||
    (pCrit >= 3.0 && pDef >= 3.0 && (pCrit >= 3.8 || pDef >= 3.8))
  ) {
    return { code: 'S6', caveatFallback: false }
  }

  // 2 S5
  if (pStone >= 3.0 && pSooth <= 3.7 && pStone >= pFlood) {
    return { code: 'S5', caveatFallback: false }
  }

  // 3 S4
  if ((warm >= 3.0 || pEff >= 3.0) && (pConf <= 3.7 || pSooth <= 3.7)) {
    return { code: 'S4', caveatFallback: false }
  }

  // 4 S2
  const tensionDimsLow = [pCrit, pDef, pStone, pFlood].every(
    (v) => Number.isNaN(v) || v <= 3.2,
  )
  if (
    pEff >= 3.8 &&
    (tension <= 2.9 || tensionDimsLow) &&
    pComm >= 3.0
  ) {
    return { code: 'S2', caveatFallback: false }
  }

  // 5 S1
  if (flow >= 3.8 && tension <= 2.9) {
    return { code: 'S1', caveatFallback: false }
  }

  // 兜底 S4
  return {
    code: 'S4',
    caveatFallback: true,
    tint: '更适合当讨论开场，不是盖章',
  }
}

function cardsForStyle(code: StyleCode): DiscussionCard[] {
  const byStyle: Record<StyleCode, DiscussionCard[]> = {
    S1: [
      {
        title: '守护你已在做的',
        prompt: '最近一次你们把误会及时说开，是怎么做到的？想不想刻意再来一次？',
      },
      {
        title: '让顺畅被看见',
        prompt: '有没有一件小事，你希望伴侣也注意到你在维护关系？试着直接说出来。',
      },
      {
        title: '预留修复口令',
        prompt: '即便现在偏顺，你们能否先约定一个「先缓一缓」的口令，以备升温时用？',
      },
    ],
    S2: [
      {
        title: '守护你已在做的',
        prompt: '最近一次你主动为关系做的小事是什么？想不想让对方也「被你看见」一次？',
      },
      {
        title: '把在意说清楚',
        prompt: '有没有一件事你其实很在意，但还没直接说过？用一句「我希望…」试一次。',
      },
      {
        title: '冲突也温柔',
        prompt: '下次意见不合时，你们能否先复述对方的意思，再表达自己的立场？',
      },
    ],
    S3: [
      {
        title: '对齐感受',
        prompt: '有没有一件事，你们各自的感受差一截？试着各说一分钟，不急着说服。',
      },
      {
        title: '核对理解',
        prompt: '下次讨论重要事时，先确认「我听懂的是…」，再表达立场，好吗？',
      },
      {
        title: '邀请对照',
        prompt: '伴侣独立答完后，再一起看哪一维落差最大——仍当讨论开场，不是对质。',
      },
    ],
    S4: [
      {
        title: '守护你已在做的',
        prompt: '最近一次你主动为关系做的小事是什么？想不想让对方也「被你看见」一次？',
      },
      {
        title: '练习接回',
        prompt:
          '下次紧张时，你们能否约定一个暂停口令，并说好「谁先开口」轮流来？',
      },
      {
        title: '说清楚需求',
        prompt:
          '有没有一件事，你其实希望对方懂，但还没直接说过？用一句「我希望…」试一次。',
      },
    ],
    S5: [
      {
        title: '把抽离说出口',
        prompt: '下次想拉开距离时，能否先说「我需要 X 分钟」，再约定回来的时间？',
      },
      {
        title: '练习接回',
        prompt: '冷静之后，谁先开口更自然？试着轮流当「接回的人」。',
      },
      {
        title: '小安抚',
        prompt: '激烈讨论后，有没有一件小事能让彼此安心（喝水、散步、简短拥抱）？',
      },
    ],
    S6: [
      {
        title: '先降温',
        prompt: '下次感到心跳加速或想立刻结束时，能否先用暂停口令，而不是硬撑？',
      },
      {
        title: '具体事，不评价人',
        prompt: '争执时，试着只谈这一件事，避免「你总是／你从不」这类说法。',
      },
      {
        title: '先听完再解释',
        prompt: '被指出问题时，能否先复述对方的感受，再解释你的意图？',
      },
    ],
  }
  return byStyle[code]
}

export function buildPersonalReport(answers: AnswerMap): PersonalReport {
  const constructs = computeConstructMeans(answers)
  const flow = axisMean(constructs, [
    'P-COMM',
    'P-CONF',
    'P-SOOTH',
    'P-EFF',
    'P-BOUND',
  ])
  const tension = axisMean(constructs, [
    'P-CRIT',
    'P-DEF',
    'P-STONE',
    'P-FLOOD',
  ])
  const warm = axisMean(constructs, ['P-EFF', 'I-KIND'])
  const match = matchPersonalStyle(constructs)
  const style = STYLE_CATALOG[match.code]
  const attnRaw = answers['ATTN-M01']
  const attnPassed = attnRaw === 4

  return {
    style,
    tint: match.tint,
    cards: cardsForStyle(match.code),
    constructs,
    flow,
    tension,
    warm,
    attnPassed,
    caveatFallback: match.caveatFallback,
  }
}
