/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'

type TrackingEvent = {
  userId: string
  event: string
  path: string
  timestamp: Date
  metadata?: Record<string, any>
}

const events: TrackingEvent[] = [] // In-memory store for demo. Use a database in production.

export async function trackEvent(data: TrackingEvent) {
  events.push(data)
  return { success: true }
}

export async function getEvents() {
  return events
}

