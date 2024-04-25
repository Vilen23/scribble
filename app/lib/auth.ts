import CredentialsProvider  from "next-auth/providers/credentials"
import bycrpt from "bcrypt"
import prisma from "./db";
export const NEXT_AUTH = {
    providers:[
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                name: { label: "Name", type: "text", placeholder: "Name" },
              password: {
                label: "Password",
                type: "password",
                placeholder: "Password",
              },
            },
            async authorize(credentials:any){
                const hashedpassword = await bycrpt.hash(credentials.password, 10);
                const existingUser = await prisma.user.findFirst({
                    where:{
                        name: credentials.name,
                    }
                })
                if(existingUser){
                    const check = await bycrpt.compare(credentials.password, existingUser.password)
                    if(!check) return null;
                    const {password,...userWithoutPassword} = existingUser;
                    return userWithoutPassword;
                }
                try {
                    const user = await prisma.user.create({
                        data:{
                            name: credentials.name,
                            password: hashedpassword,
                            createdAt: new Date(),
                        }
                    })
                    const {password,...userWithoutPassword} = user;
                    return userWithoutPassword;
                } catch (error) {
                    console.log(error);
                }
                return null;
            }
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks:{
        async session({token,session}:any){
            session.user.id = token.sub;
            return session;
        },
        
    }
}