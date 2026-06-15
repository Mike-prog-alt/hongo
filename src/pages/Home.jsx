import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import SwiperCursor from "../components/CursorSwipper";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      
      {/* HERO */}
      <div className="h-screen">
        <SwiperCursor/>
  <Swiper className="w-full h-full  cursor-none" loop="true" >    
        <SwiperSlide className="bg-red-500 flex items-center justify-center text-white text-2xl">
            Slide 1
          </SwiperSlide>

          <SwiperSlide className="bg-blue-500 flex items-center justify-center text-white text-2xl">
            Slide 2
          </SwiperSlide>

          <SwiperSlide className="bg-green-500 flex items-center justify-center text-white text-2xl">
            Slide 3
          </SwiperSlide>
        </Swiper>
      </div>

      {/* CONTENT */}
      <div className="p-10">
        <h1>Content section</h1>
        <p>Scroll down to reach footer</p>
      </div>

    </div>
  );
}