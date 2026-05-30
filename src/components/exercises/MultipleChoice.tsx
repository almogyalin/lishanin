import { useState } from 'react'
import type { MultipleChoiceExercise } from '../../data/types'
import CuneiformText from '../CuneiformText'

interface Props {
  exercise: MultipleChoiceExercise
  onAnswer: (correct: boolean) => void
}

export default function MultipleChoice({ exercise, onAnswer }: Props) {
  const [selected, setSelected] = useState<number | null>(null)

  const handleSelect = (index: number) => {
    if (selected !== null) return
    setSelected(index)
    const correct = index === exercise.correctIndex
    setTimeout(() => onAnswer(correct), correct ? 800 : 2000)
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <p style={{ marginBottom: '0.5rem', color: 'var(--color-text-muted)' }}>{exercise.prompt}</p>
      <CuneiformText text={exercise.display} className="cuneiform" style={{ display: 'block', margin: '1rem 0', fontSize: '3.5rem' }} />
      <div style={{ display: 'grid', gap: '0.5rem', maxWidth: 400, margin: '0 auto' }}>
        {exercise.options.map((opt, i) => (
          <button
            key={i}
            className={`btn-option ${selected === i ? (i === exercise.correctIndex ? 'correct' : 'incorrect') : ''} ${selected !== null && i === exercise.correctIndex ? 'correct' : ''}`}
            onClick={() => handleSelect(i)}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  )
}
