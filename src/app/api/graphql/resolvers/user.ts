import prismaclient from "@/services/prisma"
import { cookies } from "next/headers"

export async function signUpUser(x: any, args: {
    name: string,
    email: string,
    password: string
}) {

    try {

        await prismaclient.user.create({

            data: {
                name: args.name,
                email: args.email,
                password: args.password
            },

        })

        return true

    } catch (error) {

        return false

    }
}


export async function loginUser(x: any, args: {

    email: string,

    password: string

}) {
const cookiestore = await cookies();
    try {


        const user = await prismaclient.user.findUnique({

            where: {

                email: args.email,

            }

        }) 

        if (user?.password == args.password) {
            cookiestore.set("token" , user.id)
            return true

        }

        else {

            return false

        }

    } catch (error) {

        return false

    }
}