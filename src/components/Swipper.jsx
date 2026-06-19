import { useState } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

const item = {
  hidden: { y: 140, opacity: 0 },
  show: (delay = 0) => ({
    y: 0,
    opacity: 1,
    transition: {
      duration: 1.8,
      delay,
      ease: [0.25, 1, 0.5, 1],
    },
  }),
};

export default function Hero({ slides }) {
  const [active, setActive] = useState(0);

  return (
    <Swiper
      modules={[Autoplay, Navigation]}
      loop={true}
      speed={1000}
      autoplay={{ delay: 5000, disableOnInteraction: false }}
      onSlideChange={(swiper) => setActive(swiper.realIndex)}
      className="w-full h-screen"
    >
      {slides.map((s, i) => (
        <SwiperSlide key={i} className="relative w-full h-screen overflow-hidden">

          {/* BACKGROUND */}
          <img
            src={s.img}
            className="absolute inset-0 w-full h-full object-cover scale-110"
          />
          <div className="absolute inset-0 bg-black/40" />

          {/* TEXT (no gap, replays animation each slide) */}
          <motion.div
            key={active}
            className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-6 overflow-hidden"
          >

            <motion.p
              custom={0}
              variants={item}
              initial="hidden"
              animate="show"
              className="tracking-[0.6em] text-[10px] md:text-xs text-white/60 mb-8 uppercase"
            >
              {s.tag}
            </motion.p>

            <motion.h1
              custom={0.25}
              variants={item}
              initial="hidden"
              animate="show"
              className="text-6xl md:text-8xl font-light uppercase leading-[0.9]"
            >
              {s.title[0]}
            </motion.h1>

            <motion.h1
              custom={0.5}
              variants={item}
              initial="hidden"
              animate="show"
              className="text-6xl md:text-8xl font-light italic leading-[0.9]"
            >
              {s.title[1]}
            </motion.h1>

            <motion.div
              custom={0.8}
              variants={item}
              initial="hidden"
              animate="show"
              className="mt-8 w-px h-12 bg-white/20"
            />

            <motion.p
              custom={1.1}
              variants={item}
              initial="hidden"
              animate="show"
              className="mt-8 text-sm text-white/60 max-w-sm tracking-[0.15em] leading-7 uppercase"
            >
              {s.sub}
            </motion.p>

            <motion.a
              custom={1.4}
              variants={item}
              initial="hidden"
              animate="show"
              className="mt-12 border border-white/30 px-10 py-4 text-[10px] tracking-[0.4em] uppercase hover:bg-white hover:text-black transition"
            >
              Discover
            </motion.a>

          </motion.div>

        </SwiperSlide>
      ))}
    </Swiper>
  );
}