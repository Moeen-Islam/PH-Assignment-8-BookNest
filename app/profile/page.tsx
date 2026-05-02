import Link from "next/link";
import { getCurrentSession } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const session = await getCurrentSession();

  if (!session) {
    redirect("/login");
  }

  const { user } = session;

  return (
    <section className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl rounded-[2rem] border border-white/70 bg-white/85 p-8 shadow-2xl shadow-amber-100/70 backdrop-blur">
        <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-5">
            <img src={user.image || "https://placehold.co/160x160/0f172a/fde68a?text=User"} alt={user.name || "User"} className="h-24 w-24 rounded-3xl object-cover shadow-lg" />
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-amber-600">My Profile</p>
              <h1 className="mt-2 text-3xl font-black text-slate-950">{user.name || "Library Member"}</h1>
              <p className="mt-1 text-slate-600">{user.email}</p>
            </div>
          </div>
          <Link href="/profile/update" className="btn btn-warning rounded-full px-6">Update Information</Link>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <ProfileRow label="Name" value={user.name || "Not provided"} />
          <ProfileRow label="Email" value={user.email || "Not provided"} />
          <ProfileRow label="User ID" value={user.id} />
          <ProfileRow label="Photo URL" value={user.image || "Not provided"} />
          <ProfileRow label="Email Verified" value={String(user.emailVerified ?? false)} />
          <ProfileRow label="Created At" value={formatDate(user.createdAt)} />
        </div>
      </div>
    </section>
  );
}

function ProfileRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-3xl bg-amber-50 p-5">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-700">{label}</p>
      <p className="mt-2 break-words text-base font-semibold text-slate-800">{value}</p>
    </div>
  );
}

function formatDate(value: Date | string | undefined) {
  if (!value) return "Not available";
  return new Date(value).toLocaleString();
}
