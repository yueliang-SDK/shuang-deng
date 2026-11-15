export type ScaleType =
  | 'freq_5'
  | 'agree_5'
  | 'sat_5'
  | 'demo_age'
  | 'demo_status'
  | 'demo_duration'
  | 'demo_invite'

export type LightRole =
  | 'demo'
  | 'warmth'
  | 'flex'
  | 'belief'
  | 'process'
  | 'tension'
  | 'outcome'
  | 'attn'

export interface QuizItem {
  itemId: string
  constructId: string
  lightRole: LightRole
  scale: ScaleType
  reverse: boolean
  stemZh: string
  scored: boolean
}

export interface ChoiceOption {
  value: number | string
  label: string
}

const FREQ_5: ChoiceOption[] = [
  { value: 1, label: '几乎从不' },
  { value: 2, label: '很少' },
  { value: 3, label: '有时' },
  { value: 4, label: '经常' },
  { value: 5, label: '几乎总是' },
]

const AGREE_5: ChoiceOption[] = [
  { value: 1, label: '非常不同意' },
  { value: 2, label: '不同意' },
  { value: 3, label: '中立' },
  { value: 4, label: '同意' },
  { value: 5, label: '非常同意' },
]

const SAT_5: ChoiceOption[] = [
  { value: 1, label: '非常不满意' },
  { value: 2, label: '不太满意' },
  { value: 3, label: '一般' },
  { value: 4, label: '比较满意' },
  { value: 5, label: '非常满意' },
]

const DEMO_AGE: ChoiceOption[] = [
  { value: '18-24', label: '18–24 岁' },
  { value: '25-34', label: '25–34 岁' },
  { value: '35-44', label: '35–44 岁' },
  { value: '45-54', label: '45–54 岁' },
  { value: '55+', label: '55 岁及以上' },
]

const DEMO_STATUS: ChoiceOption[] = [
  { value: 'dating', label: '认真约会' },
  { value: 'cohabiting', label: '同居' },
  { value: 'engaged', label: '订婚或筹备婚礼' },
  { value: 'married', label: '已婚' },
  { value: 'other', label: '其他' },
]

const DEMO_DURATION: ChoiceOption[] = [
  { value: '<6m', label: '不到半年' },
  { value: '6m-1y', label: '半年到一年' },
  { value: '1-3y', label: '一到三年' },
  { value: '3-7y', label: '三到七年' },
  { value: '7y+', label: '七年以上' },
]

const DEMO_INVITE: ChoiceOption[] = [
  { value: 'yes', label: '希望邀请' },
  { value: 'maybe', label: '稍后再说' },
  { value: 'no', label: '这次先自己答' },
]

export function optionsForScale(scale: ScaleType): ChoiceOption[] {
  switch (scale) {
    case 'freq_5':
      return FREQ_5
    case 'agree_5':
      return AGREE_5
    case 'sat_5':
      return SAT_5
    case 'demo_age':
      return DEMO_AGE
    case 'demo_status':
      return DEMO_STATUS
    case 'demo_duration':
      return DEMO_DURATION
    case 'demo_invite':
      return DEMO_INVITE
  }
}

