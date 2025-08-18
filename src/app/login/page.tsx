//@ts-nocheck
'use client'
import gqlclient from "@/services/graph";
import gql from "graphql-tag";
import { useRouter } from "next/navigation";
import { useState } from "react";


const LOG_IN =gql`
mutation Mutation($email: String!, $password: String!) {
  loginUser(email: $email, password: $password)
}`

export default function Login() {

  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
 
    
        try {
            const data = await gqlclient.request(LOG_IN, {
                password,
                email
            })

            if (data.loginUser) {
                alert("Logged in")
            } 
            else {
                alert("Failed")
            } 
        }
            catch (error) {

                alert(error.message)

            }

    
  };

  return (
    <div className="flex text-black  justify-center min-h-screen bg-gray-50">
      <div className="bg-white h-[80%] p-8 mt-12 rounded-2xl shadow-lg w-full max-w-sm border border-gray-200">
  
        <h2 className="text-xl font-bold text-center text-gray-800">
          Login to Your Account
        </h2>
   
        <form  className="space-y-4" onSubmit={handleLogin}>
  
          <div>
            <label className=" text-xs font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-1 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              required
            />
          </div>

          <div>
            <label className=" text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-1 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>


        <p className="text-sm text-gray-500 text-center mt-4">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-600 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
