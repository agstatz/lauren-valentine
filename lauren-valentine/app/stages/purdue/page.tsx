'use client';

import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface CrosswordCell {
  id: string;
  row: number;
  col: number;
  value: string;
  clueNumber?: number;
  clueType?: 'across' | 'down';
}

export default function Page() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const dog = searchParams.get('dog');
  const [displayedText, setDisplayedText] = useState('');
  const [isTextComplete, setIsTextComplete] = useState(false);
  const [cells, setCells] = useState<CrosswordCell[]>([]);
  const [focusedCell, setFocusedCell] = useState<string | null>(null);
  const [isPuzzleComplete, setIsPuzzleComplete] = useState(false);

  const dogImages = {
    otis: '/otis_collie.png',
    benny: '/benny_bern.png',
    rosie: '/rosie_dachshund.png',
  } as Record<string, string>;

  const dogLabel = dog === 'otis' ? 'Otis' : dog === 'benny' ? 'Benny' : dog === 'rosie' ? 'Rosie' : 'Your Companion';
  
  const explanationText = "This is a mini crossword! Solve it to get the first hint about Ashton's location.";

  // Mini crossword data (5x5 grid)
  const crosswordData = [
    // Row 0
    { row: 0, col: 0, letter: 'B', clueNumber: 1, clueType: 'across' as const },
    { row: 0, col: 1, letter: 'O' },
    { row: 0, col: 2, letter: 'I' },
    { row: 0, col: 3, letter: 'L', clueNumber: 2, clueType: 'across' as const },
    { row: 0, col: 4, letter: 'E' },
    // Row 1
    { row: 1, col: 0, letter: 'U' },
    { row: 1, col: 1, letter: '', block: true },
    { row: 1, col: 2, letter: 'N' },
    { row: 1, col: 3, letter: 'A' },
    { row: 1, col: 4, letter: 'R' },
    // Row 2
    { row: 2, col: 0, letter: 'S', clueNumber: 3, clueType: 'across' as const },
    { row: 2, col: 1, letter: '', block: true },
    { row: 2, col: 2, letter: 'D' },
    { row: 2, col: 3, letter: 'I', clueNumber: 4, clueType: 'across' as const },
    { row: 2, col: 4, letter: 'A' },
    // Row 3
    { row: 3, col: 0, letter: 'T' },
    { row: 3, col: 1, letter: '', block: true },
    { row: 3, col: 2, letter: 'I' },
    { row: 3, col: 3, letter: 'A' },
    { row: 3, col: 4, letter: 'N' },
    // Row 4
    { row: 4, col: 0, letter: 'E', clueNumber: 5, clueType: 'across' as const },
    { row: 4, col: 1, letter: '', block: true },
    { row: 4, col: 2, letter: 'A' },
    { row: 4, col: 3, letter: 'L' },
    { row: 4, col: 4, letter: 'S' },
  ];

  const clues = [
    { number: 1, type: 'across', text: 'Purdue University mascot' },
    { number: 2, type: 'across', text: 'To reduce' },
    { number: 3, type: 'across', text: 'Indiana city' },
    { number: 4, type: 'across', text: 'Of or relating to Mexico' },
    { number: 5, type: 'across', text: 'Sacred Hindu word' },
  ];

  useEffect(() => {
    // Initialize cells
    const initialCells = crosswordData.map((data) => ({
      id: `${data.row}-${data.col}`,
      row: data.row,
      col: data.col,
      value: (data as any).block ? '' : '',
      clueNumber: (data as any).clueNumber,
      clueType: (data as any).clueType,
    }));
    setCells(initialCells);
  }, []);

  useEffect(() => {
    const words = explanationText.split(' ');
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
  }, [explanationText]);

  const handleCellChange = (id: string, value: string) => {
    if (value.length <= 1) {
      setCells(cells.map(cell => 
        cell.id === id ? { ...cell, value: value.toUpperCase() } : cell
      ));
    }
  };

  // Check if puzzle is complete
  useEffect(() => {
    if (cells.length === 0) return;
    
    const correctAnswers = crosswordData.map(data => ({
      id: `${data.row}-${data.col}`,
      letter: data.letter
    }));

    const isComplete = correctAnswers.every(correct => {
      const cell = cells.find(c => c.id === correct.id);
      return cell?.value === correct.letter;
    });

    setIsPuzzleComplete(isComplete);
  }, [cells]);

  const handleCellKeyDown = (e: React.KeyboardEvent, id: string, row: number, col: number) => {
    if (e.key === 'ArrowRight') {
      const nextCell = cells.find(c => c.row === row && c.col === col + 1);
      if (nextCell) setFocusedCell(nextCell.id);
    } else if (e.key === 'ArrowLeft') {
      const prevCell = cells.find(c => c.row === row && c.col === col - 1);
      if (prevCell) setFocusedCell(prevCell.id);
    } else if (e.key === 'ArrowDown') {
      const belowCell = cells.find(c => c.row === row + 1 && c.col === col);
      if (belowCell) setFocusedCell(belowCell.id);
    } else if (e.key === 'ArrowUp') {
      const aboveCell = cells.find(c => c.row === row - 1 && c.col === col);
      if (aboveCell) setFocusedCell(aboveCell.id);
    }
  };

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
                <p className="text-sm text-gray-700 leading-relaxed min-h-[80px]">
                  {displayedText}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Content container */}
      <div className="max-w-5xl w-full relative z-10 flex flex-col items-center p-8">
        <h1 className="text-5xl font-bold mb-12 text-slate-900 font-[family-name:var(--font-playfair-display)] mt-8">
          Purdue Crossword Puzzle
        </h1>

        {/* Crossword Container */}
        <div className="bg-white/95 rounded-2xl shadow-2xl p-8 border-4 border-pink-200 mb-8">
          <div className="flex gap-8">
            {/* Crossword Grid */}
            <div>
              <div className="border-2 border-gray-800 inline-block">
                {[0, 1, 2, 3, 4].map((row) => (
                  <div key={row} className="flex">
                    {[0, 1, 2, 3, 4].map((col) => {
                      const cell = cells.find(c => c.row === row && c.col === col);
                      const data = crosswordData.find(d => d.row === row && d.col === col);
                      const isBlocked = (data as any)?.block;

                      return (
                        <div
                          key={cell?.id}
                          className={`w-10 h-10 border border-gray-300 flex items-center justify-center relative ${
                            isBlocked ? 'bg-gray-800' : 'bg-white'
                          }`}
                        >
                          {!isBlocked && (
                            <>
                              {cell?.clueNumber && (
                                <span className="absolute top-0.5 left-0.5 text-xs font-bold text-gray-700">
                                  {cell.clueNumber}
                                </span>
                              )}
                              <input
                                type="text"
                                maxLength={1}
                                value={cell?.value || ''}
                                onChange={(e) => cell && handleCellChange(cell.id, e.target.value)}
                                onKeyDown={(e) => cell && handleCellKeyDown(e, cell.id, cell.row, cell.col)}
                                onFocus={() => cell && setFocusedCell(cell.id)}
                                className={`w-full h-full text-center font-bold text-lg focus:outline-none focus:ring-2 focus:ring-pink-400 ${
                                  focusedCell === cell?.id ? 'bg-pink-100' : ''
                                }`}
                              />
                            </>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>

            {/* Clues */}
            <div className="flex-1">
              <h3 className="font-bold text-lg mb-4 text-slate-900">Clues</h3>
              <div className="flex gap-8">
                {/* Across Clues */}
                <div className="flex-1">
                  <h4 className="font-semibold text-sm text-gray-800 mb-3">Across</h4>
                  <div>
                    {clues.filter(c => c.type === 'across').map((clue) => (
                      <div key={`${clue.number}-${clue.type}`} className="mb-4">
                        <p className="font-semibold text-sm text-gray-800">
                          {clue.number}.
                        </p>
                        <p className="text-sm text-gray-700 ml-4">{clue.text}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Down Clues */}
                <div className="flex-1">
                  <h4 className="font-semibold text-sm text-gray-800 mb-3">Down</h4>
                  <div>
                    {clues.filter(c => c.type === 'down').map((clue) => (
                      <div key={`${clue.number}-${clue.type}`} className="mb-4">
                        <p className="font-semibold text-sm text-gray-800">
                          {clue.number}.
                        </p>
                        <p className="text-sm text-gray-700 ml-4">{clue.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {isPuzzleComplete && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push(`/map?dog=${dog}&stage=chicago`)}
            className="mt-6 px-6 py-3 bg-pink-400 text-white font-bold text-lg rounded-full shadow-lg hover:shadow-xl transition-shadow"
          >
            Continue to Next Stage
          </motion.button>
        )}
      </div>
    </main>
  );
}
