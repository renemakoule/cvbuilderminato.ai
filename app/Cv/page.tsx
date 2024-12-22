'use client'

import Link from "next/link"
import { motion } from "framer-motion"

// Type pour les données de la carte
interface CardData {
  id: number
  title: string
  description: string
  link: string
}

// Données d'exemple
const cardsData: CardData[] = [
  {
    id: 1,
    title: "Classic CV",
    description:
      "only available on pc or tablet for a good user experience",
    link: "/Classic",
  },
  {
    id: 2,
    title: "Standard CV",
    description:
      "only available on pc or tablet for a good user experience",
    link: "/Standard",
  },
  {
    id: 3,
    title: "Creative CV",
    description:
      "only available on pc or tablet for a good user experience",
    link: "/Creative_cv",
  },
  {
    id: 4,
    title: "Minimal CV",
    description:
      "only available on pc or tablet for a good user experience",
    link: "/Minimal_cv",
  },
  {
    id: 5,
    title: "Modern CV",
    description:
      "only available on pc or tablet for a good user experience",
    link: "/Modern_cv",
  },
  {
    id: 6,
    title: "Professional CV",
    description:
      "only available on pc or tablet for a good user experience",
    link: "/Professional_cv",
  },
]

export default function CardGrid() {
  return (
    <section className="container mx-auto px-4 py-8 poppins-regular bg-primary/50 shadow-lg rounded-lg mt-5">
      <div className="flex flex-row space-x-4 mb-8 items-center justify-center">
        <label className="grid cursor-pointer place-items-center">
          <input
            type="checkbox"
            value="synthwave"
            className="toggle theme-controller bg-base-content col-span-2 col-start-1 row-start-1"
          />
          <svg
            className="stroke-base-100 fill-base-100 col-start-1 row-start-1"
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="5" />
            <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
          </svg>
          <svg
            className="stroke-base-100 fill-base-100 col-start-2 row-start-1"
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        </label>
        <motion.h1 
          className="text-3xl font-bold text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Choose the design of your CV
        </motion.h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cardsData.map((card, index) => (
          <Link 
          href={card.link} 
          key={card.id}
          className="block"
          target="_blank"
        >
          <motion.div
            key={card.id}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: index * 0.1,
              ease: "easeOut"
            }}
            whileHover={{ 
              scale: 1.02,
              transition: { duration: 0.2 }
            }}
            className="card bg-base-100 w-full shadow-xl cursor-pointer"
          >
            <div className="card-body">
              <h2 className="card-title">{card.title}</h2>
              <p>{card.description}</p>
              <div className="card-actions justify-end">
                <Link href={card.link} className="ml-auto" target="_blank">
                  <motion.button 
                    className="btn btn-primary"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Create Now
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>
          </Link>
        ))}
      </div>
    </section>
  )
}

