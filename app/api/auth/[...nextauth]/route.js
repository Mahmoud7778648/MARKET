import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectMongoDB } from "../../../DBCconfig/connectdb";
import UserModal from "../../../DBCconfig/models/user";
import bcrypt from "bcrypt";

export const authOptions = {
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {},
      async authorize(credentials, req, res) {
        console.log(credentials);
        await connectMongoDB();
        const user = await UserModal.findOne({
          email: credentials.email,
        });
        // Add logic here to look up the user from the credentials supplied

        if (user) {
          const macth = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (macth) {
            return user;
          } else {
            return null;
          }
          // Any object returned will be saved in `user` property of the JWT
        } else {
          return null;

          // If you return null then an error will be displayed advising the user to check their details.
          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/signin",
  },
};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
