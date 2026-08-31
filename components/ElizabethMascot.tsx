'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

/* -------------------------------------------------------------------------- */
/*  Shared visibility state (navbar toggle <-> layout mascot)                 */
/* -------------------------------------------------------------------------- */

type ElizabethContextValue = {
  visible: boolean
  toggle: () => void
}

const ElizabethContext = createContext<ElizabethContextValue | null>(null)

const STORAGE_KEY = 'retro-manga-elizabeth'

export function ElizabethProvider({ children }: { children: React.ReactNode }) {
  const [visible, setVisible] = useState(true)

  // Restore saved preference on mount (default: visible)
  useEffect(() => {
    const stored =
      typeof window !== 'undefined' && window.localStorage.getItem(STORAGE_KEY)
    if (stored === 'off') setVisible(false)
  }, [])

  const toggle = useCallback(() => {
    setVisible((v) => {
      const next = !v
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(STORAGE_KEY, next ? 'on' : 'off')
      }
      return next
    })
  }, [])

  return (
    <ElizabethContext.Provider value={{ visible, toggle }}>
      {children}
    </ElizabethContext.Provider>
  )
}

export function useElizabeth() {
  const ctx = useContext(ElizabethContext)
  if (!ctx)
    throw new Error('useElizabeth must be used within an ElizabethProvider')
  return ctx
}

/* -------------------------------------------------------------------------- */
/*  Navbar toggle button                                                      */
/* -------------------------------------------------------------------------- */

export function ElizabethToggle() {
  const { visible, toggle } = useElizabeth()

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={visible}
      aria-label={visible ? 'Hide Elizabeth mascot' : 'Show Elizabeth mascot'}
      title={visible ? 'Hide Elizabeth' : 'Show Elizabeth'}
      className={cn(
        'relative grid size-10 place-items-center rounded-full border-2 border-ink shadow-comic-sm transition-transform hover:-translate-y-0.5 active:translate-y-0',
        visible ? 'bg-[color:var(--yellow)]' : 'bg-card',
      )}
    >
      <ElizabethFace size={22} idle={!visible} />
      {!visible && (
        <span className="absolute -bottom-0.5 left-1/2 h-0.5 w-6 -translate-x-1/2 -rotate-45 rounded-full bg-[color:var(--ink)]" />
      )}
    </button>
  )
}

/* -------------------------------------------------------------------------- */
/*  Messages (Arabic + English)                                               */
/* -------------------------------------------------------------------------- */

const MESSAGES = [
  'اقرأ مانجا، لا تقرأ أفكاري! 🐧',
  'Gin-san, where is my sign?! 📋',
  'خذ استراحة… عيونك تعبانة يا صديقي.',
  "I'm not a duck. I'm not a penguin. I'm a mystery. 🤔",
  'مانجا قديمة = ذوق رفيع. صدقني.',
  'One more chapter? Okay, maybe ten. 📚',
  'لو وقعت من الشاشة، امسكني بسرعة! 🫳',
  'Sadaharu ate my homework. Believe me.',
  'اسحبني يمين وشمال… أنا أحب المشي! 🚶',
  'Retro manga hits different, trust the penguin.',
  'صمتي أبلغ من ألف لافتة. …عادةً.',
  'Blink. Blink. Are you still reading? 👀',
]

function isArabic(text: string) {
  return /[\u0600-\u06FF]/.test(text)
}

/* -------------------------------------------------------------------------- */
/*  Elizabeth character art (simple stylized SVG)                             */
/* -------------------------------------------------------------------------- */

