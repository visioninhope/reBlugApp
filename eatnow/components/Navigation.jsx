"use client";
import { useState, useRef, useEffect } from "react";
import Banner from "./Banner";

// Profile Dropdown
const ProfileDropDown = ({ className }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const profileRef = useRef();

  const navigation = [
    { title: "Bloggers", path: "/bloggers" },
    { title: "Brands", path: "/brands" },
    { title: "Blogs", path: "/blog-posts" },
    { title: "Chefs", path: "/chefs" },
    { title: "Restaurants", path: "/restaurants" },
    { title: "Contact", path: "/contact" },
  ];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className={`relative ${className}`}>
      {isLoggedIn ? (
        <div className="flex items-center space-x-4">
          <button
            ref={profileRef}
            className="w-10 h-10 outline-none rounded-full ring-offset-2 ring-gray-200 ring-2 lg:focus:ring-indigo-600"
            onClick={() => setIsDropdownOpen((prev) => !prev)}
          >
            <img
              src="https://randomuser.me/api/portraits/men/46.jpg"
              alt="Profile"
              className="w-full h-full rounded-full"
            />
          </button>
          <div className="lg:hidden">
            <span className="block">Micheal John</span>
            <span className="block text-sm text-gray-500">john@gmail.com</span>
          </div>
        </div>
      ) : (
        <div className="text-sm">Login</div>
      )}
      {isLoggedIn && (
        <ul
          className={`bg-white z-10 top-12 right-0 mt-5 space-y-5 lg:absolute lg:border lg:rounded-md lg:text-sm lg:w-52 lg:shadow-md lg:space-y-0 lg:mt-0 ${isDropdownOpen ? "" : "lg:hidden"}`}
        >
          {navigation.map((item, idx) => (
            <li key={idx}>
              <a
                className="block text-gray-600 lg:hover:bg-gray-50 lg:p-2.5"
                href={item.path}
              >
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const Navigation = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navigationItems = [
    { title: "Bloggers", path: "/bloggers" },
    { title: "Brands", path: "/brands" },
    { title: "Blogs", path: "/blog-posts" },
    { title: "Chefs", path: "/chef-faq" },
    { title: "Restaurants", path: "/restaurants" },
    { title: "Contact", path: "/contact" },
  ];

  return (
    <>
      <nav className="bg-white border-b top-0 z-[999] sticky shadow">
        <div className="flex items-center space-x-8 py-3 px-4 max-w-screen-xl mx-auto md:px-8">
          <div className="flex-none lg:flex-initial">
            <a href="/">
              <img
                src="/images/reblogo.png"
                width={70}
                height={20}
                alt="ReBlug Logo"
              />
            </a>
          </div>
          <div className="flex-1 flex items-center justify-between">
            <div
              className={`bg-white absolute z-20 w-full top-16 left-0 p-4 border-b lg:static lg:block lg:border-none ${menuOpen ? "" : "hidden"}`}
            >
              <ul className="mt-12 space-y-5 lg:flex lg:space-x-6 lg:space-y-0 lg:mt-0">
                {navigationItems.map((item, idx) => (
                  <li key={idx} className="text-gray-600 hover:text-gray-900">
                    <a href={item.path}>{item.title}</a>
                  </li>
                ))}
              </ul>
              <ProfileDropDown className="mt-5 pt-5 border-t lg:hidden" />
            </div>
            <div className="flex-1 flex items-center justify-end space-x-2 sm:space-x-6">
              <form className="flex items-center space-x-2 border rounded-md p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 flex-none text-gray-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  className="w-full outline-none appearance-none placeholder-gray-500 text-gray-500 sm:w-auto"
                  type="text"
                  placeholder="Search dishes"
                />
              </form>
              <ProfileDropDown className="hidden lg:block" />
              <button
                className="outline-none text-gray-400 block lg:hidden"
                onClick={() => setMenuOpen((prev) => !prev)}
              >
                {menuOpen ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16m-7 6h7"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>
      <div>
        <Banner />
      </div>
    </>
  );
};

export default Navigation;
