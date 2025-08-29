import { Suspense } from "react";
import { Container, Card } from "@/components/ui/server";
import LoginForm from "./LoginForm";

export const dynamic = "force-dynamic";

export default function Page({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const next = typeof searchParams?.next === "string" ? searchParams.next : "/dashboard";
  return (
    <main className="section">
      <Container>
        <div className="mx-auto max-w-md">
          <Card>
            <h1 className="text-2xl font-bold">Admin Login</h1>
            <Suspense fallback={<div className="mt-4 text-sm text-slate-500">Loading…</div>}>
              <LoginForm next={next} />
            </Suspense>
          </Card>
        </div>
      </Container>
    </main>
  );
}