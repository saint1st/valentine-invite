'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type Stage = 'intro' | 'quiz' | 'valentine' | 'invite'

export default function Home() {
  const [stage, setStage] = useState<Stage>('intro')
  const [showSike, setShowSike] = useState(false)

  // Quiz
  const [quizIndex, setQuizIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [feedback, setFeedback] = useState<string | null>(null)
  const [saturdayError, setSaturdayError] = useState(false)

  // Valentine
  const [noCount, setNoCount] = useState(0)
  const [memeIndex, setMemeIndex] = useState<number | null>(null)

  const memes = ['/meme0.jpg', '/meme1.jpg', '/meme2.jpg']
  const yesScale = 1 + noCount * 0.18

  const noTexts = [
    'No 🙂',
    'Still no? 😅',
    'Negotiations have started 🙏',
    'Okay I am literally praying now 🛐',
    'This button is losing credibility…'
  ]

  /* 🔁 Retry current question */
  const retryQuestion = () => {
    setSelectedAnswer(null)
    setShowFeedback(false)
    setFeedback(null)
    setSaturdayError(false)
  }

  /* 🔙 Back = −1 step */
  const goBack = () => {
    if (stage === 'invite') {
      setStage('valentine')
      return
    }

    if (stage === 'valentine') {
      setStage('quiz')
      setQuizIndex(quiz.length - 1)
      retryQuestion()
      return
    }

    if (stage === 'quiz' && quizIndex > 0) {
      setQuizIndex(i => i - 1)
      retryQuestion()
    }
  }

  const quiz = [
    {
      type: 'image',
      q: 'What do you think I would choose in a room full of girls?',
      options: [
        { src: '/ariana.jpg', feedback: 'How you dare to think like that babe 😤' },
        { src: '/madison.jpg', feedback: 'After everything? Beer? You know I don’t drink beer. 😅' },
        { src: '/aya.jpg', feedback: 'It’s you, no question 💖💖💖' }
      ]
    },
    {
      type: 'image',
      q: 'Who would you choose in a room full of boys?',
      options: [
        { src: '/jungkook.jpg', feedback: 'Okay okay… I see the competition 😏' },
        { src: '/korean.jpg', feedback: 'Interesting choice… noted 🧐' },
        { src: '/cola_face.png', feedback: 'OFC Coca-Cola BABES!!!!!!!!!!!!!!!!!!!!! 😌' }
      ]
    },
    {
      type: 'text',
      q: 'When did we meet first?',
      options: [
        { text: '19.11.2024', feedback: 'Correct. Impressive memory 💖' },
        { text: '24.11.2024', feedback: 'Creative, but wrong 😄' },
        { text: '17.11.2024', feedback: 'Nope, close but not that close 😏' }
      ]
    },
    {
      type: 'text',
      q: 'Who won all the games in air hockey and basketball?',
      options: [
        { text: 'Aya', feedback: 'Nice confidence 😄 but no.' },
        { text: 'Darkhan', feedback: 'Exactly. Absolute domination 😎' },
        { text: 'We tied', feedback: 'That’s very diplomatic of you 😅' }
      ]
    },
    {
      type: 'text',
      q: 'Do you have plans this Saturday night?',
      options: [
        { text: 'Yes', value: 'no' },
        { text: 'No', value: 'yes' }
      ]
    }
  ]

  const current = quiz[quizIndex]

  const answer = (idx: number, opt: any) => {
    setSelectedAnswer(idx)
    setShowFeedback(true)

    if (current.q.includes('Saturday')) {
      if (opt.value === 'yes') {
        setStage('valentine')
      } else {
        setSaturdayError(true)
      }
      return
    }

    setFeedback(opt.feedback)
  }

  const next = () => {
    setQuizIndex(i => i + 1)
    retryQuestion()
  }

  const noClick = () => {
    setNoCount(c => c + 1)
    setMemeIndex(m => (m === null ? 0 : (m + 1) % memes.length))
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-50 to-pink-100 px-4">
      <AnimatePresence mode="wait">

        {/* INTRO */}
        {stage === 'intro' && (
          <motion.div className="bg-white/80 p-6 rounded-3xl shadow-lg max-w-md w-full text-center">
            {!showSike ? (
              <>
                <h1 className="text-2xl font-semibold mb-3">
                  Glaciology Research Survey
                </h1>
                <p className="text-gray-600 mb-4">
                  Short survey on cryosphere dynamics and glacier perception.
                </p>
                <button
                  onClick={() => setShowSike(true)}
                  className="px-6 py-3 bg-blue-500 text-white rounded-full"
                >
                  Start survey
                </button>
              </>
            ) : (
              <>
                <img src="/sike.gif" className="w-full rounded-2xl mb-4" />
                <p className="text-xl font-semibold mb-2">SIKEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE 😄</p>
                <button
                  onClick={() => setStage('quiz')}
                  className="px-6 py-3 bg-rose-500 text-white rounded-full"
                >
                  Continue
                </button>
              </>
            )}
          </motion.div>
        )}

        {/* QUIZ */}
        {stage === 'quiz' && !saturdayError && (
          <motion.div className="bg-white/80 p-6 rounded-3xl shadow-lg max-w-md w-full text-center">
            <h2 className="text-xl font-semibold mb-4">{current.q}</h2>

            {current.type === 'image' ? (
              <div className="flex flex-wrap gap-3 justify-center">
                {current.options.map((o: any, i: number) => (
                  <button
                    key={i}
                    disabled={selectedAnswer !== null}
                    onClick={() => answer(i, o)}
                    className="w-40 h-52 rounded-xl overflow-hidden shadow"
                  >
                    <img src={o.src} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {current.options.map((o: any, i: number) => (
                  <button
                    key={i}
                    disabled={selectedAnswer !== null}
                    onClick={() => answer(i, o)}
                    className="px-4 py-2 bg-rose-100 rounded-full"
                  >
                    {o.text}
                  </button>
                ))}
              </div>
            )}

            {showFeedback && feedback && (
              <p className="mt-4 font-semibold text-rose-600">{feedback}</p>
            )}

            <div className="mt-4 flex justify-between items-center">
              <button onClick={goBack} className="text-sm text-gray-400">
                Back
              </button>

              {showFeedback && !current.q.includes('Saturday') && (
                <button onClick={next} className="px-4 py-2 bg-gray-200 rounded-full">
                  Next
                </button>
              )}

              <button onClick={retryQuestion} className="text-sm text-gray-400">
                Retry
              </button>
            </div>
          </motion.div>
        )}

        {/* SATURDAY ERROR */}
        {saturdayError && (
          <motion.div className="w-full h-screen bg-black text-white flex flex-col items-center justify-center">
            <h1 className="text-4xl mb-3">Error 404 😅</h1>
            <p>Plans not found. System shutting down.</p>
            <button
              onClick={retryQuestion}
              className="mt-6 px-4 py-2 bg-white text-black rounded-full"
            >
              Retry
            </button>
          </motion.div>
        )}

        {/* VALENTINE */}
        {stage === 'valentine' && (
          <motion.div className="bg-white/80 p-6 rounded-3xl shadow-lg max-w-md w-full text-center">
            <button onClick={goBack} className="text-sm text-gray-400 mb-2">
              Back
            </button>

            <p className="text-gray-500 mb-1">Aya, quick question…</p>
            <h1 className="text-3xl font-semibold mb-6">
              Would you be my Valentine?
            </h1>

            <div className="flex gap-4 justify-center flex-wrap">
              <motion.button
                animate={{ scale: yesScale }}
                onClick={() => setStage('invite')}
                className="px-6 py-3 bg-rose-500 text-white rounded-full"
              >
                Yes 💖
              </motion.button>

              <button onClick={noClick} className="px-6 py-3 bg-gray-100 rounded-full">
                {noTexts[Math.min(noCount, noTexts.length - 1)]}
              </button>
            </div>

            {memeIndex !== null && (
              <img src={memes[memeIndex]} className="mt-4 rounded-xl" />
            )}
          </motion.div>
        )}

        {/* INVITE */}
        {stage === 'invite' && (
          <motion.div className="bg-white/80 p-6 rounded-3xl shadow-lg max-w-md w-full relative overflow-hidden">
            <button onClick={goBack} className="text-sm text-gray-400 mb-2">
              Back
            </button>

            {Array.from({ length: 12 }).map((_, i) => (
              <motion.img
                key={i}
                src="/coke2.png"
                className="absolute w-10 top-[-80px]"
                style={{ left: `${Math.random() * 90}%` }}
                animate={{ y: 700, rotate: 360 }}
                transition={{ duration: 3 + Math.random() * 2, repeat: Infinity }}
              />
            ))}

            <h2 className="text-xl font-semibold text-center mb-2">
              Dinner at Olly?
            </h2>
            <p className="text-center mb-4">
              ✨ Start at 19:00 
              🎻 Live violin, romantic vibe just for us ✨
                Saturday night. Just you and me 💖
                Wear a nice dress… and don’t forget your beautiful smile 😘
            </p>

            <iframe
              className="w-full h-64 rounded-2xl"
              src="https://www.google.com/maps?q=Olly,+Almaty&ll=43.195035,76.8916816&z=17&output=embed"
              loading="lazy"
            />
          </motion.div>
        )}

      </AnimatePresence>
    </main>
  )
}
