import type { AnswerMap } from './scoring'

const KEY = 'shuang-deng-light-v1'

export type AppPhase = 'landing' | 'consent' | 'quiz' | 'report'

export interface InviteStub {
  code: string
  createdAt: string
  wantInvite: boolean
}

export interface PersistedState {
  phase: AppPhase
  consented: boolean
  index: number
  answers: AnswerMap
  invite: InviteStub | null
  completedAt: string | null
}

export function loadState(): PersistedState | null {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return null
    return JSON.parse(raw) as PersistedState
  } catch {
    return null
  }
}

export function saveState(state: PersistedState): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(state))
  } catch {
    // ignore quota / private mode
  }
}

export function clearState(): void {
  try {
    localStorage.removeItem(KEY)
  } catch {
    // ignore
  }
}

export function makeInviteCode(): string {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let code = ''
  for (let i = 0; i < 6; i++) {
    code += alphabet[Math.floor(Math.random() * alphabet.length)]
  }
  return code
}
