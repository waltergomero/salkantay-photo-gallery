import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import db from "@/utils/dbconnection";
import User from "@/models/user";
import bcryptjs from "bcryptjs";


export const {
    handlers: { GET, POST },
    auth, signIn, signOut,} = NextAuth({
    session: {strategy: 'jwt',},
    providers: [
        CredentialsProvider({
            credentials: {
                email: {},
                password: {},
            },
            async authorize(credentials) {
                if (credentials === null) return null;
                const { email, password } = credentials;
                
                try {              
                    await db.connectDB();
                    const user = await User.findOne({email: email});
                    await db.disconnectDB();
                   if (user) {
                        const isMatch =  await bcryptjs.compare(password, user.password); 

                        if (isMatch) {
                            return user;
                        } else {
                            throw new Error("Password is not correct");
                        }
                    } else {
                        throw new Error("User not found");
                    }
                } catch (error) {
                    throw new Error(error);
                }
            },
        }),
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code",
                },
            },
            
        }),
        GitHub({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code",
                },
            },
        }),
    ],

   
});