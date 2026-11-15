import {
  LIGHT_ITEMS,
  TOTAL_ITEMS,
  optionsForScale,
} from '../data/items'
import type { AnswerMap } from '../lib/scoring'

interface QuizProps {
  index: number
  answers: AnswerMap
  onSelect: (itemId: string, value: number | string) => void
  onPrev: () => void
  onNext: () => void
}

export function Quiz({ index, answers, onSelect, onPrev, onNext }: QuizProps) {
  const item = LIGHT_ITEMS[index]
  const options = optionsForScale(item.scale)
  const selected = answers[item.itemId]
  const progress = ((index + 1) / TOTAL_ITEMS) * 100
  const isLast = index === TOTAL_ITEMS - 1

  return (
    <section className="screen">
      <div className="quiz-wrap">
        <div className="progress-track" aria-hidden="true">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <div className="quiz-meta">
          <span>
            {index + 1} / {TOTAL_ITEMS}
          </span>
          <span>约 5–10 分钟</span>
        </div>

        <h2 className="question" key={item.itemId}>
          {item.stemZh}
        </h2>

        <div className="choices" role="radiogroup" aria-label="选项">
          {options.map((opt) => {
            const isSelected = selected === opt.value
            return (
              <button
                key={String(opt.value)}
                type="button"
                role="radio"
                aria-checked={isSelected}
                className={`choice${isSelected ? ' choice--selected' : ''}`}
                onClick={() => onSelect(item.itemId, opt.value)}
              >
                {opt.label}
              </button>
            )
          })}
        </div>

        <div className="quiz-nav">
          <button
            type="button"
            className="btn btn--ghost"
            disabled={index === 0}
            onClick={onPrev}
          >
            上一题
          </button>
          <button
            type="button"
            className="btn btn--primary"
            disabled={selected === undefined}
            onClick={onNext}
          >
            {isLast ? '查看结果' : '下一题'}
          </button>
        </div>
      </div>
    </section>
  )
}
