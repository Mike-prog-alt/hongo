import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import logo from "../assets/logo.webp";
import { supabase } from "../../backend/supabase";
import { categoriesForGender } from "../utils/bagsCategory";

const shopSections = [
  { label: "Man", gender: "man", href: "/pages/shop?gender=man" },
  { label: "Women", gender: "women", href: "/pages/shop?gender=women" },
  { label: "Brand", gender: "brand", href: "/pages/shop?gender=brand" },
];

const shopMegaMenuClass =
  "pointer-events-none invisible absolute left-1/2 top-full z-[9] w-screen -translate-x-1/2 opacity-0 transition-all duration-300 group-hover:pointer-events-auto group-hover:visible group-hover:opacity-100";

const pagesLinks = [
  { label: "About us", href: "/pages/about-us" },
  { label: "Our services", href: "/pages/services" },
  { label: "Brands", href: "/pages/brands" },
  { label: "FAQs", href: "/pages/faqs" },
  { label: "Contact us", href: "/pages/contact-us" },
  { label: "404 Error", href: "/404" },
];

const quickSearch = [
  { label: "Women", href: "/pages/shop?gender=women" },
  { label: "Man", href: "/pages/shop?gender=man" },
  { label: "Brand", href: "/pages/shop?gender=brand" },
];

const navLinkClass =
  "relative inline-block align-middle py-[25px] text-[18px] font-semibold capitalize leading-5 text-[#262626] transition-colors after:relative after:bottom-[-3px] after:flex after:h-0.5 after:w-full after:origin-[100%_50%] after:scale-x-0 after:bg-[#262626] after:transition-transform after:duration-300 after:content-[''] hover:after:origin-[0%_50%] hover:after:scale-x-100";

function NavItem({ to, children }) {
  return (
    <li className="relative list-none">
      <Link to={to} className={`${navLinkClass} mx-4`}>
        {children}
      </Link>
    </li>
  );
}

