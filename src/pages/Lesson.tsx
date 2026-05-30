import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { lessons } from '../data/lessons'
import { useProgress } from '../store/useProgress'
import LessonEngine from '../components/engine/LessonEngine'

export default function Lesson() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { markLessonComplete } = useProgress()
  const [result, setResult] = useState<{ score: number; total: number } | null>(null)

  const lesson = lessons.find(l => l.id === id)
  const lessonNumber = lessons.findIndex(l => l.id === id) + 1
  if (!lesson) return <p style={{ padding: '2rem', textAlign: 'center' }}>Lesson not found.</p>

  const handleComplete = (score: number, total: number) => {
    markLessonComplete(lesson.id)
    setResult({ score, total })
  }

  if (result) {
    const pct = Math.round((result.score / result.total) * 100)
    return (
      <div style={{ maxWidth: 400, margin: '0 auto', padding: '3rem 1rem', textAlign: 'center' }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{pct >= 80 ? '🎉' : pct >= 50 ? '👍' : '📚'}</div>
        <h2>Lesson {lessonNumber} Complete!</h2>
        <p style={{ fontSize: '1.25rem', margin: '1rem 0' }}>
          {result.score}/{result.total} correct ({pct}%)
        </p>
        <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem' }}>
          {pct >= 80 ? 'Excellent work!' : pct >= 50 ? 'Good effort! Keep practicing.' : 'Keep studying, you\'ll get there!'}
        </p>
        <button className="btn-primary" onClick={() => navigate('/')}>Continue</button>
      </div>
    )
  }

  return <LessonEngine lesson={lesson} lessonNumber={lessonNumber} onComplete={handleComplete} />
}