/** LIGHT ≈40 题 · 来源 docs/light-item-bank.csv */
export const LIGHT_ITEMS: QuizItem[] = [
  {
    itemId: 'DEMO-M01',
    constructId: 'DEMO',
    lightRole: 'demo',
    scale: 'demo_age',
    reverse: false,
    stemZh: '你的年龄段是？',
    scored: false,
  },
  {
    itemId: 'DEMO-M02',
    constructId: 'DEMO',
    lightRole: 'demo',
    scale: 'demo_status',
    reverse: false,
    stemZh:
      '你目前的关系状态更接近下列哪一项？（认真约会 / 同居 / 订婚或筹备婚礼 / 已婚 / 其他）',
    scored: false,
  },
  {
    itemId: 'DEMO-M03',
    constructId: 'DEMO',
    lightRole: 'demo',
    scale: 'demo_duration',
    reverse: false,
    stemZh: '你与当前伴侣认识大约多久了？',
    scored: false,
  },
  {
    itemId: 'DEMO-M08',
    constructId: 'DEMO',
    lightRole: 'demo',
    scale: 'demo_invite',
    reverse: false,
    stemZh:
      '完成这份问卷时，你是否希望邀请伴侣也独立完成一份？（不影响你现在作答）',
    scored: false,
  },
  {
    itemId: 'I-KIND-S01',
    constructId: 'I-KIND',
    lightRole: 'warmth',
    scale: 'freq_5',
    reverse: false,
    stemZh: '过去三个月，当伴侣明显疲惫时，我会主动分担一些日常事务。',
    scored: true,
  },
  {
    itemId: 'I-KIND-S02',
    constructId: 'I-KIND',
    lightRole: 'warmth',
    scale: 'freq_5',
    reverse: false,
    stemZh: '过去三个月，我会记得伴侣提过的小事，并在合适的时候回应或兑现。',
    scored: true,
  },
  {
    itemId: 'I-KIND-S03',
    constructId: 'I-KIND',
    lightRole: 'warmth',
    scale: 'freq_5',
    reverse: false,
    stemZh: '过去三个月，伴侣心情不好时，我会先表达关心，而不是急着讲道理。',
    scored: true,
  },
  {
    itemId: 'I-KIND-S04',
    constructId: 'I-KIND',
    lightRole: 'warmth',
    scale: 'freq_5',
    reverse: false,
    stemZh:
      '过去三个月，我会特意做一些能让伴侣感到被在意的小事（不必花费很多）。',
    scored: true,
  },
  {
    itemId: 'I-FLEX-S01',
    constructId: 'I-FLEX',
    lightRole: 'flex',
    scale: 'agree_5',
    reverse: false,
    stemZh: '计划突然改变时，我通常能较快调整期待，而不是长时间卡在不满里。',
    scored: true,
  },
  {
    itemId: 'I-FLEX-S02',
    constructId: 'I-FLEX',
    lightRole: 'flex',
    scale: 'agree_5',
    reverse: false,
    stemZh: '和伴侣习惯不同时，我愿意试着找到双方都能接受的折中办法。',
    scored: true,
  },
  {
    itemId: 'I-BEL-M01',
    constructId: 'I-BEL',
    lightRole: 'belief',
    scale: 'agree_5',
    reverse: false,
    stemZh:
      '我认为亲密关系中，发生分歧时「先冷静再谈」比「当场必须说清楚」更重要。',
    scored: true,
  },
  {
    itemId: 'I-BEL-M02',
    constructId: 'I-BEL',
    lightRole: 'belief',
    scale: 'agree_5',
    reverse: false,
    stemZh:
      '我认为伴侣之间应当几乎天天分享彼此的心事，否则关系就不够亲密。',
    scored: true,
  },
  {
    itemId: 'P-COMM-S01',
    constructId: 'P-COMM',
    lightRole: 'process',
    scale: 'freq_5',
    reverse: false,
    stemZh: '过去三个月，我能把需求说清楚，而不是指望伴侣自己猜到。',
    scored: true,
  },
  {
    itemId: 'P-COMM-S02',
    constructId: 'P-COMM',
    lightRole: 'process',
    scale: 'freq_5',
    reverse: false,
    stemZh:
      '过去三个月，讨论重要事情时，我会先确认自己听懂了伴侣的意思，再表达立场。',
    scored: true,
  },
  {
    itemId: 'P-COMM-S03',
    constructId: 'P-COMM',
    lightRole: 'process',
    scale: 'freq_5',
    reverse: false,
    stemZh: '过去三个月，伴侣提起感受时，我能认真听完，而不是急着反驳。',
    scored: true,
  },
  {
    itemId: 'P-COMM-S04',
    constructId: 'P-COMM',
    lightRole: 'process',
    scale: 'freq_5',
    reverse: false,
    stemZh: '过去三个月，我们能用微信或当面把误会及时说开，而不是闷着积怨。',
    scored: true,
  },
  {
    itemId: 'P-COMM-S05',
    constructId: 'P-COMM',
    lightRole: 'process',
    scale: 'freq_5',
    reverse: true,
    stemZh:
      '过去三个月，我常用讽刺、暗示或「你应该懂」的方式表达不满，而不是直接说。',
    scored: true,
  },
  {
    itemId: 'P-CONF-S01',
    constructId: 'P-CONF',
    lightRole: 'process',
    scale: 'freq_5',
    reverse: false,
    stemZh:
      '争吵过后，我通常会主动发起或回应修补（例如道歉、澄清、约定下次怎么做）。',
    scored: true,
  },
  {
    itemId: 'P-CONF-S02',
    constructId: 'P-CONF',
    lightRole: 'process',
    scale: 'freq_5',
    reverse: false,
    stemZh: '冲突升温时，我能提出暂停，并在冷静后回来继续谈。',
    scored: true,
  },
  {
    itemId: 'P-CONF-S03',
    constructId: 'P-CONF',
    lightRole: 'process',
    scale: 'freq_5',
    reverse: false,
    stemZh: '意见不合时，我愿意在非原则问题上做一些让步。',
    scored: true,
  },
  {
    itemId: 'P-CONF-S04',
    constructId: 'P-CONF',
    lightRole: 'process',
    scale: 'freq_5',
    reverse: true,
    stemZh: '吵完以后，我倾向于装作没事，但心里仍耿耿于怀，很少真正收尾。',
    scored: true,
  },
  {
    itemId: 'P-CRIT-S01',
    constructId: 'P-CRIT',
    lightRole: 'tension',
    scale: 'freq_5',
    reverse: false,
    stemZh: '过去三个月，争执时我会从具体事情滑向评价伴侣「整个人怎么样」。',
    scored: true,
  },
  {
    itemId: 'P-CRIT-S02',
    constructId: 'P-CRIT',
    lightRole: 'tension',
    scale: 'freq_5',
    reverse: false,
    stemZh: '过去三个月，我会用「你总是／你从不」这类绝对化说法指责伴侣。',
    scored: true,
  },
  {
    itemId: 'P-DEF-S01',
    constructId: 'P-DEF',
    lightRole: 'tension',
    scale: 'freq_5',
    reverse: false,
    stemZh:
      '过去三个月，伴侣指出我的问题时，我第一反应常常是解释或反驳，而不是先听完。',
    scored: true,
  },
  {
    itemId: 'P-DEF-S03',
    constructId: 'P-DEF',
    lightRole: 'tension',
    scale: 'freq_5',
    reverse: true,
    stemZh: '过去三个月，被指出疏忽时，我能承认自己有做得不够的地方。',
    scored: true,
  },
  {
    itemId: 'P-STONE-S01',
    constructId: 'P-STONE',
    lightRole: 'tension',
    scale: 'freq_5',
    reverse: false,
    stemZh: '冲突升温时，我会长时间不回应消息或回避当面交谈。',
    scored: true,
  },
  {
    itemId: 'P-STONE-S03',
    constructId: 'P-STONE',
    lightRole: 'tension',
    scale: 'freq_5',
    reverse: true,
    stemZh: '即使想冷静，我也会告诉伴侣「我需要一点时间」，而不是直接消失。',
    scored: true,
  },
  {
    itemId: 'P-FLOOD-S01',
    constructId: 'P-FLOOD',
    lightRole: 'tension',
    scale: 'freq_5',
    reverse: false,
    stemZh: '冲突中我有时会感到心跳加速、脑子空白，一时说不出有条理的话。',
    scored: true,
  },
  {
    itemId: 'P-FLOOD-S02',
    constructId: 'P-FLOOD',
    lightRole: 'tension',
    scale: 'freq_5',
    reverse: false,
    stemZh: '争吵激烈时，我会感到「再谈下去会失控」，只想立刻结束对话。',
    scored: true,
  },
  {
    itemId: 'P-SOOTH-S01',
    constructId: 'P-SOOTH',
    lightRole: 'process',
    scale: 'freq_5',
    reverse: false,
    stemZh: '过去三个月，冲突紧张时，我会尝试用缓和语气或约定的暂停口令来降温。',
    scored: true,
  },
  {
    itemId: 'P-SOOTH-S02',
    constructId: 'P-SOOTH',
    lightRole: 'process',
    scale: 'freq_5',
    reverse: false,
    stemZh: '过去三个月，当我情绪激动时，我能接受伴侣提出的「先缓一缓」。',
    scored: true,
  },
  {
    itemId: 'P-SOOTH-S03',
    constructId: 'P-SOOTH',
    lightRole: 'process',
    scale: 'freq_5',
    reverse: false,
    stemZh:
      '过去三个月，我们能在激烈讨论后一起做点让彼此安心的小事（喝水、散步、简短拥抱等）。',
    scored: true,
  },
  {
    itemId: 'P-EFF-S01',
    constructId: 'P-EFF',
    lightRole: 'process',
    scale: 'freq_5',
    reverse: false,
    stemZh: '过去三个月，我会主动安排我们共同的时间，而不是总等到对方提醒。',
    scored: true,
  },
  {
    itemId: 'P-EFF-S02',
    constructId: 'P-EFF',
    lightRole: 'process',
    scale: 'freq_5',
    reverse: false,
    stemZh: '过去三个月，即使工作很忙，我仍会为维护关系做一些具体努力。',
    scored: true,
  },
  {
    itemId: 'P-EFF-S03',
    constructId: 'P-EFF',
    lightRole: 'process',
    scale: 'freq_5',
    reverse: false,
    stemZh: '过去三个月，关系出现裂缝时，我愿意投入时间去修补，而不是拖着不管。',
    scored: true,
  },
  {
    itemId: 'P-BOUND-S01',
    constructId: 'P-BOUND',
    lightRole: 'process',
    scale: 'freq_5',
    reverse: false,
    stemZh: '过去三个月，我们相处时，我能把手机放一边，把注意力留给彼此。',
    scored: true,
  },
  {
    itemId: 'Q-SAT-S01',
    constructId: 'Q-SAT',
    lightRole: 'outcome',
    scale: 'sat_5',
    reverse: false,
    stemZh: '整体而言，我对我们目前的关系感到满意。',
    scored: true,
  },
  {
    itemId: 'Q-SAT-S02',
    constructId: 'Q-SAT',
    lightRole: 'outcome',
    scale: 'sat_5',
    reverse: false,
    stemZh: '和伴侣在一起时，我多数时候感到轻松和被支持。',
    scored: true,
  },
  {
    itemId: 'Q-STAB-S01',
    constructId: 'Q-STAB',
    lightRole: 'outcome',
    scale: 'agree_5',
    reverse: false,
    stemZh: '在可预见的短期内，我愿意继续投入经营这段关系。',
    scored: true,
  },
  {
    itemId: 'ATTN-M01',
    constructId: 'ATTN',
    lightRole: 'attn',
    scale: 'freq_5',
    reverse: false,
    stemZh: '为确认您在认真作答，请在本题选择「经常」。',
    scored: false,
  },
]

export const TOTAL_ITEMS = LIGHT_ITEMS.length
export const ATTN_CORRECT_VALUE = 4 // 「经常」
