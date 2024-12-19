/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useEffect, useState } from 'react'
import { getEvents } from '@/actions/track'
import { Card } from '@/components/ui/card'
import { BarChart2, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function AnalyticsDashboard() {
  const [events, setEvents] = useState<any[]>([])
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const fetchEvents = async () => {
      const data = await getEvents()
      setEvents(data)
    }

    if (isOpen) {
      fetchEvents()
      const interval = setInterval(fetchEvents, 5000) // Refresh every 5 seconds
      return () => clearInterval(interval)
    }
  }, [isOpen])

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Analytics Toggle Button */}
      <Button
        variant="outline"
        size="icon"
        className={cn(
          "h-10 w-10 rounded-full bg-background shadow-md transition-transform hover:scale-110",
          isOpen && "rotate-180"
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        <BarChart2 className="h-4 w-4" />
      </Button>

      {/* Analytics Dashboard Card */}
      <div
        className={cn(
          "absolute bottom-full right-0 mb-2 transition-all duration-200 ease-in-out",
          isOpen
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none translate-y-4 opacity-0"
        )}
      >
        <Card className="w-80 p-4 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Analytics</h2>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-medium text-sm text-muted-foreground">
                Total Page Views
              </h3>
              <p className="text-2xl font-bold">
                {events.filter(e => e.event === 'page_view').length}
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium text-sm text-muted-foreground">
                Recent Interactions
              </h3>
              <div className="space-y-2">
                {events
                  .filter(e => e.event === 'interaction')
                  .slice(-5)
                  .map((event, i) => (
                    <div
                      key={i}
                      className="text-sm rounded-lg bg-muted p-2 text-muted-foreground"
                    >
                      <span className="font-medium">
                        {new Date(event.timestamp).toLocaleTimeString()}
                      </span>
                      : User {event.userId.slice(0, 6)} clicked{' '}
                      {event.metadata.element}
                    </div>
                  ))}
                {events.filter(e => e.event === 'interaction').length === 0 && (
                  <p className="text-sm text-muted-foreground italic">
                    No interactions yet
                  </p>
                )}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

