//@ts-nocheck
"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import gql from "graphql-tag";
import gqlclient from "@/services/graph";

const SIGN_UP = gql`mutation Mutation($name: String!, $email: String!, $password: String!) {
  signUpUser(name: $name, email: $email, password: $password)
}`

export default function Signup() {

    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    async function handlesubmit(e) {

        e.preventDefault();

        try {
            const data = await gqlclient.request(SIGN_UP, {
                name,
                password,
                email
            })

            if (data.signUpUser) {
                alert("Created")
            } 
            else {
                alert("Failed")
            } 
        }
            catch (error) {

                alert(error.message)

            }


    }


    return (
        <div className="min-h-screen flex  justify-center text-black bg-gray-100 p-4">
            <div className="bg-white shadow-lg rounded-2xl mt-4 h-[80%] w-[80%] md:w-[40%] p-8">
                <h1 className="text-xl font-bold text-center  mb-6">Sign Up</h1>

                <form className="space-y-2" onSubmit={handlesubmit}>

                    <div>
                        
                        <label className=" text-gray-700 font-medium ">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="w-full px-4 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium ">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            className="w-full px-4 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium ">Name</label>
                                  <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your name"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-1 rounded-lg font-medium hover:bg-blue-600 transition"
                    >
                        Sign Up
                    </button>
                </form>

                <p className="text-center text-gray-500 text-sm mt-1">
                    Already have an account?{" "}
                    <a href="/login" className="text-blue-500 hover:underline">
                        Login
                    </a>
                </p>
            </div>
        </div>

    )
}