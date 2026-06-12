import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export default function Home() {
  return (
    <Swiper style={{ height: "300px", background: "#eee" }}>
  <SwiperSlide style={{ background: "red" }}>Slide 1</SwiperSlide>
  <SwiperSlide style={{ background: "blue" }}>Slide 2</SwiperSlide>
  <SwiperSlide style={{ background: "green" }}>Slide 3</SwiperSlide>
</Swiper>
  );
}