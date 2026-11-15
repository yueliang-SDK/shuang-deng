import { useEffect, useMemo, useState } from 'react'
import { Atmosphere } from './components/Atmosphere'
import { Consent } from './components/Consent'
import { Landing } from './components/Landing'
import { Quiz } from './components/Quiz'
import { Report } from './components/Report'
import { LIGHT_ITEMS, TOTAL_ITEMS } from './data/items'
import { buildPersonalReport, type AnswerMap } from './lib/scoring'
import {
  clearState,
  loadState,
  makeInviteCode,
  saveState,
  type AppPhase,
  type InviteStub,
  type PersistedState,
} from './lib/storage'

function emptyState(): PersistedState {
  return {
    phase: 'landing',
    consented: false,
    index: 0,
    answers: {},
    invite: null,
    completedAt: null,
  }
}

export default function App() {
  const [phase, setPhase] = useState<AppPhase>('landing')
  const [consented, setConsented] = useState(false)
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState<AnswerMap>({})
  const [invite, setInvite] = useState<InviteStub | null>(null)
  const [completedAt, setCompletedAt] = useState<string | null>(null)
  const [ageOk, setAgeOk] = useState(false)
  const [understandOk, setUnderstandOk] = useState(false)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    const saved = loadState()
    if (saved) {
      setPhase(saved.phase)
      setConsented(saved.consented)
      setIndex(saved.index)
      setAnswers(saved.answers)
      setInvite(saved.invite)
      setCompletedAt(saved.completedAt)
      if (saved.consented) {
        setAgeOk(true)
        setUnderstandOk(true)
      }
    }
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    saveState({
      phase,
      consented,
      index,
      answers,
      invite,
      completedAt,
    })
  }, [hydrated, phase, consented, index, answers, invite, completedAt])

  const hasProgress =
    Object.keys(answers).length > 0 || phase === 'quiz' || phase === 'report'

  const report = useMemo(() => {
    if (phase !== 'report') return null
    return buildPersonalReport(answers)
  }, [phase, answers])

  function restartFresh() {
    clearState()
    const next = emptyState()
    setPhase(next.phase)
    setConsented(false)
    setIndex(0)
    setAnswers({})
    setInvite(null)
    setCompletedAt(null)
    setAgeOk(false)
    setUnderstandOk(false)
  }

  function startFromLanding() {
    setAgeOk(false)
    setUnderstandOk(false)
    setConsented(false)
    setIndex(0)
    setAnswers({})
    setInvite(null)
    setCompletedAt(null)
    setPhase('consent')
  }

  function resume() {
    if (phase === 'landing') {
      if (completedAt) setPhase('report')
      else if (consented) setPhase('quiz')
      else setPhase('consent')
    }
  }

  function finishQuiz() {
    const now = new Date().toISOString()
    setCompletedAt(now)
    setPhase('report')
  }

  function handleNext() {
    if (index >= TOTAL_ITEMS - 1) {
      finishQuiz()
      return
    }
    setIndex((i) => Math.min(i + 1, TOTAL_ITEMS - 1))
  }

  function handleSelect(itemId: string, value: number | string) {
    setAnswers((prev) => ({ ...prev, [itemId]: value }))
  }

  function createInvite() {
    const want =
      answers['DEMO-M08'] === 'yes' || answers['DEMO-M08'] === 'maybe'
    setInvite({
      code: makeInviteCode(),
      createdAt: new Date().toISOString(),
      wantInvite: Boolean(want),
    })
  }

  if (!hydrated) {
    return (
      <div className="app-shell">
        <Atmosphere />
      </div>
    )
  }

  return (
    <div className="app-shell">
      <Atmosphere />
      {phase === 'landing' && (
        <Landing
          onStart={startFromLanding}
          hasProgress={hasProgress && (consented || Boolean(completedAt))}
          onResume={resume}
        />
      )}
      {phase === 'consent' && (
        <Consent
          ageOk={ageOk}
          understandOk={understandOk}
          onAge={setAgeOk}
          onUnderstand={setUnderstandOk}
          onBack={() => setPhase('landing')}
          onContinue={() => {
            setConsented(true)
            setPhase('quiz')
            setIndex(0)
          }}
        />
      )}
      {phase === 'quiz' && (
        <Quiz
          index={index}
          answers={answers}
          onSelect={handleSelect}
          onPrev={() => setIndex((i) => Math.max(0, i - 1))}
          onNext={handleNext}
        />
      )}
      {phase === 'report' && report && (
        <Report
          report={report}
          invite={invite}
          onInvite={createInvite}
          onRestart={restartFresh}
        />
      )}
      {/* keep item count assertable in bundle for sanity */}
      <span hidden data-item-count={LIGHT_ITEMS.length} />
    </div>
  )
}
