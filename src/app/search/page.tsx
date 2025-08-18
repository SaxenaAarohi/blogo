import gqlclient from "@/services/graph";
import { gql } from "graphql-request"
import { Blog } from "../../../generated/prisma";
import BlogCard from "@/Components/BlogCard";

const SEARCH_QUERY = gql`
query Blogs($q: String) {
   blogs(q: $q) {
    title
    content
    id
    imageUrl

    }
}`

export default async function Page({
    searchParams
}: {
    searchParams: Promise<{
        q: string
    }>
}) {

    const query = await searchParams;
    const q = query.q;

    const data: {
        blogs: Blog[]
    } = await gqlclient.request(SEARCH_QUERY, {
        q: q
    })

    const blogs = data.blogs;

    return (
        <div className=" flex flex-col  gap-5 mx-5   sm:items-start">
            {
                blogs.map((blog) => {
                    return (
                        <div key={blog.id}>
                            <BlogCard blog={blog} />
                        </div>


                    )
                })
            }
        </div>
    )

}