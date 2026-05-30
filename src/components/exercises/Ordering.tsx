import { useState } from 'react'
import type { OrderingExercise } from '../../data/types'

interface Props {
  exercise: OrderingExercise
  onAnswer: (correct: boolean) => void
}

export default function Ordering({ exercise, onAnswer }: Props) {
  const [placed, setPlaced] = useState<number[]>([])
  const [checked, setChecked] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)

  const expectedLength = exercise.correctOrder.length

  const handleTap = (index: number) => {
    if (checked) return
    if (placed.includes(index)) {
      setPlaced(placed.filter(i => i !== index))
    } else if (placed.length < expectedLength) {
      setPlaced([...placed, index])
    }
  }

  const handleCheck = () => {
    const correct = placed.every((val, i) => val === exercise.correctOrder[i])
    setIsCorrect(correct)
    setChecked(true)
    if (!correct) {
      setPlaced(exercise.correctOrder)
    }
    setTimeout(() => onAnswer(correct), correct ? 1000 : 2500)
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <p style={{ marginBottom: '1rem', color: 'var(--color-text-muted)' }}>{exercise.prompt}</p>
      <div style={{ minHeight: '3rem', margin: '1rem 0', padding: '0.75rem', border: '2px dashed var(--color-border)', borderRadius: 'var(--radius)', display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        {placed.map((idx, i) => (
          <span key={i} style={{ padding: '0.5rem 0.75rem', background: checked ? (isCorrect ? '#e8f5e9' : '#ffebee') : '#e8f0e0', borderRadius: 'var(--radius)', cursor: checked ? 'default' : 'pointer' }} onClick={() => !checked && handleTap(idx)}>
            {exercise.items[idx]}
          </span>
        ))}
      </div>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center', margin: '1rem 0' }}>
        {exercise.items.map((item, i) => (
          <button
            key={i}
            className="btn-option"
            style={{ width: 'auto', opacity: placed.includes(i) ? 0.4 : 1 }}
            onClick={() => handleTap(i)}
            disabled={checked}
          >
            {item}
          </button>
        ))}
      </div>
      {placed.length === expectedLength && !checked && (
        <button className="btn-primary" onClick={handleCheck}>Check</button>
      )}
    </div>
  )
}
