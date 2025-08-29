// app/login/page.tsx
"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Container, Card, Button } from "@/components/ui";
import { Suspense } from "react";

export const dynamic = "force-dynamic"; // avoid static export issues

function LoginInner() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const params = useSearchParams();
  const router = useRouter();
  const next = params.get("next") || "/dashboard";

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const res = await signIn("credentials", { email, password, redirect: false });
    if (res?.ok) router.replace(next);
    else alert("Invalid credentials");
  }

  return (
    <main className="section">
      <Container>
        <div className="mx-auto max-w-md">
          <Card>
            <h1 className="text-2xl font-bold">Admin Login</h1>
            <form onSubmit={submit} className="mt-4 space-y-3">
              <div>
                <label className="text-sm">Email</label>
                <input
                  className="mt-1 w-full rounded-xl border px-3 py-2"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm">Password</label>
                <input
                  type="password"
                  className="mt-1 w-full rounded-xl border px-3 py-2"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Button type="submit">Sign in</Button>
            </form>
          </Card>
        </div>
      </Container>
    </main>
  );
}

export default function Login() {
  return (
    <Suspense fallback={null}>
      <LoginInner />
    </Suspense>
  );
}
