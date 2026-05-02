import RegisterForm from "@/components/RegisterForm";
import { getCurrentSession } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function RegisterPage() {
  const session = await getCurrentSession();

  if (session) {
    redirect("/");
  }

  return <RegisterForm />;
}
