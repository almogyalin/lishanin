export interface Sign {
  id: string
  unicode: string
  transliteration: string
  meaning: string
}

export interface MultipleChoiceExercise {
  type: 'multiple-choice'
  prompt: string
  display: string // cuneiform or text to display prominently
  options: string[]
  correctIndex: number
}

export interface MatchingExercise {
  type: 'matching'
  pairs: { left: string; right: string }[]
}

export interface FillBlankExercise {
  type: 'fill-blank'
  sentence: string // use ___ for blank
  options: string[]
  correctIndex: number
}

export interface OrderingExercise {
  type: 'ordering'
  prompt: string
  items: string[]
  correctOrder: number[]
}

export type Exercise =
  | MultipleChoiceExercise
  | MatchingExercise
  | FillBlankExercise
  | OrderingExercise

export interface Lesson {
  id: string
  title: string
  description: string
  exercises: Exercise[]
}
