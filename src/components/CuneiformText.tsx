import { useState } from 'react'
import { signDictionary } from '../data/signDictionary'

interface Props {
  text: string
  className?: string
  style?: React.CSSProperties
}

// Try to match the longest sequence in the dictionary first
function tokenize(text: string): { token: string; key: string | null }[] {
  const tokens: { token: string; key: string | null }[] = []
  let i = 0
  while (i < text.length) {
    const cp = text.codePointAt(i)!
    const charLen = cp > 0xFFFF ? 2 : 1
    // Check if this is a cuneiform character
    if (cp >= 0x12000 && cp <= 0x1254F) {
      // Try longest match from dictionary
      let bestLen = 0
      let bestKey: string | null = null
      for (let end = i + charLen; end <= text.length; ) {
        const slice = text.slice(i, end)
        const endCp = end < text.length ? text.codePointAt(end) : 0
        if (signDictionary[slice]) {
          bestLen = end - i
          bestKey = slice
        }
        // Only extend if next char is also cuneiform
        if (endCp && endCp >= 0x12000 && endCp <= 0x1254F) {
          end += endCp > 0xFFFF ? 2 : 1
        } else {
          break
        }
      }
      if (bestKey) {
        tokens.push({ token: bestKey, key: bestKey })
        i += bestLen
      } else {
        // Single cuneiform char, not in dictionary
        const ch = text.slice(i, i + charLen)
        tokens.push({ token: ch, key: null })
        i += charLen
      }
    } else {
      // Non-cuneiform: collect until next cuneiform
      let end = i + charLen
      while (end < text.length) {
        const nextCp = text.codePointAt(end)!
        if (nextCp >= 0x12000 && nextCp <= 0x1254F) break
        end += nextCp > 0xFFFF ? 2 : 1
      }
      tokens.push({ token: text.slice(i, end), key: null })
      i = end
    }
  }
  return tokens
}

export default function CuneiformText({ text, className, style }: Props) {
  const [tooltip, setTooltip] = useState<{ key: string; x: number; y: number } | null>(null)

  const handleClick = (key: string, e: React.MouseEvent) => {
    e.stopPropagation()
    const rect = (e.target as HTMLElement).getBoundingClientRect()
    setTooltip({ key, x: rect.left + rect.width / 2, y: rect.top })
  }

  const tokens = tokenize(text)

  const elements = tokens.map((t, i) => {
    if (t.key) {
      return (
        <span
          key={i}
          onClick={(e) => handleClick(t.key!, e)}
          style={{ cursor: 'pointer', borderBottom: '2px dotted var(--color-primary)' }}
        >
          {t.token}
        </span>
      )
    }
    return <span key={i}>{t.token}</span>
  })

  const info = tooltip ? signDictionary[tooltip.key] : null

  return (
    <span className={className} style={{ position: 'relative', ...style }}>
      {elements}
      {tooltip && info && (
        <>
          <div style={{ position: 'fixed', inset: 0, zIndex: 99 }} onClick={() => setTooltip(null)} />
          <div style={{
            position: 'fixed',
            left: tooltip.x,
            top: tooltip.y - 8,
            transform: 'translate(-50%, -100%)',
            background: '#1a1a1a',
            color: 'white',
            padding: '0.5rem 0.75rem',
            borderRadius: 6,
            fontSize: '0.85rem',
            zIndex: 100,
            whiteSpace: 'nowrap',
            textAlign: 'center',
          }}>
            <div style={{ fontWeight: 600 }}>{info.reading}</div>
            <div style={{ opacity: 0.8 }}>{info.meaning}</div>
          </div>
        </>
      )}
    </span>
  )
}
