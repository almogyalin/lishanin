import { useState } from 'react'
import type { MatchingExercise } from '../../data/types'

interface Props {
  exercise: MatchingExercise
  onAnswer: (correct: boolean) => void
}

export default function Matching({ exercise, onAnswer }: Props) {
  const [matched, setMatched] = useState<Set<number>>(new Set())
  const [selectedLeft, setSelectedLeft] = useState<number | null>(null)
  const [flash, setFlash] = useState<{ side: 'left' | 'right'; index: number } | null>(null)

  // Shuffle right side deterministically based on pairs
  const [rightOrder] = useState(() => {
    const indices = exercise.pairs.map((_, i) => i)
    for (let i = indices.length - 1; i > 0; i--) {
      const j = (i * 7 + 3) % (i + 1)
      ;[indices[i], indices[j]] = [indices[j], indices[i]]
    }
    return indices
  })

  const handleLeft = (index: number) => {
    if (matched.has(index)) return
    setSelectedLeft(index)
  }

  const handleRight = (rightIdx: number) => {
    if (selectedLeft === null) return
    const actualRight = rightOrder[rightIdx]
    if (matched.has(actualRight)) return

    if (selectedLeft === actualRight) {
      const next = new Set(matched)
      next.add(selectedLeft)
      setMatched(next)
      setSelectedLeft(null)
      if (next.size === exercise.pairs.length) {
        setTimeout(() => onAnswer(true), 500)
      }
    } else {
      setFlash({ side: 'right', index: rightIdx })
      setTimeout(() => { setFlash(null); setSelectedLeft(null) }, 500)
    }
  }

  return (
    <div>
      <p style={{ textAlign: 'center', marginBottom: '1rem', color: 'var(--color-text-muted)' }}>Match the pairs</p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', maxWidth: 500, margin: '0 auto' }}>
        {exercise.pairs.map((pair, i) => (
          <button
            key={`l${i}`}
            className={`btn-option ${matched.has(i) ? 'matched' : ''} ${selectedLeft === i ? 'selected' : ''}`}
            onClick={() => handleLeft(i)}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '3.5rem' }}
          >
            <span className="cuneiform" style={{ fontSize: '1.5rem' }}>{pair.left}</span>
          </button>
        )).flatMap((leftBtn, i) => [
          leftBtn,
          <button
            key={`r${i}`}
            className={`btn-option ${matched.has(rightOrder[i]) ? 'matched' : ''} ${flash?.side === 'right' && flash.index === i ? 'incorrect' : ''}`}
            onClick={() => handleRight(i)}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '3.5rem' }}
          >
            {exercise.pairs[rightOrder[i]].right}
          </button>
        ])}
      </div>
    </div>
  )
}
