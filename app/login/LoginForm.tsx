"use client";

import { signIn } from "next-auth/react";
import { useState, useTransition, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/client";

export default function LoginForm({ next }: { next?: string }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const emailRef = React.useRef<HTMLInputElement>(null);

  // Focus email input if there is an error
  useEffect(() => {
    if (error) {
      emailRef.current?.focus();
    }
  }, [error]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      const res = await signIn("credentials", { email, password, redirect: false, callbackUrl: next || "/dashboard" });
      if (res?.ok) {
        router.replace(res.url || next || "/dashboard");
      } else {
        setError("Invalid email or password.");
      }
    });
  }

  return (
    <form onSubmit={submit} className="mt-4 space-y-3">
      <div>
        <label className="text-sm">Email</label>
        <input
          ref={emailRef}
          className="mt-1 w-full rounded-xl border px-3 py-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="text-sm">Password</label>
        <input
          type="password"
          className="mt-1 w-full rounded-xl border px-3 py-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      {error && <div className="text-sm text-red-600">{error}</div>}
      <Button type="submit" disabled={isPending}>{isPending ? "Signing in..." : "Sign in"}</Button>
    </form>
  );
}
