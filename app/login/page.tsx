import LoginForm from "@/components/LoginForm";
import { getCurrentSession } from "@/lib/session";
import { redirect } from "next/navigation";

type Props = {
  searchParams: Promise<{ redirect?: string }>;
};

export default async function LoginPage({ searchParams }: Props) {
  const session = await getCurrentSession();

  if (session) {
    redirect("/");
  }

  const { redirect: redirectTo } = await searchParams;

  return <LoginForm redirectTo={redirectTo || "/"} />;
}
