'use client'

import { useEffect, useState } from 'react'
import { ELIZABETH_QUOTES } from '@/lib/quotes'

/* ---------------------------------------------------------------------------
   Elizabeth — the tall white fluffy duck mascot, drawn entirely with divs + CSS.
   No <img> is ever used for Elizabeth.
--------------------------------------------------------------------------- */

function Eye({ size, pupil }: { size: number; pupil: number }) {
  return (
    <div
      style={{
        position: 'relative',
        width: size,
        height: size,
        borderRadius: '50%',
        background: '#ffffff',
        border: '2.5px solid #2a2a2a',
        display: 'grid',
        placeItems: 'center',
      }}
    >
      {/* eyelashes: 3 short strokes on top */}
      <div
        style={{
          position: 'absolute',
          top: -7,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: 3,
          alignItems: 'flex-end',
        }}
      >
        <span style={{ width: 2, height: 6, background: '#2a2a2a', borderRadius: 2, transform: 'rotate(-28deg)' }} />
        <span style={{ width: 2, height: 8, background: '#2a2a2a', borderRadius: 2 }} />
        <span style={{ width: 2, height: 6, background: '#2a2a2a', borderRadius: 2, transform: 'rotate(28deg)' }} />
      </div>
      {/* pupil */}
      <div style={{ width: pupil, height: pupil, borderRadius: '50%', background: '#111' }} />
    </div>
  )
}

export function ElizabethDuck({
  scale = 1,
  board = false,
  boardText = '',
}: {
  scale?: number
  board?: boolean
  boardText?: string
}) {
  return (
    <div
      style={{
        position: 'relative',
        width: 95,
        height: 175,
        transform: `scale(${scale})`,
        transformOrigin: 'bottom center',
      }}
    >
      {/* Sign board + wooden stick (held up on the right side) */}
      {board && (
        <div
          style={{
            position: 'absolute',
            bottom: 96,
            left: 44,
            width: 140,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              width: 140,
              minHeight: 80,
              background: '#ffffff',
              border: '2px solid #333',
              borderRadius: 8,
              boxShadow: '2px 2px 0 #333',
              padding: 8,
              display: 'grid',
              placeItems: 'center',
              textAlign: 'center',
              fontFamily: 'var(--font-tajawal), sans-serif',
              fontWeight: 700,
              fontSize: 13,
              lineHeight: 1.3,
              color: '#000',
            }}
            dir="rtl"
          >
            {boardText}
          </div>
          {/* stick */}
          <div style={{ width: 4, height: 40, background: '#8b5a2b', borderRadius: 2 }} />
        </div>
      )}

      {/* Feet */}
      <div
        style={{
          position: 'absolute',
          bottom: -5,
          left: 26,
          width: 12,
          height: 8,
          background: '#ff8c42',
          borderRadius: '0 0 6px 6px',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: -5,
          left: 52,
          width: 12,
          height: 8,
          background: '#ff8c42',
          borderRadius: '0 0 6px 6px',
        }}
      />

      {/* Body */}
      <div
        style={{
          position: 'absolute',
          bottom: 3,
          left: 0,
          width: 95,
          height: 145,
          borderRadius: '48% 48% 46% 46% / 55% 55% 45% 45%',
          background: 'radial-gradient(circle at 42% 32%, #ffffff 0%, #f5f5f0 100%)',
          border: '2px solid #e4ded2',
          boxShadow: 'inset -6px -8px 14px rgba(0,0,0,0.05)',
        }}
      >
        {/* little raised wing / arm holding the stick */}
        <div
          style={{
            position: 'absolute',
            top: 60,
            right: -4,
            width: 20,
            height: 42,
            background: '#f7f7f2',
            border: '2px solid #e4ded2',
            borderRadius: '40% 60% 60% 40% / 50%',
            transform: 'rotate(-18deg)',
          }}
        />
        {/* Eyes */}
        <div
          style={{
            position: 'absolute',
            top: 34,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <Eye size={22} pupil={8} />
          <Eye size={26} pupil={12} />
        </div>

        {/* Beak */}
        <div
          style={{
            position: 'absolute',
            top: 66,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 60,
            height: 22,
            background: '#ffc14d',
            border: '2px solid #d99b2b',
            borderRadius: '50%',
            boxShadow: '0 2px 0 rgba(0,0,0,0.06)',
          }}
        >
          {/* beak split line */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: 6,
              right: 6,
              height: 1.5,
              background: '#c98d24',
              transform: 'translateY(-50%)',
              borderRadius: 2,
            }}
          />
        </div>
      </div>
    </div>
  )
}

/* ---------------------------------------------------------------------------
   ElizabethWalker — fixed mascot that walks across the bottom of the screen
   holding her sign, waddling as she goes. After she exits she hides, picks a
   fresh quote, and walks again. The board text stays visible the whole walk.
--------------------------------------------------------------------------- */

const WALK_MS = 22000
const HIDE_MS = 32000

function randomQuote() {
  return ELIZABETH_QUOTES[Math.floor(Math.random() * ELIZABETH_QUOTES.length)]
}

export function ElizabethWalker() {
  const [cycle, setCycle] = useState(0)
  const [visible, setVisible] = useState(true)
  const [quote, setQuote] = useState<string>(ELIZABETH_QUOTES[0])

  // Pick the first quote on the client to avoid hydration mismatch.
  useEffect(() => {
    setQuote(randomQuote())
  }, [])

  useEffect(() => {
    let hideTimer: ReturnType<typeof setTimeout>
    const walkTimer = setTimeout(() => {
      setVisible(false)
      hideTimer = setTimeout(() => {
        setQuote(randomQuote())
        setCycle((c) => c + 1)
        setVisible(true)
      }, HIDE_MS)
    }, WALK_MS)
    return () => {
      clearTimeout(walkTimer)
      clearTimeout(hideTimer)
    }
  }, [cycle])

  if (!visible) return null

  return (
    <div key={cycle} className="elizabeth-walker" aria-hidden="true">
      <div className="elizabeth-waddle">
        <ElizabethDuck board boardText={quote} />
      </div>
    </div>
  )
}
