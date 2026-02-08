// Valentine Final Emotional Polish
// Changes requested:
// - Use exact text: "I knew it" & "My heart is yours forever"
// - Softer, more emotional post-Yes animation (less jumpy)
// - Better typography hierarchy (smaller, elegant text)
// - Overall cinematic calm

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FloatingElements = React.memo(
  ({ night }: { night: boolean }) => {
    const isMobile = window.innerWidth < 768;

    return (
      <>
        {[...Array(isMobile ? 20 : 36)].map((_, i) => {
          const emojis = ["🥰", "🤍", "🌸"];
          const randomEmoji = emojis[i % emojis.length];

          return (
            <motion.div
              key={i}
              className={`pointer-events-none absolute ${night ? "text-white/30" : "text-white/60"
                }`}
              style={{
                fontSize: i % 2 === 0 ? "1.4rem" : "1.1rem",
                left: `${Math.random() * 100}%`,
              }}
              initial={{ y: "110vh", opacity: 0 }}
              animate={{ y: "-10vh", opacity: [0, 1, 1, 0] }}
              transition={{
                duration: 8 + Math.random() * 4,
                delay: Math.random() * 6,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {randomEmoji}
            </motion.div>
          );
        })}
      </>
    );
  }
);


const App: React.FC = () => {
  const [yes, setYes] = useState(false);
  const [night, setNight] = useState(false);
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });

  const escape = () => {
    setNoPos({ x: Math.random() * 200 - 100, y: Math.random() * 120 - 60 });
  };

  return (
    <div
      className={`relative min-h-screen overflow-hidden flex items-center justify-center px-4 transition-colors duration-1000 ${night
        ? "bg-gradient-to-br from-[#0f1023] via-[#1a1b3a] to-[#2a1f3d]"
        : "bg-gradient-to-br from-pink-200 via-pink-100 to-white"
        }`}
    >
      <FloatingElements night={night} />

      <button
        onClick={() => setNight(!night)}
        className="absolute top-6 right-6 z-20 bg-white/70 backdrop-blur-md px-4 py-2 rounded-full text-xs sm:text-sm font-semibold shadow-lg"
      >
        {night ? "☀️ Day" : "🌙 Night"}
      </button>

      <AnimatePresence mode="wait">
        {!yes ? (
          <motion.div
            key="question"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 1.1 }}
            className="z-10 w-full max-w-md sm:max-w-lg bg-white/70 backdrop-blur-xl rounded-[2.5rem] p-8 sm:p-12 text-center shadow-2xl"
          >
            <motion.h1
              animate={{ y: [0, -4, 0] }}
              transition={{ repeat: Infinity, duration: 2.5 }}
              className="text-2xl sm:text-3xl font-semibold text-gray-800"
            >
              Will you be my Valentine? 🥰
            </motion.h1>

            <div className="mt-10 flex flex-col sm:flex-row gap-6 sm:gap-10 justify-center items-center">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setYes(true)}
                className="w-full sm:w-auto px-8 py-3 rounded-full bg-gradient-to-r from-pink-400 to-fuchsia-400 text-white hover:from-pink-500 hover:to-fuchsia-500 text-lg font-medium shadow-xl"
              >
                Yes 🥰
              </motion.button>

              <motion.button
                pointerEvents="none"
                onMouseEnter={escape}
                animate={{ x: noPos.x, y: noPos.y }}
                transition={{ type: "spring", stiffness: 150 }}
                className="w-full sm:w-auto px-8 py-3 rounded-full bg-gray-200 text-gray-400 text-lg font-medium opacity-50 cursor-not-allowed"
              >
                No 🙃
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
            className="z-10 w-full max-w-md sm:max-w-lg bg-white/70 backdrop-blur-xl rounded-[2.5rem] p-10 sm:p-14 text-center shadow-2xl"
          >
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2 }}
              className="text-2xl sm:text-3xl font-semibold text-gray-800"
            >
              I knew it 🥰
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 1.2 }}
              className="mt-4 text-base sm:text-lg text-gray-700"
            >
              My heart is yours forever 🤍
            </motion.p>

            <motion.div
              className="text-5xl sm:text-6xl mt-8"
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ repeat: Infinity, duration: 3 }}
            >
              🤍🥰🤍
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
