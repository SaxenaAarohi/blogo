//@ts-nocheck
import gqlclient from "@/services/graph";
import gql from "graphql-tag";

const GET_BLOG = gql`
query Blogs($blogid: String) {
blog(id: $blogid){
content
title
id
imageUrl
}
}`

export default async function Page({params} : {
 params :Promise<{
    id : string
 }>
}) { 

    const p = await params ;
    const id = p.id;

    const data = await gqlclient .request(GET_BLOG , {
        blogid : id
    });
    const blog = data.blog;
    return (
         <div className="min-h-screen bg-gray-50">
     
<div className="w-full h-80 md:h-[400px] lg:h-[500px] overflow-hidden flex justify-center items-center">
  <img
    src={blog?.imageUrl}
    alt={blog.title}
    className="w-[60%] h-full object-cover"
  />
</div>

    

      <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
        <h1 className="text-4xl font-bold text-gray-800">{blog.title}</h1>
        
        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
          {blog.content}
        </p>
      </div>
    </div>
    )
}
   