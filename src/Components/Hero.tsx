"use client"
import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-gray-100">
      <div className="w-full mx-auto px-4 py-4 text-center lg:text-left lg:flex lg:items-center lg:justify-between flex-col lg:flex-row">
        <div className="w-full lg:w-1/2 space-y-6">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 leading-tight">
            Welcome to <span className="text-blue-600">Blogo</span>
          </h1>
          <p className="text-gray-600 text-sm">
            Share your thoughts, explore new ideas, and connect with passionate writers from around the world.  
            Discover stories that inspire, articles that inform, and opinions that spark meaningful conversations. 
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link href={"/login"}
              className="px-4 py-1 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition">
              Get Started
            </Link>
            <Link href={"#blogs"}
              className="px-4 py-1 rounded-xl bg-gray-200 text-gray-800 font-medium hover:bg-gray-300 transition">
              Explore Blogs
            </Link>
          </div>
        </div>

        <div className="mt-10 lg:mt-0 lg:ml-20 w-full lg:w-auto">
          <img
            src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=800"
            alt="Blogging Illustration"
            className="rounded-2xl shadow-lg mx-auto lg:mx-0"
          />
        </div>
      </div>
    </section>
  );
}
