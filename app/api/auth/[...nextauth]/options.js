import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
        name: 'Credentials',
        credentials: {},
        async authorize(credentials){
          const user = JSON.parse(credentials.user);
          console.log(user);
          if (user) {
            return user;
          }
          return null;
        }
      })
  ],
  pages: {
    signIn: '/signin'
  },
  session: {
    strategy: 'jwt'
  },

};