function ElizabethFace({
  size = 120,
  blinking = false,
  idle = false,
}: {
  size?: number
  blinking?: boolean
  idle?: boolean
}) {
  return (
    <svg
      width={size}
      height={size * 1.3}
      viewBox="0 0 120 156"
      className="overflow-visible text-[color:var(--ink)]"
      role="img"
      aria-label="Elizabeth, a cute white Gintama mascot"
    >
      {/* legs */}
      <g stroke="currentColor" strokeWidth={5} strokeLinecap="round">
        <line x1={46} y1={128} x2={44} y2={150} />
        <line x1={74} y1={128} x2={76} y2={150} />
      </g>
      {/* feet */}
      <ellipse cx={40} cy={151} rx={11} ry={5} fill="#ff9e3d" stroke="currentColor" strokeWidth={3} />
      <ellipse cx={80} cy={151} rx={11} ry={5} fill="#ff9e3d" stroke="currentColor" strokeWidth={3} />

      {/* body */}
      <ellipse
        cx={60}
        cy={74}
        rx={46}
        ry={62}
        fill="#ffffff"
        stroke="currentColor"
        strokeWidth={4}
      />

      {/* little head tuft */}
      <path
        d="M60 12 q6 -8 12 -2 q-4 4 -12 5 q-8 -1 -12 -5 q6 -6 12 2 Z"
        fill="#ffffff"
        stroke="currentColor"
        strokeWidth={3}
        strokeLinejoin="round"
      />

      {/* cheeks */}
      <circle cx={38} cy={78} r={7} fill="var(--pink)" opacity={0.8} />
      <circle cx={82} cy={78} r={7} fill="var(--pink)" opacity={0.8} />

      {/* eyes */}
      {blinking || idle ? (
        <g stroke="currentColor" strokeWidth={4} strokeLinecap="round">
          <path d="M42 60 q6 5 12 0" fill="none" />
          <path d="M66 60 q6 5 12 0" fill="none" />
        </g>
      ) : (
        <>
          <circle cx={48} cy={58} r={6} fill="currentColor" />
          <circle cx={72} cy={58} r={6} fill="currentColor" />
          <circle cx={50} cy={56} r={2} fill="#ffffff" />
          <circle cx={74} cy={56} r={2} fill="#ffffff" />
        </>
      )}

      {/* beak */}
      <path
        d="M52 68 q8 12 16 0 q-8 6 -16 0 Z"
        fill="#ff9e3d"
        stroke="currentColor"
        strokeWidth={3}
        strokeLinejoin="round"
      />
    </svg>
  )
}

/* -------------------------------------------------------------------------- */
/*  Walking mascot                                                            */
/* -------------------------------------------------------------------------- */

export function ElizabethMascot() {
  const { visible } = useElizabeth()
  const [blinking, setBlinking] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [travel, setTravel] = useState(1200)
  const wasDragged = useRef(false)
  const bubbleTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Track viewport width so she walks fully across any screen
  useEffect(() => {
    const measure = () => setTravel(window.innerWidth + 160)
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  // Blink every 3s
  useEffect(() => {
    if (!visible) return
    const id = setInterval(() => {
      setBlinking(true)
      setTimeout(() => setBlinking(false), 160)
    }, 3000)
    return () => clearInterval(id)
  }, [visible])

  // Cleanup bubble timer
  useEffect(() => {
    return () => {
      if (bubbleTimer.current) clearTimeout(bubbleTimer.current)
    }
  }, [])

  const showRandomMessage = useCallback(() => {
    if (wasDragged.current) {
      wasDragged.current = false
      return
    }
    const next = MESSAGES[Math.floor(Math.random() * MESSAGES.length)]
    setMessage(next)
    if (bubbleTimer.current) clearTimeout(bubbleTimer.current)
    bubbleTimer.current = setTimeout(() => setMessage(null), 4200)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="elizabeth"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          className="pointer-events-none fixed bottom-0 left-0 z-40 h-0 w-0"
          aria-hidden={false}
        >
          {/* Horizontal walk loop */}
          <motion.div
            className="absolute bottom-2 left-0"
            animate={{ x: [-160, travel] }}
            transition={{
              duration: 26,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            {/* Draggable + waddle + click */}
            <motion.div
              className="pointer-events-auto relative cursor-grab active:cursor-grabbing"
              drag="x"
              dragConstraints={{ left: -140, right: 140 }}
              dragElastic={0.35}
              onDragStart={() => {
                wasDragged.current = true
              }}
              whileTap={{ scale: 0.96 }}
              onClick={showRandomMessage}
              animate={{ rotate: [-5, 5, -5], y: [0, -6, 0] }}
              transition={{
                duration: 0.7,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <AnimatePresence>
                {message && (
                  <motion.div
                    key={message}
                    initial={{ opacity: 0, y: 8, scale: 0.85 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.85 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 26 }}
                    className="absolute bottom-full left-1/2 mb-2 w-max max-w-[240px] -translate-x-1/2"
                  >
                    <div
                      dir={isArabic(message) ? 'rtl' : 'ltr'}
                      className={cn(
                        'relative rounded-2xl border-2 border-ink bg-card px-4 py-2.5 text-center text-sm font-bold text-card-foreground shadow-comic',
                        isArabic(message) && 'font-arabic text-base',
                      )}
                    >
                      {message}
                      {/* speech tail */}
                      <span className="absolute -bottom-2 left-1/2 size-3 -translate-x-1/2 rotate-45 border-b-2 border-r-2 border-ink bg-card" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <ElizabethFace size={78} blinking={blinking} />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
