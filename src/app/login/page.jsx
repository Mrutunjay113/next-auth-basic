"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Page() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await signIn("credentials", {
      redirect: false,
      username,
      password,
    });

    if (result.error) {
      setError(result.error);
    } else {
      // Redirect to the home page or wherever you want after successful login
      router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <Card className=" p-8 rounded  w-full max-w-lg">
        <CardHeader className="text-2xl font-semibold text-center mb-6">
          <CardTitle>Login</CardTitle>
          <CardDescription>
            Please enter your username and password to login
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="">
            <div className="mb-4">
              <Label className="block text-sm font-medium">Username</Label>
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-2 border rounded focus:outline-none"
                required
              />
            </div>

            <div className="mb-6">
              <Label className="block text-sm font-medium">Password</Label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border rounded focus:outline-none"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-700 text-white font-semibold"
            >
              Login
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          {error && (
            <p className="text-red-500 text-center tracking-wide">{error}</p>
          )}
        </CardFooter>
      </Card>{" "}
    </div>
  );
}
