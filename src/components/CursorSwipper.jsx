import { useEffect, useState } from "react";

export default function SwiperCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState(false);

  useEffect(() => {
    const swiper = document.querySelector(".swiper");

    const move = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    const enter = () => setActive(true);
    const leave = () => setActive(false);

    window.addEventListener("mousemove", move);
    swiper?.addEventListener("mouseenter", enter);
    swiper?.addEventListener("mouseleave", leave);

    return () => {
      window.removeEventListener("mousemove", move);
      swiper?.removeEventListener("mouseenter", enter);
      swiper?.removeEventListener("mouseleave", leave);
    };
  }, []);

  if (!active) return null;

  return (
   <div
  className="fixed top-0 left-0 pointer-events-none z-[9999]
             w-[72px] h-[72px] rounded-full
             bg-[#1c1c1c]/90 backdrop-blur-md
             border border-white/20
             flex items-center justify-center
             shadow-[0_10px_30px_rgba(0,0,0,0.25)] "
  style={{
    transform: `translate3d(${pos.x - 36}px, ${pos.y - 36}px, 0)`,
  }}
>
  <div className="flex items-center gap-1 text-white text-[14px] font-light tracking-widest">
    <span className="opacity-80">&lt;</span>
    <span className="w-[6px]" />
    <span className="opacity-80">&gt;</span>
  </div>
</div>
  );
}