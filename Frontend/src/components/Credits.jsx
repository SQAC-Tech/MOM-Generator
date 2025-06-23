import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import VanillaTilt from "vanilla-tilt";
import { Link } from "react-router-dom"

const teamMembers = [
  {
    name: "Priyanshu Vasudev",
    role: "Tech Lead overseeing and guiding the entire project",
    image: "",
    emoji: "🧠",
  },
  {
    name: "Akshaj Bansal",
    role: "Leading the team from front",
    image: "",
    emoji: "🧠",
  },
  {
    name: "Mahik Jain",
    role: "Backend Developer",
    image: "",
    emoji: "⚙️",
  },
  {
    name: "Manya Sharma",
    role: "Frontend Developer",
    image: "",
    emoji: "💻",
  },
  {
    name: "Tusharika Suman",
    role: "Frontend Developer",
    image: "",
    emoji: "🎨",
  },
  {
    name: "Aditya Chaudhary",
    role: "Frontend Developer",
    image: "",
    emoji: "🌈",
  },
];

// 🎯 Tilt Wrapper
const TiltCard = ({ children }) => {
  const tiltRef = React.useRef(null);

  useEffect(() => {
    VanillaTilt.init(tiltRef.current, {
      max: 15,
      speed: 400,
      glare: true,
      "max-glare": 0.3,
    });
  }, []);

  return (
    <div ref={tiltRef} className="rounded-2xl">
      {children}
    </div>
  );
};

const Credits = () => {
  const fallbackAvatar = "https://api.dicebear.com/7.x/thumbs/svg?seed=";

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-300 via-purple-300 to-indigo-400 p-6 overflow-hidden relative text-white font-[Poppins]">
      <div className="absolute top-2 left-1  z-20">
        <Link to="/dashboard">
          <button className="flex items-center gap-2 bg-purple-600 text-white px-3 py-1.5 sm:px-5 sm:py-2 rounded-lg shadow-md hover:bg-purple-700 transition-all text-sm sm:text-base">
            Dashboard
          </button>
        </Link>
      </div>
      <div className="absolute w-[40vw] h-[40vw] bg-purple-500 opacity-20 rounded-full top-[10%] left-[-10%] blur-3xl animate-pulse z-0" />
      <div className="absolute w-[30vw] h-[30vw] bg-indigo-500 opacity-20 rounded-full bottom-[10%] right-[-10%] blur-3xl animate-pulse z-0" />

      {/* Header */}
      <motion.h1
        className="text-5xl md:text-6xl font-extrabold text-center mb-12 z-10 relative bg-gradient-to-r from-indigo-500  via-pink-600 to-purple-700 text-transparent bg-clip-text animate-gradient"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 30 }}
        transition={{ duration: 0.8 }}
      >
        Meet the Team
      </motion.h1>
      <div className="flex flex-wrap justify-center gap-10 z-10 relative">
        {teamMembers.map((member, index) => (
          <motion.div
            key={member.name}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
          >
            <TiltCard>
              <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 p-6 w-72 transition-transform duration-300 hover:scale-105 relative overflow-hidden">
                <div className="absolute -top-6 -right-6 text-5xl opacity-50 animate-bounce">
                  {member.emoji}
                </div>

                <div className="flex justify-center">
                  <img
                    src={
                      member.image ||
                      `${fallbackAvatar}member.name.split(" ")[0]`
                    }
                    alt={member.name}
                    className="w-24 h-24 rounded-full border-4 border-white shadow-md hover:rotate-6 transition-transform bg-white"
                  />
                </div>
                <h2 className="text-2xl font-bold mt-4 text-center text-black drop-shadow-md">
                  {member.name}
                </h2>
                <p className="text-center text-black text-lg italic mt-2">
                  {member.role}
                </p>
              </div>
            </TiltCard>
          </motion.div>
        ))}
      </div>

      {/* Footer */}
      <footer className="text-center mt-16 opacity-80 z-10 relative">
        <p className="text-2xl ">Built by Team SQAC © 2025</p>
      </footer>
    </div>
  );
};

export default Credits;