export default function Header() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobilePagesOpen, setMobilePagesOpen] = useState(false);
  const [mobileShopOpen, setMobileShopOpen] = useState(false);
  const [mobileShopSection, setMobileShopSection] = useState(null);
  const [categories, setCategories] = useState([]);
  const [isVisible, setIsVisible] = useState(true);
  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    let lastY = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      setIsAtTop(y < 10);

      if (y < 10) {
        setIsVisible(true);
      } else if (y > lastY && y > 80) {
        setIsVisible(false);
      } else if (y < lastY) {
        setIsVisible(true);
      }

      lastY = y;
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setIsAtTop(window.scrollY < 10);
    setIsVisible(true);
  }, [location.pathname]);

  const isTransparent = isHome && isAtTop && isVisible;

  useEffect(() => {
    let cancelled = false;

    async function loadCategories() {
      const { data, error } = await supabase
        .from("bags_category")
        .select("id, category, gender")
        .order("gender")
        .order("category");

      if (!cancelled && !error) {
        setCategories(data ?? []);
      }
    }

    loadCategories();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      <header
        id="hongo-header"
        className={`fixed top-0 left-0 right-0 z-50 w-full overflow-visible font-[Jost,sans-serif] transition-transform duration-300 ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        } ${isTransparent ? "bg-transparent shadow-none" : "bg-white shadow-[0_2px_20px_rgba(0,0,0,0.06)]"}`}
      >
        <nav className="relative overflow-visible">
          <div className="mx-auto w-full max-w-[1710px] px-[15px]">
            <div className="relative flex items-center min-[1200px]:grid min-[1200px]:grid-cols-12">
              <div className="flex shrink-0 justify-start min-[1200px]:col-span-2">
                <Link to="/" className="inline-block py-[15px]">
                  <img src={logo} alt="Hongo" width={210} height={66} className="h-auto w-[105px]" />
                </Link>
              </div>

              <div className="flex flex-1 items-center min-[1200px]:col-span-5 min-[1200px]:flex-none">
                <button
                  type="button"
                  aria-label="Menu"
                  aria-expanded={mobileOpen}
                  onClick={() => setMobileOpen((v) => !v)}
                  className="relative mr-3 inline-flex h-[15px] w-[22px] min-[1200px]:hidden"
                >
                  <span className={`absolute left-0 block h-0.5 w-4 bg-[#262626] transition-all duration-[250ms] ${mobileOpen ? "top-[7px] w-0" : "top-0"}`} />
                  <span className={`absolute left-0 top-[6px] block h-0.5 w-5 bg-[#262626] transition-all duration-[250ms] ${mobileOpen ? "rotate-45" : ""}`} />
                  <span className={`absolute left-0 top-[6px] block h-0.5 w-5 bg-[#262626] transition-all duration-[250ms] ${mobileOpen ? "-rotate-45" : ""}`} />
                  <span className={`absolute left-0 block h-0.5 w-4 bg-[#262626] transition-all duration-[250ms] ${mobileOpen ? "top-[7px] w-0" : "top-3"}`} />
                </button>

                <button
                  type="button"
                  onClick={() => setSearchOpen(true)}
                  className="inline-flex items-center text-[#262626] min-[1200px]:hidden"
                >
                  <i className="feather-search text-[20px]" />
                </button>

                <span
                  aria-hidden
                  className="hidden h-5 w-px -translate-x-[25px] bg-[rgba(38,38,38,0.3)] min-[1200px]:inline-block"
                />

                <ul className="m-0 hidden list-none p-0 min-[1200px]:flex min-[1200px]:w-full min-[1200px]:items-center [&>li:first-child_a]:ml-0">
                  <li className="group static list-none min-[1200px]:static">
                    <Link to="/pages/shop" className={`${navLinkClass} mx-4`}>
                      Shop
                    </Link>
                    <div className={shopMegaMenuClass}>
                      <div className="border-t border-[#f0f0f0] bg-white py-10 shadow-[0_20px_50px_rgba(0,0,0,0.08)]">
                        <div className="mx-auto max-w-[1170px] px-[15px]">
                          <ul className="m-0 grid list-none grid-cols-1 gap-10 p-0 min-[1200px]:grid-cols-3 min-[1200px]:gap-8">
                            {shopSections.map((section) => {
                              const sectionCategories = categoriesForGender(
                                categories,
                                section.gender
                              );

                              return (
                                <li key={section.gender} className="list-none">
                                  <Link
                                    to={section.href}
                                    className="mb-4 block text-[18px] font-semibold capitalize leading-[30px] text-[#262626] transition-colors hover:text-[#808080]"
                                  >
                                    {section.label}
                                  </Link>
                                  <ul className="m-0 list-none p-0">
                                    {sectionCategories.map((cat) => (
                                      <li key={cat.id} className="list-none">
                                        <Link
                                          to={`/pages/shop?category=${cat.id}&gender=${section.gender}`}
                                          className="block py-1 text-[17px] leading-[30px] text-[#808080] transition-colors hover:text-[#262626]"
                                        >
                                          {cat.category}
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </li>
                  <NavItem to="/collections">Collections</NavItem>
                  <li className="group relative list-none">
                    <button type="button" className={`${navLinkClass} mx-4 bg-transparent`}>
                      Pages
                    </button>
                    <ul className="pointer-events-none invisible absolute left-0 top-full z-[9] min-w-[200px] w-max bg-white py-[25px] opacity-0 shadow-[0_0_35px_rgba(0,0,0,0.1)] transition-all duration-300 group-hover:pointer-events-auto group-hover:visible group-hover:opacity-100">
                      {pagesLinks.map((item) => (
                        <li key={item.label} className="list-none px-10">
                          <Link
                            to={item.href}
                            className="block text-[17px] leading-[30px] text-[#808080] hover:text-[#262626]"
                          >
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                  <NavItem to="/blogs/fashion">Blog</NavItem>
                </ul>
              </div>

              <div className="flex flex-1 justify-end min-[1200px]:col-span-5 min-[1200px]:flex-none min-[1200px]:items-center">
                <button
                  type="button"
                  onClick={() => setSearchOpen(true)}
                  className="hidden items-center text-[18px] font-semibold capitalize text-[#262626] min-[1200px]:flex"
                >
                  <i className="feather-search mr-[5px] text-[21px]" />
                  <span>Search</span>
                </button>
                <Link
                  to="/account"
                  className="flex items-center pl-[30px] text-[18px] font-semibold capitalize text-[#262626]"
                >
                  <i className="feather-user mr-[5px] text-[21px]" />
                  <span className="hidden min-[1200px]:inline">Account</span>
                </Link>
                <Link
                  to="/pages/wishlist"
                  className="flex items-center pl-[30px] text-[18px] font-semibold capitalize text-[#262626]"
                >
                  <i className="feather-heart mr-2.5 text-[21px]" />
                  <span className="hidden min-[1200px]:inline">Wishlist</span>
                </Link>
                <button
                  type="button"
                  className="flex items-center pl-[30px] text-[18px] font-semibold capitalize text-[#262626]"
                >
                  <i className="feather-shopping-bag mr-2.5 text-[21px] min-[1200px]:mr-[5px]" />
                  <span className="hidden min-[1200px]:inline">Cart</span>
                </button>
              </div>
            </div>
          </div>
        </nav>

        {mobileOpen && (
          <div className="fixed inset-0 top-[63px] z-40 overflow-y-auto bg-white min-[1200px]:hidden">
            <div className="flex items-center justify-between px-5 py-4">
              <span className="text-[18px] font-medium text-[#262626]">Menu</span>
              <button type="button" onClick={() => setMobileOpen(false)} aria-label="Close">
                <i className="feather-x text-[20px]" />
              </button>
            </div>
            <ul className="list-none px-5">
              <li className="border-t border-[#e4e4e4]">
                <button
                  type="button"
                  onClick={() => setMobileShopOpen((v) => !v)}
                  className="flex w-full items-center justify-between py-4 text-[18px] font-medium capitalize text-[#262626]"
                >
                  Shop
                  <i className={`feather-chevron-right text-[16px] transition-transform ${mobileShopOpen ? "rotate-90" : ""}`} />
                </button>
                {mobileShopOpen && (
                  <ul className="list-none pb-3 pl-4">
                    {shopSections.map((section) => {
                      const sectionCategories = categoriesForGender(categories, section.gender);
                      const isOpen = mobileShopSection === section.gender;

                      return (
                        <li key={section.label}>
                          {sectionCategories.length > 0 ? (
                            <>
                              <button
                                type="button"
                                onClick={() =>
                                  setMobileShopSection((current) =>
                                    current === section.gender ? null : section.gender
                                  )
                                }
                                className="flex w-full items-center justify-between py-2 text-[17px] text-[#808080]"
                              >
                                {section.label}
                                <i
                                  className={`feather-chevron-right text-[14px] transition-transform ${isOpen ? "rotate-90" : ""}`}
                                />
                              </button>
                              {isOpen && (
                                <ul className="list-none pb-2 pl-4">
                                  <li>
                                    <Link
                                      to={section.href}
                                      onClick={() => setMobileOpen(false)}
                                      className="block py-2 text-[16px] text-[#808080]"
                                    >
                                      All {section.label}
                                    </Link>
                                  </li>
                                  {sectionCategories.map((cat) => (
                                    <li key={cat.id}>
                                      <Link
                                        to={`/pages/shop?category=${cat.id}&gender=${section.gender}`}
                                        onClick={() => setMobileOpen(false)}
                                        className="block py-2 text-[16px] text-[#808080]"
                                      >
                                        {cat.category}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </>
                          ) : (
                            <Link
                              to={section.href}
                              onClick={() => setMobileOpen(false)}
                              className="block py-2 text-[17px] text-[#808080]"
                            >
                              {section.label}
                            </Link>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
              <li className="border-t border-[#e4e4e4]">
                <Link
                  to="/collections"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between py-4 text-[18px] font-medium capitalize text-[#262626]"
                >
                  Collections
                  <i className="feather-chevron-right text-[16px]" />
                </Link>
              </li>
              <li className="border-t border-[#e4e4e4]">
                <button
                  type="button"
                  onClick={() => setMobilePagesOpen((v) => !v)}
                  className="flex w-full items-center justify-between py-4 text-[18px] font-medium capitalize text-[#262626]"
                >
                  Pages
                  <i className={`feather-chevron-right text-[16px] transition-transform ${mobilePagesOpen ? "rotate-90" : ""}`} />
                </button>
                {mobilePagesOpen && (
                  <ul className="list-none pb-3 pl-4">
                    {pagesLinks.map((item) => (
                      <li key={item.label}>
                        <Link
                          to={item.href}
                          onClick={() => setMobileOpen(false)}
                          className="block py-2 text-[17px] text-[#808080]"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
              <li className="border-t border-[#e4e4e4]">
                <Link
                  to="/blogs/fashion"
                  onClick={() => setMobileOpen(false)}
                  className="block py-4 text-[18px] font-medium capitalize text-[#262626]"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>
        )}
      </header>

      {searchOpen && (
        <div className="fixed inset-0 z-[100] bg-white font-[Jost,sans-serif]">
          <button
            type="button"
            onClick={() => setSearchOpen(false)}
            className="absolute right-[15px] top-[15px]"
            aria-label="Close search"
          >
            <i className="feather-x text-[22px] text-[#262626]" />
          </button>
          <div className="flex min-h-screen flex-col items-center px-[15px] pt-[120px]">
            <div className="w-full max-w-[45%] min-w-[280px]">
              <h4 className="mb-8 text-center text-[38px] font-medium tracking-[-1px] text-[#262626]">
                What are you looking for?
              </h4>
              <form action="/search" className="relative w-full">
                <input
                  type="text"
                  name="q"
                  placeholder="I'm looking for…"
                  autoFocus
                  className="w-full rounded-[60px] border border-[#232323] py-[10px] pl-[30px] pr-[38px] text-[20px] text-[#262626] outline-none placeholder:text-[#262626]/50"
                />
                <button type="submit" className="absolute right-[15px] top-1/2 -translate-y-1/2">
                  <i className="feather-search text-[20px]" />
                </button>
              </form>
              <div className="mt-10 flex flex-wrap items-center justify-center">
                <span className="mr-2 text-[#262626]">Quick Search:</span>
                {quickSearch.map((item, i) => (
                  <Link
                    key={item.label}
                    to={item.href}
                    onClick={() => setSearchOpen(false)}
                    className="text-[#262626] hover:underline"
                  >
                    {item.label}
                    {i < quickSearch.length - 1 ? "," : ""}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
