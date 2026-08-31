'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { ElizabethDuck } from '@/components/elizabeth'

type MascotMood = 'wave' | 'sleepy' | 'confused'

/**
 * Static Elizabeth duck mascot, drawn purely with divs + CSS.
 * The `mood` prop is kept for API compatibility with existing call sites.
 */
export function Mascot({
  mood = 'wave',
  size = 160,
  float = true,
  className,
}: {
  mood?: MascotMood
  size?: number
  float?: boolean
  className?: string
  priority?: boolean
}) {
  return (
    <motion.div
      className={cn('relative grid select-none place-items-center', className)}
      style={{ width: size, height: size }}
      animate={float ? { y: [0, -10, 0], rotate: [-2, 2, -2] } : undefined}
      transition={
        float ? { duration: 4, repeat: Infinity, ease: 'easeInOut' } : undefined
      }
      role="img"
      aria-label="إليزابيث، بطة المكتبة"
    >
      <ElizabethDuck scale={size / 185} />
    </motion.div>
  )
}
