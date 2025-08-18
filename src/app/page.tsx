//@ts-nocheck
import Image from "next/image";
import { gql } from "graphql-request";
import gqlclient from "@/services/graph";
import Link from "next/link";
import Hero from "@/Components/Hero";
import BlogCard from "@/Components/BlogCard";

const Get_Blogs = gql`
query Blogs {
 blogs{
  content
  title
  id
  imageUrl
 }
}`

export default async function Home() {

  const data = await gqlclient.request(Get_Blogs);
  const blogs = data.blogs;
  return (
    <div>
      <main className=" flex flex-col  gap-8 mx-5   sm:items-start">
        <Hero/>
         <section id="blogs" className="scroll-mt-24 w-full ">
        <h2 className="text-2xl font-bold mb-4">Latest Blogs</h2>
        {
          blogs.map((blog) => {
            return (
              <div key={blog.id}>
                <BlogCard blog={blog} />
              </div>


            )
          })
        }
        </section>
      </main>
    </div>
  );
}
