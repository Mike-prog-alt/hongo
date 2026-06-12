import { useState } from "react";

const categories = ["Corporate bags", "Clutches & pouches", "Crossbody bags", "Leather bags", "Heritage collections"];
const information = ["About us", "Our services", "Latest news", "Best sellers", "Contact us"];
const quickLinks = ["My account", "Register", "Wishlist", "Shipping info", "Privacy policy"];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [agreed, setAgreed] = useState(false);

  const handleSubscribe = () => {
    if (!agreed) return alert("Please agree to the terms & conditions.");
    if (!email) return alert("Please enter your email.");
    alert(`Subscribed with ${email}`);
  };

  return (
    <footer className="bg-[#1C1A18] text-white ">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-4 gap-10 border-b border-white/10">
        
        {/* Categories */}
        <div>
          <h3 className="font-semibold text-white mb-4">Categories</h3>
          <ul className="space-y-2">
            {categories.map((item) => (
              <li key={item}>
                <a href="#" className="text-white/60 hover:text-white text-sm transition-colors">{item}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Information */}
        <div>
          <h3 className="font-semibold text-white mb-4">Information</h3>
          <ul className="space-y-2">
            {information.map((item) => (
              <li key={item}>
                <a href="#" className="text-white/60 hover:text-white text-sm transition-colors">{item}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold text-white mb-4">Quick links</h3>
          <ul className="space-y-2">
            {quickLinks.map((item) => (
              <li key={item}>
                <a href="#" className="text-white/60 hover:text-white text-sm transition-colors">{item}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="font-semibold text-white text-xl leading-snug mb-5">
            Sign up for our newsletter to receive special offers.
          </h3>
          <div className="flex items-center border border-white/30 rounded-sm overflow-hidden mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 bg-transparent text-sm text-white placeholder-white/40 px-3 py-2 outline-none"
            />
            <button
              onClick={handleSubscribe}
              className="px-3 py-2 text-white/60 hover:text-white transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </button>
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="w-4 h-4 accent-white"
            />
            <span className="text-sm text-white/60">I agree with the terms & conditions</span>
          </label>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/50">
        
        {/* Copyright */}
        <p>
          © Copyright 2026 Hongo is proudly powered by{" "}
          <a href="#" className="text-white underline underline-offset-2 hover:text-white/80">ThemeZaa</a>
        </p>

        {/* Payment Icons */}
        <div className="flex items-center gap-4 text-white font-semibold text-sm">
          <span>G Pay</span>
          <span>PayPal</span>
          <span> Pay</span>
          <span>VISA</span>
          <span>Skrill</span>
        </div>

        {/* Policies */}
        <div className="flex items-center gap-4">
          <a href="#" className="hover:text-white transition-colors">Return policy</a>
          <a href="#" className="hover:text-white transition-colors">Privacy policy</a>
          <a href="#" className="hover:text-white transition-colors">Payment policy</a>
        </div>
      </div>
    </footer>
  );
}