import { cookies } from "next/headers";
import prismaclient from "./services/prisma";

export async function getUserFromCookies() {

try {

const cookieStore = await cookies();

const id = cookieStore.get("token")?.value;

if(!id) return null;

const user = await prismaclient.user.findUnique({

where : {

id

}

})

if(!user) return null;

return user

} catch (error) {

return null

}
}