import type { InviteStub } from '../lib/storage'
import type { PersonalReport } from '../lib/scoring'

interface ReportProps {
  report: PersonalReport
  invite: InviteStub | null
  onInvite: () => void
  onRestart: () => void
}

export function Report({ report, invite, onInvite, onRestart }: ReportProps) {
  return (
    <section className="screen">
      <div className="report">
        <p className="report-kicker">你的互动风格</p>
        <h2 className="style-name">
          {report.style.name}
          <span style={{ color: 'var(--ink-muted)', fontSize: '0.55em' }}>
            {' '}
            （{report.style.code}）
          </span>
        </h2>
        <p className="style-blurb">{report.style.blurb}</p>
        {report.tint ? (
          <p className="perspective-note">偏色提示：{report.tint}</p>
        ) : null}
        <p className="perspective-note">
          仅你的视角 · 不是情侣对照。伴侣完成后可升级看「是否同频」。
        </p>
        <p className="disclaimer">
          这是互动倾向的趣味提示，不是心理诊断，也不预测关系成败。
        </p>
        {!report.attnPassed ? (
          <p className="attn-note">
            注意力题未按提示作答；风格仍按启发式规则给出，建议当作更松的讨论开场。
          </p>
        ) : null}

        <p className="section-label">三张讨论卡 · 带走就能聊</p>
        <div className="cards">
          {report.cards.map((card, i) => (
            <article className="card" key={card.title}>
              <h3 className="card-title">
                卡 {i + 1} · {card.title}
              </h3>
              <p className="card-prompt">{card.prompt}</p>
            </article>
          ))}
        </div>

        <div className="invite-box">
          <h3>邀请升级</h3>
          <p>
            对方独立答完同一份小测后，可解锁：共同风格倾向 + 1–2
            个值得对齐的差异点（仍非诊断）。在此之前，请把上面三张卡当讨论开场，而不是「测评结论对质」。
          </p>
          {invite ? (
            <>
              <span className="invite-code">{invite.code}</span>
              <p style={{ marginTop: '0.65rem' }}>
                邀请码已保存在本机（演示 stub）。把码发给伴侣即可；超时仅提醒，不会用单方数据伪造对照。
              </p>
            </>
          ) : (
            <div className="btn-row" style={{ justifyContent: 'flex-start' }}>
              <button type="button" className="btn btn--primary" onClick={onInvite}>
                生成邀请码
              </button>
            </div>
          )}
        </div>

        <div className="btn-row" style={{ justifyContent: 'flex-start' }}>
          <button type="button" className="btn btn--ghost" onClick={onRestart}>
            重新作答
          </button>
        </div>

        <footer className="footer-legal">
          <ul>
            <li>
              基于本次 LIGHT 自评启发式总结；风格名为讨论标签，非人格分类。
            </li>
            <li>
              个人结果 ≠ 双方对照；禁止用单方数据冒充「你们的关系鉴定」。
            </li>
            <li>
              若出现持续恐惧、控制或伤害，请寻求持证支持或本地危机资源——本工具不提供风险评估或治疗方案。
            </li>
          </ul>
        </footer>
      </div>
    </section>
  )
}
