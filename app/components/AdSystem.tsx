'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { Delete } from 'lucide-react'

type Ad = {
  type: 'text' | 'image' | 'video'
  content: string
  duration: number
}

const ads: Ad[] = [
  { type: 'text', content: 'Faites la recherche rapide de vos produits dans les boutiques de notre plateforme minato.ai', duration: 10000 },
  { type: 'image', content: '/1.png', duration: 10000 },
  { type: 'text', content: 'Visitez la plateforme minato.ai en cliquant sur votre barre de navigation', duration: 10000 },
  { type: 'image', content: '/2.jpg', duration: 10000 },
  { type: 'video', content: 'https://tzupkqiuzvqpqvyevywz.supabase.co/storage/v1/object/public/Frontend_Videos/Rene/VID-20241221-WA0012.mp4', duration: 17000 },
  { type: 'video', content: 'https://tzupkqiuzvqpqvyevywz.supabase.co/storage/v1/object/public/Frontend_Videos/Rene/VID-20241221-WA0014.mp4 ', duration: 20000 },
  { type: 'text', content: 'Faites decouvrir votre boutique en ligne grace a notre Plateforme minato.ai', duration: 10000 },
  { type: 'video', content: 'https://tzupkqiuzvqpqvyevywz.supabase.co/storage/v1/object/public/Frontend_Videos/Rene/VID-20241221-WA0010.mp4', duration: 18000 },
  { type: 'video', content: 'https://tzupkqiuzvqpqvyevywz.supabase.co/storage/v1/object/public/Frontend_Videos/Rene/VID-20241221-WA0017.mp4', duration: 26000 },
  { type: 'video', content: 'https://tzupkqiuzvqpqvyevywz.supabase.co/storage/v1/object/public/Frontend_Videos/Rene/VID-20241221-WA0005.mp4', duration: 19000 },
  { type: 'video', content: 'https://tzupkqiuzvqpqvyevywz.supabase.co/storage/v1/object/public/Frontend_Videos/Rene/VID-20241221-WA0015.mp4', duration: 23000 },
  { type: 'video', content: 'https://tzupkqiuzvqpqvyevywz.supabase.co/storage/v1/object/public/Frontend_Videos/Rene/VID-20241221-WA0016.mp4', duration: 33000 },
  { type: 'video', content: 'https://tzupkqiuzvqpqvyevywz.supabase.co/storage/v1/object/public/Frontend_Videos/Rene/VID-20241221-WA0013.mp4', duration: 33000 },
  { type: 'video', content: 'https://tzupkqiuzvqpqvyevywz.supabase.co/storage/v1/object/public/Frontend_Videos/Rene/VID-20241221-WA0011.mp4', duration: 40000 },
  { type: 'video', content: 'https://tzupkqiuzvqpqvyevywz.supabase.co/storage/v1/object/public/Frontend_Videos/Rene/VID-20241221-WA0009.mp4', duration: 23000 },
  { type: 'video', content: 'https://tzupkqiuzvqpqvyevywz.supabase.co/storage/v1/object/public/Frontend_Videos/Rene/VID-20241221-WA0008.mp4', duration: 34000 },
  { type: 'video', content: 'https://tzupkqiuzvqpqvyevywz.supabase.co/storage/v1/object/public/Frontend_Videos/Rene/VID-20241221-WA0007.mp4', duration: 29000 },
  { type: 'video', content: 'https://tzupkqiuzvqpqvyevywz.supabase.co/storage/v1/object/public/Frontend_Videos/Rene/VID-20241221-WA0006.mp4', duration: 33000 },
  { type: 'video', content: 'https://tzupkqiuzvqpqvyevywz.supabase.co/storage/v1/object/public/Frontend_Videos/Rene/VID-20241221-WA0004.mp4', duration: 17000 },
  { type: 'video', content: 'https://tzupkqiuzvqpqvyevywz.supabase.co/storage/v1/object/public/Frontend_Videos/Rene/VID-20241221-WA0003.mp4', duration: 42000 },
  { type: 'video', content: 'https://tzupkqiuzvqpqvyevywz.supabase.co/storage/v1/object/public/Frontend_Videos/Rene/VID-20241221-WA0002.mp4', duration: 18000 },
  { type: 'video', content: 'https://tzupkqiuzvqpqvyevywz.supabase.co/storage/v1/object/public/Frontend_Videos/Rene/VID-20241221-WA0001.mp4', duration: 18000 },
]

export default function AdSystem() {
  const [currentAd, setCurrentAd] = useState<Ad | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const videoRef = useRef<HTMLVideoElement | null>(null)

  useEffect(() => {
    audioRef.current = new Audio('/notif.mp3') // Replace with your actual sound file
  }, [])

  const showAd = () => {
    const randomAd = ads[Math.floor(Math.random() * ads.length)]
    setCurrentAd(randomAd)
    setIsVisible(true)
    if (audioRef.current) {
      audioRef.current.volume = 0.2 // Set volume to 20% (very soft)
      audioRef.current.play().catch(error => console.error('Error playing sound:', error))
    }
    setTimeout(() => {
      setIsVisible(false)
      setCurrentAd(null)
    }, randomAd.duration)
  }

  useEffect(() => {
    const timeout = setTimeout(showAd, 10000) // Show first ad after 10 seconds
    return () => clearTimeout(timeout)
  }, [])

  useEffect(() => {
    let timeout: NodeJS.Timeout
    if (!isVisible) {
      timeout = setTimeout(showAd, 30000) // Show next ad 10 seconds after the previous one disappears
    }
    return () => clearTimeout(timeout)
  }, [isVisible])

  if (!isVisible || !currentAd) return null

  return (
    <div className="fixed bottom-4 right-4 shadow-lg z-50 max-w-sm">
      {currentAd.type === 'text' && <p className='bg-white rounded-lg p-4'>{currentAd.content}</p>}
      {currentAd.type === 'image' && (
        <Image src={currentAd.content} 
        alt="Advertisement" 
        width={200} height={200} 
        className='rounded-lg'
        />
      )}
      {currentAd.type === 'video' && (
        <video 
          ref={videoRef}
          width={300}
          height={200}
          autoPlay
          className='rounded-lg h-full w-full'
          onPlay={() => {
            if (videoRef.current) {
              videoRef.current.volume = 0.5; // Set video volume to 50%
            }
          }}
        >
          <source src={currentAd.content} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
      <Delete
        onClick={() => setIsVisible(false)}
        className="absolute top-2 right-2 text-red-400 hover:text-red-700 w-4 h-4 cursor-pointer"
      />
    </div>
  )
}

