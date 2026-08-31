'use client'

import { useCallback, useEffect, useState } from 'react'

// Single source of truth key — used by cards AND the favorites page.
const STORAGE_KEY = 'retro-manga-favorites'
const EVENT = 'retro-manga-favorites-changed'

function read(): string[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed)
      ? parsed.filter((x): x is string => typeof x === 'string')
      : []
  } catch {
    return []
  }
}

function write(ids: string[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ids))
  // Notify every mounted hook instance in this tab.
  window.dispatchEvent(new CustomEvent(EVENT))
}

export function useFavorites() {
  const [ids, setIds] = useState<string[]>([])
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setIds(read())
    setReady(true)
    const sync = () => setIds(read())
    window.addEventListener(EVENT, sync)
    window.addEventListener('storage', sync) // cross-tab
    return () => {
      window.removeEventListener(EVENT, sync)
      window.removeEventListener('storage', sync)
    }
  }, [])

  const toggle = useCallback((id: string) => {
    const current = read()
    const next = current.includes(id)
      ? current.filter((x) => x !== id)
      : [...current, id]
    write(next)
    setIds(next)
  }, [])

  const remove = useCallback((id: string) => {
    const next = read().filter((x) => x !== id)
    write(next)
    setIds(next)
  }, [])

  const isFavorite = useCallback((id: string) => ids.includes(id), [ids])

  return { ids, count: ids.length, ready, toggle, remove, isFavorite }
}
