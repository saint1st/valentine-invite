'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const noTexts = [
  'No 🙂',
  'Hmm… still no? 😅',
  'I’m starting to negotiate now 🙏',
  'Okay, I might start praying 😄',
  'Alright, this is getting suspicious…'
]

export default function Home() {
  const [noCount, setNoCount] = useState(0)
  const [stage, setStage] = useState<'question' | 'invite'>('question')

  const yesScale = 1 + noCount * 0.15
  const noDisabled = noCount >= noTexts.length - 1

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-50 to-pink-100 px-4">
      <AnimatePresence mode="wait">

        {/* QUESTION STAGE */}
        {stage === 'question' && (
          <motion.div
            key="question"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="max-w-md w-full text-center bg-white/80 backdrop-blur rounded-3xl p-8 shadow-lg"
          >
            <p className="text-gray-500 mb-2">
              Hey Aya — quick question…
            </p>

            <h1 className="text-3xl font-semibold mb-8">
              Would you be my Valentine?
            </h1>

            <div className="flex gap-4 justify-center items-center flex-wrap">
              <motion.button
                animate={{ scale: yesScale }}
                whileTap={{ scale: yesScale * 0.95 }}
                transition={{ type: 'spring', stiffness: 300 }}
                onClick={() => setStage('invite')}
                className="px-6 py-3 rounded-full bg-rose-500 text-white font-medium hover:bg-rose-600 transition"
              >
                Yes 💖
              </motion.button>

              <button
                disabled={noDisabled}
                onClick={() => setNoCount(c => c + 1)}
                className={`px-6 py-3 rounded-full font-medium transition
                  ${noDisabled
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                {noTexts[Math.min(noCount, noTexts.length - 1)]}
              </button>
            </div>

            {noDisabled && (
              <p className="text-sm text-gray-400 mt-4">
                I had to try at least 😌
              </p>
            )}
          </motion.div>
        )}

        {/* INVITE STAGE */}
        {stage === 'invite' && (
          <motion.div
            key="invite"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="max-w-md w-full bg-white/80 backdrop-blur rounded-3xl p-6 shadow-lg"
          >
            <div className="text-center mb-4">
              <div className="text-4xl mb-2">💖</div>
              <p className="text-lg mb-2">That made me smile.</p>

              <p className="text-gray-700 leading-relaxed">
                Aya, would you join me for dinner<br />
                <strong>this Saturday night</strong><br />
                at <strong>Abish Kekilbay 219/1</strong>, Almaty?
              </p>

              <p className="text-sm text-gray-400 mt-3">
                — Darkhan
              </p>
            </div>

            {/* MAP */}
            <div className="w-full h-64 rounded-2xl overflow-hidden mt-4">
              <iframe
                title="Dinner location map"
                src="https://www.google.com/maps?q=Abish+Kekilbay+219/1,+Almaty,+Kazakhstan&output=embed"
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </main>
  )
}
