"use client"
import { signIn, signOut, useSession, getProviders } from "next-auth/react"
 
export default function SignInButton() {
    const { data: session } = useSession();

    if(!session){     
        return (
        
                <button onClick={() => signIn()} className="block text-white rounded-md bg-blue-500 pt-1 pb-1 pl-2 pr-2">Sign In</button>)
                }
    
        return (
                <button onClick={() => signOut()} className="block text-white rounded-md bg-red-600 pt-1 pb-1 pl-2 pr-2">Sign Out</button>)

}