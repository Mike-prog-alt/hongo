import Header from "./components/Header";
import Footer from "./components/Footer";

import { Routes, Route } from "react-router";
import Home from "./assets/pages/Home";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}