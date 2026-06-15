import Header from "./components/Header";
import Footer from "./components/Footer";
import { useEffect } from "react";
import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import Refund from "./pages/RefundPolicy";
import Privacy from "./pages/PrivacyPolicy";
import Shop from "./pages/Shop";
import Payment from "./pages/Paymentpolicy";

export default function App() {
  // useEffect(() => {

  //   const originalTitle = "Hongo Shopify theme - modern, multipurpose and feature-rich";

  //   let interval = null;

  //   const handleVisibilityChange = () => {

  //     if (document.hidden) {

  //       let showComeBack = true;

  //       interval = setInterval(() => {

  //         document.title = showComeBack

  //           ? "👋 Come Back!"

  //           : originalTitle;

  //         showComeBack = !showComeBack;

  //       }, 1000);

  //     } else {

  //       clearInterval(interval);

  //       document.title = originalTitle;

  //     }

  //   };

  //   document.addEventListener(

  //     "visibilitychange",

  //     handleVisibilityChange

  //   );
  //    return () => {

  //     clearInterval(interval);

  //     document.removeEventListener(

  //       "visibilitychange",

  //       handleVisibilityChange

  //     );

  //   };

  // }, []);
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pages/refund-policy" element={<Refund />} />
          <Route path="/pages/privacy-policy" element={<Privacy />} />
          <Route path="/pages/shop" element={<Shop/>}/>
          <Route path="/pages/payment-policy" element={<Payment/>}/>



        </Routes>
      </main>

      <Footer />
    </div>
  );
}