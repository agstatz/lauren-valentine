 'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function MapPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const dog = searchParams.get('dog');
  const [displayedText, setDisplayedText] = useState('');

  const dogImages = {
    otis: '/otis_collie.png',
    benny: '/benny_bern.png',
    rosie: '/rosie_dachshund.png',
  } as Record<string, string>;

  const dogLabel = dog === 'otis' ? 'Otis' : dog === 'benny' ? 'Benny' : dog === 'rosie' ? 'Rosie' : 'Your Companion';
  
  const [isTextComplete, setIsTextComplete] = useState(false);
  
  const storyText = "Ashton has been kidnapped! The only way to find him is to travel through five stages. Each contains a puzzle. I'll help guide you through the memories to uncover where he might be hiding!";

  useEffect(() => {
    const words = storyText.split(' ');
    let currentIndex = 0;

    const interval = setInterval(() => {
      if (currentIndex < words.length) {
        const word = words[currentIndex];
        setDisplayedText((prev) => {
          return prev + (prev ? ' ' : '') + word;
        });
        currentIndex++;
      }
      
      if (currentIndex >= words.length) {
        clearInterval(interval);
        setIsTextComplete(true);
      }
    }, 150);

    return () => clearInterval(interval);
  }, [storyText]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#C4EBC8] p-8 relative overflow-hidden">
      {/* Postcard background container */}
      <div
        className="fixed bg-[#F5F1E8] shadow-2xl pointer-events-none"
        style={{
          width: '90vw',
          maxWidth: '1200px',
          height: '85vh',
          maxHeight: '900px',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          outline: '2px dashed #ab9393ff',
          outlineOffset: '-20px',
          zIndex: 5,
        }}
      />

      {/* Companion Card in Bottom Right */}
      {dog && dogImages[dog] && (
        <div
          className="fixed z-50"
          style={{
            right: 'max(calc((100vw - 1200px) / 2 + 40px), 40px)',
            bottom: 'max(calc((100vh - 900px) / 2 + 40px), 40px)',
            maxWidth: '320px',
          }}
        >
          <div className="bg-white/95 rounded-2xl shadow-2xl p-5 border-4 border-pink-200">
            <div className="flex items-start gap-4">
              <div className="relative w-20 h-20 flex-shrink-0">
                <Image
                  src={dogImages[dog]}
                  alt={dogLabel}
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg text-slate-900 mb-2 font-[family-name:var(--font-playfair-display)]">
                  {dogLabel}
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed min-h-[120px]">
                  {displayedText}
                </p>
                {isTextComplete && (
                  <motion.button
                    onClick={() => router.push(`/puzzle?stage=purdue&dog=${dog}`)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-4 px-4 py-2 bg-pink-400 text-white font-medium rounded-full shadow-lg hover:shadow-xl transition-shadow"
                  >
                    Start Puzzle
                  </motion.button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Content container */}
      <div className="max-w-5xl w-full relative z-10 flex flex-col items-center p-8">
        <h1 className="text-5xl font-bold mb-12 text-slate-900 font-[family-name:var(--font-playfair-display)] mt-8">
          Adventure Map
        </h1>

        {/* Map Display - Primary Focus */}
        <div className="w-full max-w-3xl mb-8 relative">
          <div className="relative w-full aspect-[4/3]">
            <Image
              src="/map.png"
              alt="Adventure Map"
              fill
              className="object-contain"
              priority
            />
            
            {/* Lauren-v1 and Dog overlay in top left */}
            <div className="absolute top-[76px] left-[76px] z-20">
              {/* Lauren-v1 Image */}
              <div className="relative w-24 h-24 rounded-lg shadow-lg">
                <Image
                  src="/lauren-v1.png"
                  alt="Lauren"
                  fill
                  className="object-contain"
                />
              </div>
              
              {/* Chosen Dog Image - smaller and overlapping */}
              {dog && dogImages[dog] && (
                <div className="absolute bottom-0 right-0 translate-x-2 translate-y-2 w-14 h-14 rounded-lg shadow-lg p-0.5">
                  <Image
                    src={dogImages[dog]}
                    alt={dogLabel}
                    fill
                    className="object-contain"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
