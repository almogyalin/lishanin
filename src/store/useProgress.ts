import { useState, useCallback } from 'react'

const STORAGE_KEY = 'lishanin-progress'

interface Progress {
  completedLessons: string[]
}

function load(): Progress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch { /* ignore */ }
  return { completedLessons: [] }
}

function save(progress: Progress) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
}

export function useProgress() {
  const [progress, setProgress] = useState<Progress>(load)

  const markLessonComplete = useCallback((lessonId: string) => {
    setProgress(prev => {
      if (prev.completedLessons.includes(lessonId)) return prev
      const next = { completedLessons: [...prev.completedLessons, lessonId] }
      save(next)
      return next
    })
  }, [])

  const resetProgress = useCallback(() => {
    const empty = { completedLessons: [] }
    save(empty)
    setProgress(empty)
  }, [])

  return { progress, markLessonComplete, resetProgress }
}
