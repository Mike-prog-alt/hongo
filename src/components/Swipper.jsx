import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

export default function Hero({ slides }) {
  const [animTick, setAnimTick] = useState(0);

  return (
    <Swiper
      modules={[Autoplay, Navigation]}
      loop={true}
      speed={1500}
      autoplay={{ delay: 5000, disableOnInteraction: false }}
      onSlideChange={() => setAnimTick((tick) => tick + 1)}
      className="h-screen w-full cursor-none"
    >
      {slides.map((s, i) => (
        <SwiperSlide key={i} className="relative h-screen w-full overflow-hidden">
          <img
            src={s.img}
            alt=""
            className="absolute inset-0 h-full w-full scale-110 object-cover"
          />

          <div
            key={animTick}
            className="slide-animation fade-in-up relative z-10 mx-auto flex h-full w-full max-w-[1710px] flex-col items-start justify-center px-[15px] text-left md:px-10 lg:px-[60px]"
          >
            <div className="overflow-hidden">
              <p className="mb-8 font-urbanist text-[10px] tracking-[0.6em] text-[#251f1d] md:text-xs">
                {s.tag}
              </p>
            </div>

            <div className="overflow-hidden">
              <h1 className="font-urbanist text-6xl leading-[0.9] text-[#251f1d] md:text-8xl">
                {s.title[0]}
              </h1>
            </div>

            <div className="overflow-hidden">
              <h1 className="font-urbanist text-6xl italic leading-[0.9] text-[#251f1d] md:text-8xl">
                {s.title[1]}
              </h1>
            </div>

            <div className="overflow-hidden">
              <p className="mt-8 max-w-sm font-urbanist text-sm uppercase leading-7 tracking-[0.15em] text-[#251f1d]">
                {s.sub}
              </p>
            </div>

            <div className="overflow-hidden">
              <a
                href="/collections"
                className="mt-12 inline-flex cursor-pointer items-center gap-3 border border-[#251f1d]/30 bg-[#251f1d] px-10 py-4 font-urbanist text-[10px] tracking-[0.4em] text-white transition hover:bg-black"
              >
                <span>Shop collections</span>
                <i className="feather-arrow-right text-[14px]" />
              </a>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
