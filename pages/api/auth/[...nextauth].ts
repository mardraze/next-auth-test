import NextAuth, { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import FacebookProvider from "next-auth/providers/facebook"
import session from "../../../lib/session"


export const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/signin',
  },
  secret: process.env.SECRET,
  providers: [
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
      authorization: "https://www.facebook.com/v17.0/dialog/oauth?scope=public_profile,email",
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    })
  ],
  jwt: {
    maxAge: 60 * 60 * 24 * 30,
    async encode(params: any) {
      return session.getCookie();
    },

    async decode() {
      return session.getJwtObject() || null
    }
  },
  
  events: {
    signIn(message) {
      session.onExternalSignIn(message)
    }
  }
}

export default NextAuth(authOptions)
