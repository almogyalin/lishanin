import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { lessons } from '../data/lessons'
import { useProgress } from '../store/useProgress'
import { vocabularyByLesson } from '../data/vocabulary'

export default function Home() {
  const navigate = useNavigate()
  const { progress, resetProgress } = useProgress()
  const [showDict, setShowDict] = useState(false)

  const getStatus = (index: number): 'completed' | 'available' => {
    const lessonId = lessons[index].id
    if (progress.completedLessons.includes(lessonId)) return 'completed'
    return 'available'
  }

  const learnedWords = lessons
    .filter(l => progress.completedLessons.includes(l.id))
    .flatMap(l => vocabularyByLesson[l.id] || [])

  return (
    <div style={{ maxWidth: 500, margin: '0 auto', padding: '2rem 1rem' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '0.25rem' }}>
        <span className="cuneiform" style={{ fontSize: '2rem' }}>𒅗</span> Lishanin
      </h1>
      <p style={{ textAlign: 'center', color: 'var(--color-text-muted)', marginBottom: '1rem' }}>Learn Akkadian & Cuneiform</p>

      {learnedWords.length > 0 && (
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <button
            onClick={() => setShowDict(!showDict)}
            style={{ background: 'none', padding: '0.5rem 1rem', fontSize: '0.9rem', border: '1px solid var(--color-border)', borderRadius: 'var(--radius)' }}
          >
            📖 Dictionary ({learnedWords.length} words) {showDict ? '▲' : '▼'}
          </button>
        </div>
      )}

      {showDict && (
        <div style={{ marginBottom: '2rem', border: '1px solid var(--color-border)', borderRadius: 'var(--radius)', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ background: '#f5f5f5' }}>
                <th style={{ padding: '0.5rem', textAlign: 'left' }}>Word</th>
                <th style={{ padding: '0.5rem', textAlign: 'left' }}>Reading</th>
                <th style={{ padding: '0.5rem', textAlign: 'left' }}>Meaning</th>
              </tr>
            </thead>
            <tbody>
              {learnedWords.map((entry, i) => (
                <tr key={i} style={{ borderTop: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '0.5rem' }}>
                    <span className="cuneiform" style={{ fontSize: '1.3rem' }}>{entry.cuneiform}</span>
                  </td>
                  <td style={{ padding: '0.5rem' }}>{entry.transliteration}</td>
                  <td style={{ padding: '0.5rem' }}>{entry.meaning}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {lessons.map((lesson, i) => {
          const status = getStatus(i)
          return (
            <button
              key={lesson.id}
              onClick={() => navigate(`/lesson/${lesson.id}`)}
              style={{
                display: 'flex', alignItems: 'center', gap: '1rem',
                padding: '1rem', borderRadius: 'var(--radius)',
                background: 'var(--color-surface)',
                border: `2px solid ${status === 'completed' ? 'var(--color-correct)' : 'var(--color-border)'}`,
                cursor: 'pointer',
                textAlign: 'left',
              }}
            >
              <span style={{
                width: 36, height: 36, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: status === 'completed' ? 'var(--color-correct)' : '#666',
                color: 'white', fontWeight: 700, fontSize: '0.875rem',
              }}>
                {status === 'completed' ? '✓' : i + 1}
              </span>
              <div>
                <div style={{ fontWeight: 600 }}>{lesson.title}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{lesson.description}</div>
              </div>
            </button>
          )
        })}
      </div>

      {progress.completedLessons.length > 0 && (
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <button
            onClick={() => { if (confirm('Reset all progress?')) resetProgress() }}
            style={{ background: 'none', padding: '0.5rem 1rem', fontSize: '0.8rem', color: 'var(--color-text-muted)', border: 'none', textDecoration: 'underline', cursor: 'pointer' }}
          >
            Reset progress
          </button>
        </div>
      )}
    </div>
  )
}
