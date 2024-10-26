import ConnectMongoDb from "@/lib/mongoDb";
import AdminModel from "@/model/admin";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const users = [
  {
    id: 1,
    name: "John Doe",
    username: "admin",
    password: "admin", // Hash this using bcrypt
    role: "admin",
    client_id: "bombay",
    active: {
      fire: true,
    },
    email: "s@gmail.com",
  },
  {
    id: 2,
    name: "Daniel Smith",
    username: "user",
    password: "user", // Hash this using bcrypt
    role: "user",
    client_id: "swastik",
    active: {
      fire: false,
      smoke: true,
    },
  },
];

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await ConnectMongoDb();
        // const user = users.find(
        //   (user) => user.username === credentials.username
        // );
        const user = await AdminModel.findOne({
          username: credentials.Username,
        });
        console.log("user", user);

        if (!user) {
          throw new Error("No user found with this username");
        }

        const isPasswordValid = user.Password === credentials.password;

        if (!isPasswordValid) {
          throw new Error("Invalid password");
        }

        return user;
      },
    }),
  ],
  pages: {
    signIn: "/login", // Redirect to custom login page
    Error: "/login", // Redirect to custom error page
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user._id;
        // token.name = user.name;
        token.username = user.Username;
        token.client_id = user.client_id;
        token.email = user.Email;
        token.role = user.role;
        token.active_usecases = user.active_usecases;
      }
      return token;
    },
    async session({ session, token, user }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;

        session.user.username = token.username;
        session.user.client_id = token.client_id;
        session.user.email = token.email;

        session.user.active_usecases = token.active_usecases;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET, // Make sure to set this in your environment variables
};

export default NextAuth(authOptions);
