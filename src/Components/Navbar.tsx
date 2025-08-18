"use client"

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [query, setQuery] = useState("");

  return (
    <nav className="bg-white shadow-md">
      <div>
        <div className="flex flex-col md:flex-row md:items-center mx-4 h-auto md:h-16 gap-3 md:gap-0 py-3 md:py-0">
          <div className="flex flex-shrink-0 justify-center md:justify-start">
            <img
              className="h-10 w-10 rounded-full"
              src="https://img.icons8.com/color/96/blogger.png"
              alt="Logo"
            />
            <p className="text-xl pt-1 pl-1 font-bold">Blogo</p>
          </div>

          <div className="w-full md:flex-1 md:flex md:justify-center px-0 md:px-4">
            <div className="flex w-full md:w-[60%]">
              <input
                type="text"
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search blogs..."
                className="w-full rounded-l-xl border px-2 focus:outline-none focus:ring focus:ring-blue-300"
              />
              <Link
                href={"/search?q=" + query}
                className="px-4 py-1 bg-blue-500 text-white rounded-r-xl hover:bg-blue-600"
              >
                Search
              </Link>
            </div>
          </div>

          <div className="flex flex-wrap justify-center md:justify-end gap-2 md:space-x-3">
            <Link
              href={"/add-blog"}
              className="px-3 py-1 rounded-xl text-sm bg-green-500 text-white hover:bg-green-600"
            >
              Add Blog
            </Link>
            <Link
              href={"/login"}
              className="px-3 py-1 rounded-xl text-sm bg-blue-500 text-white hover:bg-blue-600"
            >
              Login
            </Link>
            <Link
              href={"/Signup"}
              className="px-3 py-1 rounded-xl text-sm bg-gray-800 text-white hover:bg-gray-900"
            >
              Signup
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
