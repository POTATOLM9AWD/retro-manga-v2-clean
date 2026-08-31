'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronUp, Quote } from 'lucide-react'
import { SUGGESTIONS } from '@/lib/data'
import { SectionHeading } from '@/components/ui-bits'
import { cn } from '@/lib/utils'

export function Suggestions() {
  const [votes, setVotes] = useState<Record<string, number>>(() =>
    Object.fromEntries(SUGGESTIONS.map((s) => [s.id, s.votes])),
  )
  const [voted, setVoted] = useState<Record<string, boolean>>({})

  const toggle = (id: string) => {
    setVoted((prev) => {
      const next = { ...prev, [id]: !prev[id] }
      setVotes((v) => ({ ...v, [id]: v[id] + (next[id] ? 1 : -1) }))
      return next
    })
  }

  const ranked = [...SUGGESTIONS].sort((a, b) => votes[b.id] - votes[a.id])

  return (
    <section className="border-t-2 border-ink bg-card/40">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <SectionHeading
          kicker="ساعدنا في اختيار ما هو قادم"
          title="أكثر الاقتراحات تصويتاً"
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <AnimatePresence>
            {ranked.map((s, i) => (
              <motion.article
                key={s.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: Math.min(i * 0.05, 0.3) }}
                className="flex items-start gap-4 rounded-2xl border-2 border-ink bg-card p-4 shadow-comic-sm"
              >
                <button
                  type="button"
                  onClick={() => toggle(s.id)}
                  aria-pressed={!!voted[s.id]}
                  aria-label={`Upvote ${s.title}`}
                  className={cn(
                    'flex w-14 shrink-0 flex-col items-center gap-0.5 rounded-xl border-2 border-ink py-2 font-extrabold transition-colors',
                    voted[s.id]
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-background text-foreground hover:bg-muted',
                  )}
                >
                  <ChevronUp className="size-5" />
                  <span className="text-sm tabular-nums">{votes[s.id]}</span>
                </button>
                <div className="min-w-0">
                  <h3 className="font-extrabold text-foreground">{s.title}</h3>
                  <p className="mt-1 inline-flex items-start gap-1.5 text-sm text-muted-foreground">
                    <Quote className="mt-0.5 size-3.5 shrink-0" />
                    <span className="text-pretty">{s.note}</span>
                  </p>
                  <p className="mt-2 text-xs font-semibold text-primary">
                    اقترحه @{s.by}
                  </p>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
