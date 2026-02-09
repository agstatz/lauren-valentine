import Link from 'next/link';

export default function Page() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#C4EBC8]">
      <div className="max-w-lg p-8 bg-white rounded-lg shadow-xl text-center">
        <h1 className="text-3xl font-bold mb-4">Stage: St. Louis</h1>
        <p className="text-gray-700 mb-6">Stop by the Gateway to the West.</p>
        <Link href="/" className="inline-block px-4 py-2 bg-pink-100 rounded-full">
          Back to Map
        </Link>
      </div>
    </main>
  );
}
