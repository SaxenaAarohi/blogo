"use client"
import { FormEvent, useState } from "react";
import gql from "graphql-tag";
import { Blog } from "../../../generated/prisma";
import gqlclient from "@/services/graph";

const CREATE_BLOG = gql`
  mutation Mutation($title: String, $content: String, $imageUrl: String) {
    createblog(title: $title, content: $content, imageUrl: $imageUrl) {
      id
      imageUrl
      content
      title
    }
  }
`

export default function addBlog() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImgurl] = useState("");

  async function handlesubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const blogData: { createblog: Blog } = await gqlclient.request(CREATE_BLOG, {
        title,
        content,
        imageUrl: imageUrl ? imageUrl : null
      })
      if (blogData?.createblog) {
        alert("Created");
      } else {
        alert("Failed");
      }
    } catch (err: any) {
      console.log(err.message);
    }
  }

  return (
    <div className="flex justify-center  min-h-screen bg-gray-100 p-4">
      <form
        onSubmit={handlesubmit}
        className="w-full md:w-[60%] lg:w-[35%] h-[80%] bg-white shadow-md rounded-2xl p-5 space-y-2"
      >
        <h2 className="text-lg font-semibold text-center">Add New Blog</h2>

        <div>
          <label className="text-gray-700 mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded-xl p-1 focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Enter blog title"
            required
          />
        </div>

        <div>
          <label className="text-gray-700 mb-1">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full border rounded-xl p-1 focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Write your blog content..."
            required
          />
        </div>

        <div>
          <label className="text-gray-700 mb-1">Image URL</label>
          <input
            type="url"
            value={imageUrl}
            onChange={(e) => setImgurl(e.target.value)}
            className="w-full border rounded-xl p-1 focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        <input
          type="submit"
          value="Submit Blog"
          className="w-full bg-blue-500 text-white py-1 rounded-xl cursor-pointer hover:bg-blue-600 transition"
        />
      </form>
    </div>
  )
}
