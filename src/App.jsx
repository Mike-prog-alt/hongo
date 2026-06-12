import Header from "./components/Header";
import Footer from "./components/Footer";
import { Route } from "lucide-react";
import Home from "./assets/pages/Home";
export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <Header />

      {/* Content */}
      <main className="flex-1 min-h-screen">
        <Routes>
          <Route path="/" element={<Home/>} />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}