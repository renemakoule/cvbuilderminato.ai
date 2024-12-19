'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { trackEvent } from '@/actions/track'

export function TrackingProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  
  useEffect(() => {
    // Generate a simple user ID (use a proper user ID system in production)
    const userId = localStorage.getItem('userId') || Math.random().toString(36).slice(2)
    localStorage.setItem('userId', userId)
    
    // Track page view
    trackEvent({
      userId,
      event: 'page_view',
      path: pathname,
      timestamp: new Date(),
      metadata: {
        query: Object.fromEntries(searchParams.entries())
      }
    })

    // Track user interactions
    const handleInteraction = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.tagName === 'BUTTON' || target.tagName === 'A') {
        trackEvent({
          userId,
          event: 'interaction',
          path: pathname,
          timestamp: new Date(),
          metadata: {
            element: target.tagName,
            text: target.textContent
          }
        })
      }
    }

    document.addEventListener('click', handleInteraction)
    return () => document.removeEventListener('click', handleInteraction)
  }, [pathname, searchParams])

  return children
}

