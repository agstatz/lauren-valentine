"use client";

import { useState, useRef, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

const PASSWORDS = [
  { answer: "BLUE", length: 4 },
  { answer: "EVANSTON", length: 8 },
  { answer: "IDOLWOLF", length: 8 },
  { answer: "SOBRO", length: 5 },
];

const DOG_IMAGES: { [key: string]: string } = {
  otis: "/otis_collie.png",
  benny: "/benny_bern.png",
  rosie: "/rosie_dachshund.png",
};

export default function Final() {
  const [inputs, setInputs] = useState<string[][]>(
    PASSWORDS.map((p) => Array(p.length).fill(""))
  );
  const [isCorrect, setIsCorrect] = useState(false);
  const [wrongPasswords, setWrongPasswords] = useState<number[]>([]);
  const [showTryAgain, setShowTryAgain] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[][][]>([]);
  const searchParams = useSearchParams();
  const [dogImage, setDogImage] = useState<string>("/otis_collie.png");

  // Initialize refs
  if (inputRefs.current.length === 0) {
    inputRefs.current = PASSWORDS.map((p) =>
      Array(p.length)
        .fill(null)
        .map(() => [])
    );
  }

  useEffect(() => {
    const dog = searchParams.get("dog");
    if (dog && DOG_IMAGES[dog]) {
      setDogImage(DOG_IMAGES[dog]);
    }
  }, [searchParams]);

  const handleInputChange = (
    passwordIndex: number,
    charIndex: number,
    value: string
  ) => {
    const upperValue = value.toUpperCase();
    if (upperValue.length <= 1 && /^[A-Z]*$/.test(upperValue)) {
      const newInputs = [...inputs];
      newInputs[passwordIndex][charIndex] = upperValue;
      setInputs(newInputs);

      // Auto-focus next input
      if (upperValue && charIndex < PASSWORDS[passwordIndex].length - 1) {
        inputRefs.current[passwordIndex][charIndex + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (
    passwordIndex: number,
    charIndex: number,
    e: React.KeyboardEvent
  ) => {
    if (e.key === "Backspace" && !inputs[passwordIndex][charIndex] && charIndex > 0) {
      inputRefs.current[passwordIndex][charIndex - 1]?.focus();
    }
  };

  const checkAnswers = () => {
    const wrongIndexes: number[] = [];
    const allCorrect = PASSWORDS.every((password, index) => {
      const userAnswer = inputs[index].join("");
      const isPasswordCorrect = userAnswer === password.answer;
      if (!isPasswordCorrect) {
        wrongIndexes.push(index);
      }
      return isPasswordCorrect;
    });
    
    if (allCorrect) {
      setIsCorrect(true);
      setWrongPasswords([]);
      setShowTryAgain(false);
    } else {
      setWrongPasswords(wrongIndexes);
      setShowTryAgain(true);
      
      // Clear wrong passwords
      const newInputs = [...inputs];
      wrongIndexes.forEach(index => {
        newInputs[index] = Array(PASSWORDS[index].length).fill("");
      });
      setInputs(newInputs);
      
      // Hide the message after 3 seconds
      setTimeout(() => setShowTryAgain(false), 3000);
    }
  };

  const dog = searchParams.get("dog");
  const dogLabel = dog === 'otis' ? 'Otis' : dog === 'benny' ? 'Benny' : dog === 'rosie' ? 'Rosie' : 'Your Companion';

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
      {dog && DOG_IMAGES[dog] && !isCorrect && (
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
                <Image src={DOG_IMAGES[dog]} alt={dogLabel} fill className="object-contain" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg text-slate-900 mb-2 font-[family-name:var(--font-playfair-display)]">
                  {dogLabel}
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed min-h-[80px]">
                  {showTryAgain ? 'Try again!' : 'Enter the passwords to free Ashton! You can do this!'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Content container */}
      <div className="max-w-5xl w-full relative z-10 flex flex-col items-center p-4">
        <h1 className="text-3xl font-bold mb-4 text-slate-900 font-[family-name:var(--font-playfair-display)] mt-4">
          Final Challenge
        </h1>

        {!isCorrect ? (
          <div className="space-y-4 w-full">
            {PASSWORDS.map((password, passwordIndex) => (
              <div key={passwordIndex} className="flex flex-col items-center gap-2">
                <h2 className="text-lg font-semibold text-slate-700">
                  Password {passwordIndex + 1}
                </h2>
                <div className="flex gap-1.5">
                  {Array(password.length)
                    .fill(0)
                    .map((_, charIndex) => (
                      <input
                        key={charIndex}
                        ref={(el) => {
                          if (inputRefs.current[passwordIndex]) {
                            inputRefs.current[passwordIndex][charIndex] = el;
                          }
                        }}
                        type="text"
                        maxLength={1}
                        value={inputs[passwordIndex][charIndex]}
                        onChange={(e) =>
                          handleInputChange(passwordIndex, charIndex, e.target.value)
                        }
                        onKeyDown={(e) => handleKeyDown(passwordIndex, charIndex, e)}
                        className={`w-11 h-11 text-center text-xl font-bold border-2 rounded-lg focus:outline-none bg-white text-slate-900 uppercase shadow-sm ${
                          wrongPasswords.includes(passwordIndex)
                            ? 'border-red-500 focus:border-red-600'
                            : 'border-slate-300 focus:border-pink-500'
                        }`}
                      />
                    ))}
                </div>
              </div>
            ))}

            <div className="flex justify-center mt-4">
              <button
                onClick={checkAnswers}
                className="px-6 py-2 bg-pink-400 hover:bg-pink-500 text-white text-base font-semibold rounded-full shadow-lg hover:shadow-xl transition-all"
              >
                Check Answers
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center space-y-4">
            <div className="flex justify-center gap-6 mb-4">
              <div className="relative w-32 h-32">
                <Image
                  src="/lauren-v1.png"
                  alt="Lauren"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="relative w-32 h-32">
                <Image
                  src={dogImage}
                  alt="Your companion"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
            <div className="text-2xl font-bold text-slate-900 font-[family-name:var(--font-playfair-display)]">
              Congratulations! You freed Ashton!
            </div>
            <div className="text-xl text-pink-600 font-semibold">
              Happy Valentine&apos;s Day! I love you! 💕
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
