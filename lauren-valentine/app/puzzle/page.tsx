'use client';

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

export default function Puzzle() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const stage = searchParams.get('stage');
  const dog = searchParams.get('dog');
  const [displayedText, setDisplayedText] = useState('');
  const [isTextComplete, setIsTextComplete] = useState(false);
  const [cells, setCells] = useState<CrosswordCell[]>([]);
  const [focusedCell, setFocusedCell] = useState<string | null>(null);

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
    { row: 0, col: 0, letter: 'K', clueNumber: 1, clueType: 'across' as const },
    { row: 0, col: 1, letter: 'R', clueNumber: 2, clueType: 'down' as const },
    { row: 0, col: 2, letter: 'A', clueNumber: 3, clueType: 'down' as const },
    { row: 0, col: 3, letter: 'C', clueNumber: 4, clueType: 'down' as const },
    { row: 0, col: 4, letter: 'H', clueNumber: 5, clueType: 'down' as const },
    // Row 1
    { row: 1, col: 0, letter: 'N', clueNumber: 6, clueType: 'across' as const },
    { row: 1, col: 1, letter: 'A' },
    { row: 1, col: 2, letter: 'I' },
    { row: 1, col: 3, letter: 'V' },
    { row: 1, col: 4, letter: 'E' },
    // Row 2
    { row: 2, col: 0, letter: 'O', clueNumber: 7, clueType: 'across' as const },
    { row: 2, col: 1, letter: 'T' },
    { row: 2, col: 2, letter: 'I' },
    { row: 2, col: 3, letter: 'S' },
    { row: 2, col: 4, letter: '', block: true },
    // Row 3
    { row: 3, col: 0, letter: 'C', clueNumber: 8, clueType: 'across' as const},
    { row: 3, col: 1, letter: 'I' },
    { row: 3, col: 2, letter: 'T' },
    { row: 3, col: 3, letter: '', block: true},
    { row: 3, col: 4, letter: '', block: true},
    // Row 4
    { row: 4, col: 0, letter: 'K', clueNumber: 9, clueType: 'across' as const },
    { row: 4, col: 1, letter: 'O' },
    { row: 4, col: 2, letter: '', block: true },
    { row: 4, col: 3, letter: '', block: true },
    { row: 4, col: 4, letter: '', block: true },
  ];

  const clues = [
    { number: 1, type: 'down', text: 'Ceiling noise when getting ready for bed at Harrison' },
    { number: 2, type: 'down', text: 'Some ' },
    { number: 3, type: 'down', text: 'Ill-fated succulent' },
    { number: 4, type: 'down', text: 'Acronym for Ashton\'s original major at Purdue' },
    { number: 5, type: 'down', text: 'Swooned too hard?' },
    { number: 1, type: 'across', text: 'Institute for Tech Diplomacy' },
    { number: 6, type: 'across', text: 'What we may have been when we met' },
    { number: 7, type: 'across', text: 'Ill-fated succulent' },
    { number: 8, type: 'across', text: 'Acronym for Ashton\'s original major at Purdue' },
    { number: 9, type: 'across', text: 'Swooned too hard?' },
    
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

  const handleCellChange = (id: string, value: string, row: number, col: number) => {
    if (value.length <= 1) {
      setCells(cells.map(cell => 
        cell.id === id ? { ...cell, value: value.toUpperCase() } : cell
      ));
      
      // Auto-advance to next cell in the word (across by default)
      if (value.length === 1) {
        const nextCell = cells.find(c => c.row === row && c.col === col + 1);
        if (nextCell) setFocusedCell(nextCell.id);
      }
    }
  };

  const getWordCells = (row: number, col: number, direction: 'across' | 'down' = 'across') => {
    const wordCells: string[] = [];
    
    if (direction === 'across') {
      // Find all cells in the same row, starting from this cell and going right
      // Also include cells to the left until we hit a block or boundary
      let startCol = col;
      while (startCol > 0 && !cells.find(c => c.row === row && c.col === startCol - 1 && (crosswordData.find(d => d.row === c.row && d.col === c.col) as any)?.block)) {
        startCol--;
      }
      
      for (let c = startCol; c < 5; c++) {
        const cell = cells.find(d => d.row === row && d.col === c);
        const data = crosswordData.find(d => d.row === row && d.col === c) as any;
        if (data?.block) break;
        if (cell) wordCells.push(cell.id);
      }
    } else {
      // Find all cells in the same column, starting from this cell and going down
      let startRow = row;
      while (startRow > 0 && !cells.find(c => c.row === startRow - 1 && c.col === col && (crosswordData.find(d => d.row === c.row && d.col === c.col) as any)?.block)) {
        startRow--;
      }
      
      for (let r = startRow; r < 5; r++) {
        const cell = cells.find(d => d.row === r && d.col === col);
        const data = crosswordData.find(d => d.row === r && d.col === col) as any;
        if (data?.block) break;
        if (cell) wordCells.push(cell.id);
      }
    }
    
    return wordCells;
  };

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

  if (stage === 'purdue') {
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
        <div className="w-full relative z-10 flex items-center justify-center" style={{ height: '85vh' }}>
          <div className="flex flex-col items-center gap-8">
            <h1 className="text-5xl font-bold text-slate-900 font-[family-name:var(--font-playfair-display)]">
              Purdue Crossword Puzzle
            </h1>

            {/* Crossword Container */}
            <div className="flex gap-16 items-start w-full max-w-4xl">
              {/* Crossword Grid */}
              <div className="flex-shrink-0">
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
                            className={`w-16 h-16 border border-gray-300 flex items-center justify-center relative ${
                              isBlocked ? 'bg-gray-800' : 'bg-white'
                            }`}
                          >
                            {!isBlocked && (
                              <>
                                {cell?.clueNumber && (
                                  <span className="absolute top-1 left-1 text-sm font-bold text-gray-700">
                                    {cell.clueNumber}
                                  </span>
                                )}
                                <input
                                  type="text"
                                  maxLength={1}
                                  value={cell?.value || ''}
                                  onChange={(e) => cell && handleCellChange(cell.id, e.target.value, cell.row, cell.col)}
                                  onKeyDown={(e) => cell && handleCellKeyDown(e, cell.id, cell.row, cell.col)}
                                  onFocus={() => cell && setFocusedCell(cell.id)}
                                  className={`w-full h-full text-center font-bold text-lg text-black focus:outline-none focus:ring-2 focus:ring-pink-400 ${
                                    focusedCell && getWordCells(cells.find(c => c.id === focusedCell)?.row || 0, cells.find(c => c.id === focusedCell)?.col || 0, 'across').includes(cell?.id || '') ? 'bg-pink-300' : focusedCell === cell?.id ? 'bg-pink-100' : ''
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
              <div className="w-64">
                <div className="space-y-6">
                  {/* Across Clues */}
                  <div>
                    <h4 className="font-semibold text-base text-gray-800 mb-3 border-b-2 border-pink-300 pb-1">Across</h4>
                    <div className="space-y-2">
                      {clues.filter(c => c.type === 'across').map((clue) => (
                        <div key={`${clue.number}-${clue.type}`}>
                          <p className="text-sm text-gray-800">
                            <span className="font-semibold">{clue.number}.</span> {clue.text}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Down Clues */}
                  <div>
                    <h4 className="font-semibold text-base text-gray-800 mb-3 border-b-2 border-pink-300 pb-1">Down</h4>
                    <div className="space-y-2">
                      {clues.filter(c => c.type === 'down').map((clue) => (
                        <div key={`${clue.number}-${clue.type}`}>
                          <p className="text-sm text-gray-800">
                            <span className="font-semibold">{clue.number}.</span> {clue.text}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4 mt-4">
              <button
                onClick={() => {
                  // TODO: Add check answers logic
                  alert('Check answers functionality coming soon!');
                }}
                className="px-6 py-2 bg-green-400 text-white rounded-full hover:bg-green-500 transition-colors font-medium"
              >
                Check Squares
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-center py-32 px-16 bg-white dark:bg-black">
        <h1 className="text-4xl font-bold text-black dark:text-zinc-50">Puzzle</h1>
        <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">Welcome to the puzzle page</p>
      </main>
    </div>
  );
}
