"use client"; // Since we’ll use Redux hooks
import { useState } from "react"; // Added useState for tab selection
import Link from "next/link";

export default function NavHeader() {

  const [activeTab, setActiveTab] = useState<"top" | "latest">("top");
  return (
    <nav className="bg-gradient-to-r from-gray-900 to-black text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left: Hamburger Menu for Mobile */}

          <div className="flex md:hidden">
            <button
              className="p-2 rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              onClick={() => {
                /* Add mobile menu toggle logic here */
              }}
            >
              <span className="sr-only">Open main menu</span>
              {/* Hamburger icon (you can use an SVG or icon library) */}
              <svg
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
            </button>
          </div>
          {/* Right: Title (xyznews) */}
          <div className="flex items-center">
            <Link
              href="/"
              className="text-2xl font-bold text-white hover:text-gray-200 transition-colors"
            >
              pugnanews
            </Link>
          </div>

        {/* Center: Top Stories & Latest Tabs */}
        <div className="hidden md:flex flex-1 justify-start ml-10 space-x-6">
            <Link
              href="/top-stories" // Example route, adjust as needed
              className={`px-4 py-2 rounded-md transition-colors duration-200 ${
                activeTab === "top"
                  ? "bg-white text-gray-900 font-semibold"
                  : "text-gray-300 hover:text-white hover:bg-gray-700"
              }`}
              onClick={(e) => {
                e.preventDefault(); // Prevent default link behavior
                setActiveTab("top");
              }}
            >
              Top Stories
            </Link>
            <Link
              href="/latest" // Example route, adjust as needed
              className={`px-4 py-2 rounded-md transition-colors duration-200 ${
                activeTab === "latest"
                  ? "bg-white text-gray-900 font-semibold"
                  : "text-gray-300 hover:text-white hover:bg-gray-700"
              }`}
              onClick={(e) => {
                e.preventDefault(); // Prevent default link behavior
                setActiveTab("latest");
              }}
            >
              Latest
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu (Hidden by Default) */}
      <div className="md:hidden">
      <Link
              href="/top-stories" // Example route, adjust as needed
              className={`px-4 py-2 rounded-md transition-colors duration-200 ${
                activeTab === "top"
                  ? "bg-white text-gray-900 font-semibold"
                  : "text-gray-300 hover:text-white hover:bg-gray-700"
              }`}
              onClick={(e) => {
                e.preventDefault(); // Prevent default link behavior
                setActiveTab("top");
              }}
            >
              Top Stories
            </Link>
            <Link
              href="/latest" // Example route, adjust as needed
              className={`px-4 py-2 rounded-md transition-colors duration-200 ${
                activeTab === "latest"
                  ? "bg-white text-gray-900 font-semibold"
                  : "text-gray-300 hover:text-white hover:bg-gray-700"
              }`}
              onClick={(e) => {
                e.preventDefault(); // Prevent default link behavior
                setActiveTab("latest");
              }}
            >
              Latest
            </Link>
      </div>
      
    </nav>
  );
}
