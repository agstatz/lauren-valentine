'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export default function Welcome() {
  const [adventureStarted, setAdventureStarted] = useState(false);
  const [selectedDog, setSelectedDog] = useState<string | null>(null);

  const dogs = ['🐕', '🐩', '🐕‍🦺'];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  const pageVariants = {
    exit: { opacity: 0, y: -50 },
    enter: { opacity: 1, y: 0 },
  };

  // Decorative elements for welcome page
  const hearts = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    left: (Math.random() * 120) - 10,
    delay: Math.random() * 0.5,
    duration: 4 + Math.random() * 2,
    sizeVariation: (Math.random() - 0.5) * 20,
    xOffset: (Math.random() - 0.5) * 60,
  }));

  const peonies = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    left: (Math.random() * 120) - 10,
    delay: Math.random() * 0.5,
    duration: 5 + Math.random() * 2,
    xOffset: (Math.random() - 0.5) * 60,
  }));

  const leaves = Array.from({ length: 35 }, (_, i) => ({
    id: i,
    left: (i / 35) * 120 - 10,
    delay: (i % 7) * 0.05,
    rotation: (i * 45) % 360,
    isLight: i % 2 === 0,
    sizeVariation: ((i % 3) - 1) * 10,
    xOffset: ((i % 5) - 2) * 25,
  }));

  return (
    <div className="flex min-h-screen items-center justify-center font-[family-name:var(--font-inter)] flex-col relative overflow-hidden" style={{ backgroundColor: '#C4EBC8' }}>
      {/* Background decorative leaves */}
      {!adventureStarted && (
        <>
          {/* Left side leaves */}
          <div className="absolute left-0 top-0 bottom-0 w-32 pointer-events-none opacity-70">
            {leaves.map((leaf) => (
              <motion.div
                key={`leaf-left-${leaf.id}`}
                className="absolute"
                style={{ left: '-80px', top: `${leaf.left}%`, marginLeft: `${leaf.xOffset}px` }}
                initial={{ scale: 0, rotate: leaf.rotation, x: -100 }}
                animate={{ scale: 1, rotate: leaf.rotation, x: 0 }}
                transition={{
                  duration: 1.6,
                  delay: leaf.delay,
                  ease: 'easeOut',
                }}
              >
                <svg width={320 + leaf.sizeVariation} height={320 + leaf.sizeVariation} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M50 10Q80 40 50 90Q20 40 50 10" fill={leaf.isLight ? '#52945E' : '#3A7D44'} />
                  <path d="M50 25Q65 50 50 75Q35 50 50 25" stroke={leaf.isLight ? '#3A7D44' : '#52945E'} strokeWidth="2" fill="none" />
                </svg>
              </motion.div>
            ))}
          </div>

          {/* Right side leaves */}
          <div className="absolute right-0 top-0 bottom-0 w-32 pointer-events-none opacity-70">
            {leaves.map((leaf) => (
              <motion.div
                key={`leaf-right-${leaf.id}`}
                className="absolute"
                style={{ right: '-80px', top: `${leaf.left}%`, marginRight: `${leaf.xOffset}px` }}
                initial={{ scale: 0, rotate: leaf.rotation, x: 100 }}
                animate={{ scale: 1, rotate: leaf.rotation, x: 0 }}
                transition={{
                  duration: 1.6,
                  delay: leaf.delay + 0.1,
                  ease: 'easeOut',
                }}
              >
                <svg width={320 + leaf.sizeVariation} height={320 + leaf.sizeVariation} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M50 10Q80 40 50 90Q20 40 50 10" fill={leaf.isLight ? '#52945E' : '#3A7D44'} />
                  <path d="M50 25Q65 50 50 75Q35 50 50 25" stroke={leaf.isLight ? '#3A7D44' : '#52945E'} strokeWidth="2" fill="none" />
                </svg>
              </motion.div>
            ))}
          </div>
        </>
      )}
      {/* Decorative hearts on left side */}
      {!adventureStarted && (
        <>
          <div className="absolute left-0 top-0 bottom-0 w-32 pointer-events-none">
            {hearts.map((heart) => (
              <motion.div
                key={`heart-left-${heart.id}`}
                className="absolute opacity-90"
                style={{ left: `-20px`, top: `${heart.left}%`, marginLeft: `${heart.xOffset}px` }}
                initial={{ scale: 0, x: -100 }}
                animate={{ scale: 1, x: 0 }}
                transition={{
                  duration: 1.2,
                  delay: heart.delay,
                  ease: 'easeOut',
                }}
              >
                <svg width={144 + heart.sizeVariation} height={144 + heart.sizeVariation} viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M36 66C36 66 6 48 6 30C6 18 14 12 22 12C28 12 32 16 36 20C40 16 44 12 50 12C58 12 66 18 66 30C66 48 36 66 36 66Z" fill="#FF6B9D" />
                </svg>
              </motion.div>
            ))}
          </div>

          {/* Decorative hearts on right side */}
          <div className="absolute right-0 top-0 bottom-0 w-32 pointer-events-none">
            {hearts.map((heart) => (
              <motion.div
                key={`heart-right-${heart.id}`}
                className="absolute opacity-90"
                style={{ right: `-20px`, top: `${heart.left}%`, marginRight: `${heart.xOffset}px` }}
                initial={{ scale: 0, x: 100 }}
                animate={{ scale: 1, x: 0 }}
                transition={{
                  duration: 1.2,
                  delay: heart.delay + 0.2,
                  ease: 'easeOut',
                }}
              >
                <svg width={144 + heart.sizeVariation} height={144 + heart.sizeVariation} viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M36 66C36 66 6 48 6 30C6 18 14 12 22 12C28 12 32 16 36 20C40 16 44 12 50 12C58 12 66 18 66 30C66 48 36 66 36 66Z" fill="#FF6B9D" />
                </svg>
              </motion.div>
            ))}
          </div>

          {/* Decorative peonies on left side */}
          <div className="absolute left-0 top-0 bottom-0 w-32 pointer-events-none">
            {peonies.map((peony) => (
              <motion.div
                key={`peony-left-${peony.id}`}
                className="absolute opacity-100"
                style={{ left: `10px`, top: `${peony.left}%`, marginLeft: `${peony.xOffset}px` }}
                initial={{ scale: 0, x: -100 }}
                animate={{ scale: 1, x: 0 }}
                transition={{
                  duration: 1.4,
                  delay: peony.delay,
                  ease: 'easeOut',
                }}
              >
                <svg
                  width="192"
                  height="192"
                  viewBox="0 0 96 96"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/*  Background (optional, transparent by default) */}

                  {/*  Leaves */}
                  <ellipse cx="28" cy="62" rx="18" ry="10" fill="#3A7D44" transform="rotate(-20 28 62)" />
                  <ellipse cx="68" cy="62" rx="18" ry="10" fill="#3A7D44" transform="rotate(20 68 62)" />

                  {/*  Outer petals */}
                  <circle cx="48" cy="40" r="28" fill="#F4A6C1" />
                  <circle cx="36" cy="32" r="18" fill="#F6B3CC" />
                  <circle cx="60" cy="32" r="18" fill="#F6B3CC" />
                  <circle cx="30" cy="46" r="18" fill="#F6B3CC" />
                  <circle cx="66" cy="46" r="18" fill="#F6B3CC" />

                  {/*  Inner petals */}
                  <circle cx="48" cy="40" r="16" fill="#F9C5D8" />
                  <circle cx="44" cy="36" r="10" fill="#FBD2E3" />
                  <circle cx="52" cy="36" r="10" fill="#FBD2E3" />
                  <circle cx="48" cy="44" r="10" fill="#FBD2E3" />

                  {/*  Center */}
                  <circle cx="48" cy="40" r="6" fill="#FFD1DC" />
                </svg>

              </motion.div>
            ))}
          </div>

          {/* Decorative peonies on right side */}
          <div className="absolute right-0 top-0 bottom-0 w-32 pointer-events-none">
            {peonies.map((peony) => (
              <motion.div
                key={`peony-right-${peony.id}`}
                className="absolute opacity-100"
                style={{ right: `10px`, top: `${peony.left}%`, marginRight: `${peony.xOffset}px` }}
                initial={{ scale: 0, x: 100 }}
                animate={{ scale: 1, x: 0 }}
                transition={{
                  duration: 1.4,
                  delay: peony.delay + 0.3,
                  ease: 'easeOut',
                }}
              >
                <svg
                  width="192"
                  height="192"
                  viewBox="0 0 96 96"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/*  Background (optional, transparent by default) */}

                  {/*  Leaves */}
                  <ellipse cx="28" cy="62" rx="18" ry="10" fill="#3A7D44" transform="rotate(-20 28 62)" />
                  <ellipse cx="68" cy="62" rx="18" ry="10" fill="#3A7D44" transform="rotate(20 68 62)" />

                  {/*  Outer petals */}
                  <circle cx="48" cy="40" r="28" fill="#F4A6C1" />
                  <circle cx="36" cy="32" r="18" fill="#F6B3CC" />
                  <circle cx="60" cy="32" r="18" fill="#F6B3CC" />
                  <circle cx="30" cy="46" r="18" fill="#F6B3CC" />
                  <circle cx="66" cy="46" r="18" fill="#F6B3CC" />

                  {/*  Inner petals */}
                  <circle cx="48" cy="40" r="16" fill="#F9C5D8" />
                  <circle cx="44" cy="36" r="10" fill="#FBD2E3" />
                  <circle cx="52" cy="36" r="10" fill="#FBD2E3" />
                  <circle cx="48" cy="44" r="10" fill="#FBD2E3" />

                  {/*  Center */}
                  <circle cx="48" cy="40" r="6" fill="#FFD1DC" />
                </svg>
              </motion.div>
            ))}
          </div>
        </>
      )}
      {!adventureStarted && (
        <motion.div
          className="fixed bg-[#F5F1E8] shadow-2xl pointer-events-none"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            width: '650px',
            height: '500px',
            left: 'calc(50vw - 325px)',
            top: 'calc(50vh - 250px)',
            outline: '2px dashed #ab9393ff',
            outlineOffset: '-20px',
            zIndex: 5,
          }}
        />
      )}
      <AnimatePresence mode="wait">
        {!adventureStarted ? (
          <motion.main
            key="welcome"
            className="flex min-h-screen w-full max-w-[650px] flex-col items-center justify-center py-32 px-8 relative z-10"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.5 }}
          >
            <motion.h1
              className="text-4xl sm:text-5xl font-bold text-black font-[family-name:var(--font-playfair-display)] relative z-20"
              variants={itemVariants}
            >
              Hi Lauren 💕
            </motion.h1>
            <motion.p
              className="mt-4 text-base sm:text-lg text-gray-700 text-center relative z-20"
              variants={itemVariants}
            >
              Welcome to your personalized valentine's day adventure! Click the button below to get started.
            </motion.p>

            <motion.button
              onClick={() => setAdventureStarted(true)}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-12 px-8 py-4 bg-white text-black font-medium rounded-full shadow-lg hover:shadow-xl transition-shadow font-[family-name:var(--font-playfair-display)] text-lg relative z-20"
            >
              Start Your Adventure
            </motion.button>
          </motion.main>
        ) : (
          <motion.main
            key="dogselection"
            className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-center py-32 px-16"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1
              className="text-5xl font-bold text-black font-[family-name:var(--font-playfair-display)]"
              variants={itemVariants}
            >
              Pick Your Companion
            </motion.h1>
            <motion.p
              className="mt-4 text-lg text-gray-700"
              variants={itemVariants}
            >
              Select your favorite dog:
            </motion.p>
            
            <motion.div
              className="mt-12 flex flex-col items-center gap-6"
              variants={itemVariants}
            >
              <div className="flex gap-4">
                {dogs.map((dog, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setSelectedDog(dog)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className={`text-5xl p-6 rounded-2xl transition-all ${
                      selectedDog === dog
                        ? 'bg-white shadow-xl scale-110'
                        : 'bg-white/70 hover:bg-white shadow-lg'
                    }`}
                  >
                    {dog}
                  </motion.button>
                ))}
              </div>
              {selectedDog && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-4 text-lg text-gray-700 font-medium"
                >
                  You selected {selectedDog}!
                </motion.p>
              )}
            </motion.div>
          </motion.main>
        )}
      </AnimatePresence>

      {adventureStarted && (
        <motion.div
          className="fixed bottom-0 left-0 right-0 p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="flex items-center justify-center gap-4 max-w-3xl mx-auto">
            <div className="flex-1 flex items-center gap-4">
              {/* Step 1: Dog Selection */}
              <div className="flex flex-col items-center gap-2">
                <motion.div
                  className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center font-bold text-black"
                  animate={{ scale: selectedDog ? 1.1 : 1 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                >
                  1
                </motion.div>
                <span className="text-sm text-gray-700 font-medium">Pick your companion</span>
              </div>

              {/* Line between steps */}
              <motion.div
                className="flex-1 h-1 bg-white/50 rounded-full"
                animate={{ backgroundColor: selectedDog ? '#ffffff' : 'rgba(255, 255, 255, 0.5)' }}
              />

              {/* Step 2: Next Adventure */}
              <div className="flex flex-col items-center gap-2">
                <motion.div
                  className="w-12 h-12 rounded-full bg-white/50 shadow-lg flex items-center justify-center font-bold text-gray-600"
                >
                  2
                </motion.div>
                <span className="text-sm text-gray-700 font-medium">Next</span>
              </div>

              {/* Line between steps */}
              <motion.div className="flex-1 h-1 bg-white/50 rounded-full" />

              {/* Step 3: Final */}
              <div className="flex flex-col items-center gap-2">
                <motion.div className="w-12 h-12 rounded-full bg-white/50 shadow-lg flex items-center justify-center font-bold text-gray-600">
                  3
                </motion.div>
                <span className="text-sm text-gray-700 font-medium">Final</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
