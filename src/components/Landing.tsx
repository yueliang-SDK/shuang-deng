interface LandingProps {
  onStart: () => void
  hasProgress: boolean
  onResume: () => void
}

export function Landing({ onStart, hasProgress, onResume }: LandingProps) {
  return (
    <section className="screen screen--center">
      <h1 className="brand brand--hero">双灯</h1>
      <p className="lead">伴侣互动小测 · 讨论开场</p>
      <p className="sublead">
        约 40 题，5–10 分钟。答完即可免费看见你的互动风格名，以及三张能带走就聊的讨论卡。
      </p>
      <div className="btn-row">
        {hasProgress ? (
          <>
            <button type="button" className="btn btn--ghost" onClick={onStart}>
              重新开始
            </button>
            <button type="button" className="btn btn--primary" onClick={onResume}>
              继续作答
            </button>
          </>
        ) : (
          <button type="button" className="btn btn--primary" onClick={onStart}>
            开始小测
          </button>
        )}
      </div>
    </section>
  )
}
