import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Lesson } from '../../data/types'
import MultipleChoice from '../exercises/MultipleChoice'
import Matching from '../exercises/Matching'
import FillBlank from '../exercises/FillBlank'
import Ordering from '../exercises/Ordering'

interface Props {
  lesson: Lesson
  lessonNumber: number
  onComplete: (score: number, total: number) => void
}

export default function LessonEngine({ lesson, lessonNumber, onComplete }: Props) {
  const navigate = useNavigate()
  const [current, setCurrent] = useState(0)
  const [score, setScore] = useState(0)

  const exercise = lesson.exercises[current]
  const total = lesson.exercises.length

  const handleAnswer = (correct: boolean) => {
    const newScore = correct ? score + 1 : score
    setScore(newScore)
    if (current + 1 >= total) {
      onComplete(newScore, total)
    } else {
      setCurrent(current + 1)
    }
  }

  const progress = ((current) / total) * 100

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: '1rem' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem', fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
          <button onClick={() => navigate('/')} style={{ background: 'none', padding: '0.25rem 0.5rem', fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>← Back</button>
          <span>Lesson {lessonNumber}: {lesson.title}</span>
          <span>Q {current + 1}/{total}</span>
        </div>
        <div style={{ height: 8, background: 'var(--color-border)', borderRadius: 4 }}>
          <div style={{ height: '100%', width: `${progress}%`, background: 'var(--color-primary)', borderRadius: 4, transition: 'width 0.3s' }} />
        </div>
      </div>
      {exercise.type === 'multiple-choice' && <MultipleChoice key={current} exercise={exercise} onAnswer={handleAnswer} />}
      {exercise.type === 'matching' && <Matching key={current} exercise={exercise} onAnswer={handleAnswer} />}
      {exercise.type === 'fill-blank' && <FillBlank key={current} exercise={exercise} onAnswer={handleAnswer} />}
      {exercise.type === 'ordering' && <Ordering key={current} exercise={exercise} onAnswer={handleAnswer} />}
    </div>
  )
}
