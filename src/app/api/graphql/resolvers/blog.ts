import { getUserFromCookies } from "@/helper";
import prismaclient from "@/services/prisma";

export async function getdatabyid(x: any, args: any) {
    const id = args.id;
    const blog = await prismaclient.blog.findUnique({
        where: {
            id: id
        }
    })
    return blog;
}



export default async function getblogs(x: any, args: any) {

    const q = args?.q || "";
    const blogs = await prismaclient.blog.findMany({
        where: {
            title: {
                contains: q,
                mode: "insensitive"
            }
        }
    })
    return blogs;
}



export async function createblog(x: any, args: any) {
    const user =await getUserFromCookies();
    if(!user) return null;
    const blogtosave = {
        title: args.title,
        content: args.content,
        imageUrl: args.imageUrl,
        userid : user.id
    }

    try {
        const blog = await prismaclient.blog.create({
            data: blogtosave
        })
        return blog;
    }
    catch (err) {
        return null;
    }
}



export async function deleteblog(x: any, args: {
    id: string
}) {

    const id = args.id;
    try {

        await prismaclient.blog.delete({
            where: {
                id
            }
        })
        return true
    }
    catch (err) {
        return false
    }

}


export async function updateblog(x: any, args: {
            id: string,
            title: string,
            content?: string,
            imageUrl: string
        }) {
            const datatosave = {
                title: args.title,
                content: args.title,
                imageUrl: args.imageUrl
            };

            try {
                const updatedblog = await prismaclient.blog.update({
                    where: {
                        id: args.id
                    },
                    data: datatosave
                })
                return true
            }
            catch (err) {
                return false
            }

        }