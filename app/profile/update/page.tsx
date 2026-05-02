import UpdateProfileForm from "@/components/UpdateProfileForm";
import { getCurrentSession } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function UpdateProfilePage() {
  const session = await getCurrentSession();

  if (!session) {
    redirect("/login");
  }

  return <UpdateProfileForm initialName={session.user.name || ""} initialImage={session.user.image || ""} />;
}
