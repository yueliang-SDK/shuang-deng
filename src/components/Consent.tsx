interface ConsentProps {
  ageOk: boolean
  understandOk: boolean
  onAge: (v: boolean) => void
  onUnderstand: (v: boolean) => void
  onBack: () => void
  onContinue: () => void
}

export function Consent({
  ageOk,
  understandOk,
  onAge,
  onUnderstand,
  onBack,
  onContinue,
}: ConsentProps) {
  const canContinue = ageOk && understandOk

  return (
    <section className="screen">
      <div style={{ width: 'min(40rem, 100%)', margin: '0 auto', flex: 1 }}>
        <p className="brand brand--mark">双灯 · LIGHT</p>
        <h2 className="page-title">开始之前</h2>
        <p className="page-desc">
          这是伴侣互动倾向的趣味提示与讨论开场工具，不是心理诊断，也不预测关系成败。
        </p>

        <div className="panel">
          <div className="consent-list">
            <label className="consent-item">
              <input
                type="checkbox"
                checked={ageOk}
                onChange={(e) => onAge(e.target.checked)}
              />
              <span>我已满 18 岁，并确认本小测仅供成年使用者。</span>
            </label>
            <label className="consent-item">
              <input
                type="checkbox"
                checked={understandOk}
                onChange={(e) => onUnderstand(e.target.checked)}
              />
              <span>
                我理解风格名为启发式讨论标签，非人格分类或临床诊断；答案保存在本机浏览器。
              </span>
            </label>
          </div>
          <p className="consent-warn">
            若出现持续恐惧、控制或伤害，请寻求持证支持或本地危机资源——本工具不提供风险评估或治疗方案。
          </p>
        </div>

        <div className="btn-row btn-row--spread" style={{ marginTop: '1.75rem' }}>
          <button type="button" className="btn btn--ghost" onClick={onBack}>
            返回
          </button>
          <button
            type="button"
            className="btn btn--primary"
            disabled={!canContinue}
            onClick={onContinue}
          >
            同意并继续
          </button>
        </div>
      </div>
    </section>
  )
}
