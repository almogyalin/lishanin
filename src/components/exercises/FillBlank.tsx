import { useState } from 'react'
import type { FillBlankExercise } from '../../data/types'
import CuneiformText from '../CuneiformText'

interface Props {
  exercise: FillBlankExercise
  onAnswer: (correct: boolean) => void
}

export default function FillBlank({ exercise, onAnswer }: Props) {
  const [selected, setSelected] = useState<number | null>(null)

  const handleSelect = (index: number) => {
    if (selected !== null) return
    setSelected(index)
    const correct = index === exercise.correctIndex
    setTimeout(() => onAnswer(correct), correct ? 800 : 2000)
  }

  const parts = exercise.sentence.split('___')

  return (
    <div style={{ textAlign: 'center' }}>
      <p style={{ marginBottom: '0.5rem', color: 'var(--color-text-muted)' }}>Fill in the blank:</p>
      <p style={{ fontSize: '1.15rem', margin: '1rem 0', lineHeight: 2, whiteSpace: 'pre-line' }}>
        {parts[0]}
        <span style={{
          display: 'inline-block',
          minWidth: '4rem',
          borderBottom: '2px solid var(--color-primary)',
          margin: '0 0.25rem',
          padding: '0.25rem 0.5rem',
          verticalAlign: 'bottom',
        }}>
          {selected !== null ? exercise.options[selected] : '?'}
        </span>
        {parts[1]}
      </p>
      <p style={{ marginBottom: '1rem', fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>Choose the correct word:</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem', maxWidth: 400, margin: '0 auto' }}>
        {exercise.options.map((opt, i) => (
          <button
            key={i}
            className={`btn-option ${selected === i ? (i === exercise.correctIndex ? 'correct' : 'incorrect') : ''} ${selected !== null && i === exercise.correctIndex ? 'correct' : ''}`}
            onClick={() => handleSelect(i)}
            style={{ textAlign: 'center' }}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  )
}
