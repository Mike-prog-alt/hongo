import { useState } from "react";
import { Search, User, Heart, ShoppingCart } from "lucide-react";
import logo from "../assets/logo.webp";

const navLinks = [ "Shop", "Trending", "About", "Blog", "Contact"];

export default function Header() {
  const [activeDropdown, setActiveDropdown] = useState(null);

  return (
    <header className="w-full bg-[#FAF7F2] border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-4">
 <a href="#" className="flex items-center gap-2 font-bold text-xl text-gray-900 tracking-tight">
  <img src={logo} alt="Hongo logo" className="w-32 h-auto object-contain" />
</a>

          <div className="h-6 w-px bg-gray-300 mx-2" />

         <nav className="hidden md:flex items-center gap-1">
  {navLinks.map((link) => (
    <a
      key={link}
      href="#"
      className="px-3 py-2 text-sm text-gray-700 hover:text-gray-900 font-medium transition-colors duration-150 rounded hover:bg-gray-100"
    >
      {link}
    </a>
  ))}
</nav>
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-1">
          <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors">
            <Search className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors">
            <User className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors relative">
            <Heart className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors relative">
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
}