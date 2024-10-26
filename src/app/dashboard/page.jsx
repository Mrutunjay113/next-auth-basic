import { getServerSession } from "next-auth";
// import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { authOptions } from "../api/auth/[...nextauth]/options";
import LoginBtn from "@/lib/loginBtn";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default async function Page() {
  const session = await getServerSession(authOptions);
  console.log("session", session);

  return (
    <Card className="m-5">
      <CardHeader className="text-2xl">Dashboard</CardHeader>
      <CardContent className="flex flex-col items-center  h-[80vh]">
        <div>
          <div>
            <h1 className="text-4xl">Welcome to the Dashboard</h1>{" "}
            <p className="text-xl">You are signed in</p>
          </div>

          {session ? (
            <Card className="mt-5 ">
              <CardContent className="grid gap-2 p-5">
                <p className="text-xl">User: {session.user.username}</p>
                <p className="text-xl">
                  Active usecases:{" "}
                  {Object.entries(session.user.active_usecases)
                    .map(([key, value]) => `${key}: ${value}`)
                    .filter((item) => item.includes("true"))
                    .join(", ")}
                </p>
                <p className="text-xl">Client ID: {session.user.client_id}</p>
                <p className="text-xl">
                  Role: {session.user.role === "admin" ? "admin" : "user"}
                </p>

                <p className="text-xl">Email: {session.user.email}</p>

                <LoginBtn />
              </CardContent>
            </Card>
          ) : (
            <>
              <p className="text-xl">You are not signed in</p>
              <Link href="/login" className="text-blue-500">
                Sign in
              </Link>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
