// @ts-nocheck
"use client"
import gqlclient from "@/services/graph";
import gql from "graphql-tag";
import Link from "next/link";
import Editblogbtn from "./Editblogbtn";

const DELETE_BLOG = gql`
mutation DeleteBlog($id: String!){
  deleteblog(id: $id)
}`

export default function BlogCard({ blog }: any) {
  async function handleDelete() {
    try {
      const data = await gqlclient.request(DELETE_BLOG, {
        id: blog.id
      })
      if (data.deleteblog) {
        alert("Deleted");
      } else {
        alert("Failed");
      }
    } catch (err) {
      alert("Something went wrong");
    }
  }

  return (
    <div className="flex flex-col md:flex-row bg-white shadow-lg border border-gray-300 rounded-2xl overflow-hidden hover:scale-95 transition-transform duration-300">
      <div className="ml-2 border border-black w-full md:w-auto">
        <img
          src={blog.imageUrl}
          alt={blog.title}
          className="w-full md:w-90 h-48 object-cover"
        />
      </div>

      <div className="py-6 px-4 flex flex-col justify-between md:w-2/3">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <h2 className="text-xl font-bold text-gray-800">{blog.title}</h2>
          <div className="flex gap-2">
            <Editblogbtn blog={blog} />
            <button className="px-3 py-1 text-white" onClick={handleDelete}>
              🗑️
            </button>
          </div>
        </div>

        <p className="text-gray-600 text-sm line-clamp-3 mt-2">{blog.content}</p>

        <Link
          href={`/blog/${blog.id}`}
          className="mt-3 self-start px-2 py-1 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
        >
          Read More
        </Link>
      </div>
    </div>
  );
}
