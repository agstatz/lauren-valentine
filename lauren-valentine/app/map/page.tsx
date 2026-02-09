 'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';

export default function MapPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const dog = searchParams.get('dog');

  const dogLabel = dog === 'otis' ? 'Otis' : dog === 'benny' ? 'Benny' : dog === 'rosie' ? 'Rosie' : 'Your Companion';
  const dogIntro = {
    otis: 'With Otis the Puzzle Master by your side, every riddle feels solvable — he sniffs out patterns and hidden pathways.',
    benny: 'Benny, the loyal mountain-hearted companion, stands steady; his calm courage helps you press on through danger.',
    rosie: 'Rosie, the memory keeper, senses echoes from the past — she helps unlock memories that point to clues.',
  } as Record<string, string>;

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#C4EBC8] p-8">
      <div className="max-w-3xl w-full bg-white rounded-xl shadow-xl p-8">
        <h1 className="text-3xl font-bold mb-4">Your Adventure Map</h1>

        <p className="text-gray-700 mb-4">{dog && dogIntro[dog] ? dogIntro[dog] : `You chose ${dogLabel}.`}</p>

        <div className="mb-6">
          <h2 className="font-semibold text-lg mb-2">The Story</h2>
          <p className="text-gray-700">Ashton has been kidnapped. The only way to find him is to travel through five stages — each contains a puzzle that reveals a clue. Along the way you'll revisit meaningful memories that point to who took him and where he might be hiding. Your chosen companion will lend a unique perspective and help interpret those memories.</p>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <Link href="/stages/purdue" className="block p-4 bg-pink-100 rounded-lg">Stage 1: Purdue — clues in a lecture hall</Link>
          <Link href="/stages/st-louis" className="block p-4 bg-pink-100 rounded-lg">Stage 2: St. Louis — puzzle at the riverfront</Link>
          <Link href="/stages/chicago" className="block p-4 bg-pink-100 rounded-lg">Stage 3: Chicago — look through city memories</Link>
          <Link href="/stages/indy" className="block p-4 bg-pink-100 rounded-lg">Stage 4: Indy — race to uncover a hidden lead</Link>
          <Link href="/stages/finale" className="block p-4 bg-pink-100 rounded-lg">Stage 5: Finale — put the clues together</Link>
        </div>

        <div className="mt-6 flex gap-3">
          <button onClick={() => router.back()} className="px-4 py-2 bg-white rounded-full shadow">Back</button>
          <Link href="/" className="px-4 py-2 bg-pink-100 rounded-full">Home</Link>
        </div>
      </div>
    </main>
  );
}
