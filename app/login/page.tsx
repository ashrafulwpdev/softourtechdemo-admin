"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/Button";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") || "/dashboard";

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true); setErr(null);
    const res = await signIn("credentials", { email, password, redirect: false, callbackUrl: next });
    setLoading(false);
    if (res?.ok) router.replace(next);
    else setErr("Invalid email or password.");
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={submit} className="card w-full max-w-md">
        <h1 className="text-2xl font-bold">Sign in</h1>
        {err && <div className="banner banner-err mt-3">{err}</div>}
        <div className="mt-4">
          <label className="label">Email</label>
          <input className="input mt-1" value={email} onChange={e=>setEmail(e.target.value)} required />
        </div>
        <div className="mt-3">
          <label className="label">Password</label>
          <input type="password" className="input mt-1" value={password} onChange={e=>setPassword(e.target.value)} required />
        </div>
        <Button type="submit" className="mt-4" loading={loading}>Sign in</Button>
      </form>
    </div>
  );
}
