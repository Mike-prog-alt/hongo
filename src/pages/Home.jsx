import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export default function Home() {
  return (
    <div className="w-full h-[300px]">
      <Swiper className="w-full h-full">
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
  );
}