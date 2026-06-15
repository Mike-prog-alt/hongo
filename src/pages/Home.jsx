import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import SwiperCursor from "../components/CursorSwipper";
import Marquee from "../components/Marquee";
import { useEffect } from "react";
const slides = [
  {
    img: "https://hongotheme.myshopify.com/cdn/shop/files/demo-leather-slider-01.jpg?v=1678447214&width=3840",
    tag: "New Collection",
    title: ["Heritage", "Handbag"],
    sub: "Timeless design crafted for modern elegance.",
  },
  {
    img: "https://hongotheme.myshopify.com/cdn/shop/files/demo-leather-slider-02.jpg?v=1678447214&width=3840",
    tag: "Exclusive",
    title: ["Minimal", "Luxury"],
    sub: "Every stitch a statement of refined craft.",
  },
  {
    img: "https://hongotheme.myshopify.com/cdn/shop/files/demo-leather-slider-03.jpg?v=1678447215&width=3840",
    tag: "Artisan Made",
    title: ["Crafted", "Quality"],
    sub: "Heritage leather. Contemporary silhouette.",
  },
];

const products = [
  {
    img: "https://hongotheme.myshopify.com/cdn/shop/files/demo-leather-shop-01.jpg?v=1678447215&width=800",
    name: "Tote Bag",
    price: "$189.00",
  },
  {
    img: "https://hongotheme.myshopify.com/cdn/shop/files/demo-leather-shop-02.jpg?v=1678447215&width=800",
    name: "Shoulder Bag",
    price: "$229.00",
  },
  {
    img: "https://hongotheme.myshopify.com/cdn/shop/files/demo-leather-shop-03.jpg?v=1678447215&width=800",
    name: "Clutch Bag",
    price: "$149.00",
  },
  {
    img: "https://hongotheme.myshopify.com/cdn/shop/files/demo-leather-shop-04.jpg?v=1678447215&width=800",
    name: "Mini Bag",
    price: "$169.00",
  },
];

export default function Home() {
  useEffect(() => {

    const originalTitle = "Hongo";

    let interval;

    const handleVisibilityChange = () => {

      if (document.hidden) {

        interval = setInterval(() => {

          document.title =

            document.title === "🔥 Hury!"

              ? "👀 Come back"

              : "🔥 Hury!";

        }, 1000);

      } else {

        clearInterval(interval);

        document.title = originalTitle;

      }

    };

    document.addEventListener(

      "visibilitychange",

      handleVisibilityChange

    );

    return () => {

      clearInterval(interval);

      document.removeEventListener(

        "visibilitychange",

        handleVisibilityChange

      );

    };

  }, []);
  return (
    <div className="flex flex-col min-h-screen bg-[#faf9f7] font-[Cormorant_Garamond,serif]">

   
    

      {/* ── HERO SWIPER ── */}
      <div className="h-screen relative">
        <SwiperCursor />

        <Swiper
          className="w-full h-screen cursor-none"
          modules={[Autoplay, Navigation]}
          loop={true}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          speed={1000}
        >
          {slides.map((s, i) => (
            <SwiperSlide key={i} className="relative w-full h-screen overflow-hidden bg-[#1c1c1c]">
              <img
                className="absolute inset-0 w-full h-full object-cover scale-110 transition-transform duration-[8000ms] ease-out"
                src={s.img}
                alt={s.title.join(" ")}
              />
              <div className="absolute inset-0 bg-black/35" />

              <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-6">
                <p className="tracking-[0.5em] text-[10px] md:text-xs opacity-60 mb-6 uppercase">
                  {s.tag}
                </p>

                <h1 className="text-6xl md:text-8xl font-light tracking-wide uppercase leading-none">
                  {s.title[0]} <br />
                  <span className="italic">{s.title[1]}</span>
                </h1>

                <div className="mt-6 w-px h-10 bg-white/30 mx-auto" />

                <p className="mt-6 text-sm opacity-60 max-w-xs mx-auto tracking-wide leading-relaxed">
                  {s.sub}
                </p>

                <a
                  href="#"
                  className="mt-10 inline-block border border-white/30 px-10 py-3 text-[10px] tracking-[0.4em] uppercase hover:bg-white hover:text-black transition-all duration-300"
                >
                  Discover
                </a>
              </div>

              {/* slide number */}
              <span className="absolute bottom-8 right-10 text-white/30 text-xs tracking-widest z-10">
                0{i + 1} / 0{slides.length}
              </span>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* ── INTRO TEXT ── */}
      <section className="py-24 px-6 text-center">
        <p className="text-xs tracking-[0.4em] uppercase text-[#af6f3d] mb-4">Our Story</p>
        <h2 className="text-4xl md:text-5xl font-light text-[#1a0a02] leading-snug max-w-2xl mx-auto">
          Where tradition meets <br />
          <span className="italic">contemporary luxury</span>
        </h2>
        <div className="mt-6 w-12 h-px bg-[#af6f3d] mx-auto" />
        <p className="mt-8 text-sm text-[#6b5a4e] max-w-md mx-auto leading-relaxed tracking-wide">
          Each piece in our collection is handcrafted by master artisans using
          full-grain leather sourced from the finest tanneries in Europe.
        </p>
      </section>

   

      {/* ── FULL-WIDTH BANNER ── */}
      <section className="relative h-[60vh] overflow-hidden">
        <img
          src="https://hongotheme.myshopify.com/cdn/shop/files/demo-leather-slider-02.jpg?v=1678447214&width=3840"
          alt="banner"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/45" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white">
          <p className="text-xs tracking-[0.5em] uppercase opacity-60 mb-4">Limited Edition</p>
          <h2 className="text-5xl md:text-7xl font-light uppercase tracking-widest">
            The <span className="italic">Icons</span>
          </h2>
          <a href="#" className="mt-8 border border-white/40 px-10 py-3 text-[10px] tracking-[0.4em] uppercase hover:bg-white hover:text-black transition-all duration-300">
            Shop Now
          </a>
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <Marquee />

    </div>
  );
}