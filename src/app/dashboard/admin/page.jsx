import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import LoginBtn from "@/lib/loginBtn";
import { getServerSession } from "next-auth";

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/signin");
  }
  return (
    <main className="min-h-screen flex items-center justify-center ">
      <Card className="max-w-5xl w-full min-h-[50vh] item-center">
        <CardHeader className="">Welcome to the admin page</CardHeader>
        <CardContent className="">
          <div className="flex-col">
            {session.user.role === "admin" ? (
              <div className="  ">Admin page content</div>
            ) : (
              <div className="flex-col max-w-sm items-center h-[80vh] ">
                This page is only accessible to admin
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
