'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useMemo, JSX } from 'react';
import { useRouter } from 'next/navigation';

export default function Welcome() {
  const [adventureStarted, setAdventureStarted] = useState(false);
  const [selectedDog, setSelectedDog] = useState<string | null>(null);
  const [hoveredCompanion, setHoveredCompanion] = useState<string | null>(null);
  const [phase, setPhase] = useState<'selection' | 'map' | 'final'>('selection');
  const router = useRouter();

  const companions: {
    id: string;
    label: string;
    type: 'emoji' | 'svg' | 'image';
    content: string | JSX.Element;
    breed: string;
    specialAbility: string;
    stats: {
      loyalty: number;
      playfulness: number;
      intelligence: number;
      cuteness: number;
    };
  }[] = [
    {
      id: 'otis',
      label: 'Otis',
      type: 'image',
      content: '/otis_collie.png',
      breed: 'Border Collie',
      specialAbility: 'Puzzle Master',
      stats: {
        loyalty: 90,
        playfulness: 75,
        intelligence: 100,
        cuteness: 70,
      },
    },
    {
      id: 'benny',
      label: 'Benny',
      type: 'image',
      content: '/benny_bern.png',
      breed: 'Bernese Mountain Dog',
      specialAbility: 'Loyal Companion',
      stats: {
        loyalty: 100,
        playfulness: 80,
        intelligence: 65,
        cuteness: 80,
      },
    },
    {
      id: 'rosie',
      label: 'Rosie',
      type: 'image',
      content: '/rosie_dachshund.png',
      breed: 'Dachshund',
      specialAbility: 'Memory Keeper',
      stats: {
        loyalty: 90,
        playfulness: 85,
        intelligence: 75,
        cuteness: 100,
      },
    },
  ];

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
  const hearts = useMemo(() => Array.from({ length: 8 }, (_, i) => ({
    id: i,
    left: (Math.random() * 120) - 10,
    delay: Math.random() * 0.5,
    duration: 4 + Math.random() * 2,
    sizeVariation: (Math.random() - 0.5) * 20,
    xOffset: (Math.random() - 0.5) * 60,
  })), []);

  const peonies = useMemo(() => Array.from({ length: 12 }, (_, i) => ({
    id: i,
    left: (Math.random() * 120) - 10,
    delay: Math.random() * 0.5,
    duration: 5 + Math.random() * 2,
    xOffset: (Math.random() - 0.5) * 60,
  })), []);

  const leaves = useMemo(() => Array.from({ length: 35 }, (_, i) => ({
    id: i,
    left: (i / 35) * 120 - 10,
    delay: (i % 7) * 0.05,
    rotation: (i * 45) % 360,
    isLight: i % 2 === 0,
    sizeVariation: ((i % 3) - 1) * 10,
    xOffset: ((i % 5) - 2) * 25,
  })), []);

  return (
    <div className="flex min-h-screen items-center justify-center font-[family-name:var(--font-inter)] flex-col relative overflow-hidden" style={{ backgroundColor: '#C4EBC8' }}>
      {/* Background decorative leaves */}
      {(!adventureStarted || phase === 'selection') && (
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
      {(!adventureStarted || phase === 'selection') && (
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
      {phase === 'selection' && (
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
      )}      <AnimatePresence mode="wait">
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
        ) : phase === 'selection' ? (
          <motion.main
            key="dogselection"
            className="flex min-h-screen w-full max-w-[650px] flex-col items-center justify-center py-32 px-8 relative z-10"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1
              className="text-4xl sm:text-5xl font-bold text-black font-[family-name:var(--font-playfair-display)] relative z-20"
              variants={itemVariants}
            >
              Pick Your Companion
            </motion.h1>
            <motion.p
              className="mt-4 text-base sm:text-lg text-gray-700 relative z-20"
              variants={itemVariants}
            >
              Select your favorite dog:
            </motion.p>
            
            <motion.div
              className="mt-12 flex flex-col items-center gap-6 relative z-20"
              variants={itemVariants}
            >
              <div className="flex gap-4 relative">
                {companions.map((companion) => (
                  <div key={companion.id} className="relative">
                    <motion.button
                      onClick={() => {
                        setHoveredCompanion((current) => (current === companion.id ? null : companion.id));
                      }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className={`p-4 rounded-2xl transition-all flex items-center justify-center w-28 h-28 ${
                        selectedDog === companion.id
                          ? 'bg-white shadow-xl scale-110'
                          : 'bg-white/70 hover:bg-white shadow-lg'
                      }`}
                      aria-label={`Select ${companion.label}`}
                    >
                      {companion.type === 'emoji' ? (
                        <span className="text-5xl">{companion.content as string}</span>
                      ) : companion.type === 'image' ? (
                        <img
                          src={companion.content as string}
                          alt={companion.label}
                          className="w-24 h-24 object-contain"
                        />
                      ) : (
                        <div className="w-24 h-24">{companion.content as JSX.Element}</div>
                      )}
                    </motion.button>
                    
                  <div className="relative">
                    <AnimatePresence mode="wait">
                      {hoveredCompanion === companion.id && (
                        <>
                          <motion.div
                            key={`backdrop-${companion.id}`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="fixed inset-0 z-40"
                            onClick={() => {
                              setHoveredCompanion(null);
                              setSelectedDog(null);
                            }}
                          />
                          <motion.div
                            key={`popup-${companion.id}`}
                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                            transition={{ duration: 0.3, ease: 'easeOut' }}
                            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-2xl p-4 w-64 max-h-[80vh] overflow-auto z-50 pointer-events-auto"
                            onClick={(event) => event.stopPropagation()}
                            layout
                          >
                          <div className="flex justify-center mb-3">
                            {companion.type === 'emoji' ? (
                              <span className="text-4xl">{companion.content as string}</span>
                            ) : companion.type === 'image' ? (
                              <img
                                src={companion.content as string}
                                alt={companion.label}
                                className="w-20 h-20 object-contain"
                              />
                            ) : (
                              <div className="w-20 h-20">{companion.content as JSX.Element}</div>
                            )}
                          </div>
                          <h3 className="font-bold text-lg text-black mb-1 text-center">{companion.label}</h3>
                          <p className="text-sm text-gray-600 mb-3 text-center">{companion.breed}</p>
                          
                          <div className="mb-3 pb-3 border-b border-gray-200">
                            <p className="text-xs font-semibold text-gray-700 mb-1">✨ Special Ability</p>
                            <p className="text-sm text-gray-800">{companion.specialAbility}</p>
                          </div>
                          
                          <div className="space-y-2 mb-4">
                            <div>
                              <div className="flex justify-between text-xs mb-1">
                                <span className="font-semibold text-gray-700">Loyalty</span>
                                <span className="text-gray-600">{companion.stats.loyalty}%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-pink-400 h-2 rounded-full"
                                  style={{ width: `${companion.stats.loyalty}%` }}
                                />
                              </div>
                            </div>
                            <div>
                              <div className="flex justify-between text-xs mb-1">
                                <span className="font-semibold text-gray-700">Playfulness</span>
                                <span className="text-gray-600">{companion.stats.playfulness}%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-yellow-400 h-2 rounded-full"
                                  style={{ width: `${companion.stats.playfulness}%` }}
                                />
                              </div>
                            </div>
                            <div>
                              <div className="flex justify-between text-xs mb-1">
                                <span className="font-semibold text-gray-700">Intelligence</span>
                                <span className="text-gray-600">{companion.stats.intelligence}%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-blue-400 h-2 rounded-full"
                                  style={{ width: `${companion.stats.intelligence}%` }}
                                />
                              </div>
                            </div>
                            <div>
                              <div className="flex justify-between text-xs mb-1">
                                <span className="font-semibold text-gray-700">Cuteness</span>
                                <span className="text-gray-600">{companion.stats.cuteness}%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-purple-400 h-2 rounded-full"
                                  style={{ width: `${companion.stats.cuteness}%` }}
                                />
                              </div>
                            </div>
                          </div>
                          
                          <motion.button
                            onClick={() => {
                              setSelectedDog(companion.id);
                              setHoveredCompanion(null);
                              router.push(`/map?dog=${companion.id}`);
                            }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`w-full px-4 py-2 text-white font-medium rounded-full shadow-lg hover:shadow-xl transition-shadow ${
                              companion.id === 'otis'
                                ? 'bg-purple-400'
                                : companion.id === 'benny'
                                ? 'bg-blue-500'
                                : 'bg-pink-500'
                            }`}
                          >
                            Pick {companion.label}
                          </motion.button>
                        </motion.div>
                        </>
                      )}
                    </AnimatePresence>
                  </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.main>
        ) : null}
      </AnimatePresence>


    </div>
  );
}
