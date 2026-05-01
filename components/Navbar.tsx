"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/books", label: "All Books" },
  { href: "/profile", label: "My Profile" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const logout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("Logged out successfully");
          router.push("/login");
          router.refresh();
        },
      },
    });
  };

  const menu = (
    <>
      {navLinks.map((link) => (
        <li key={link.href}>
          <Link href={link.href} className={pathname === link.href ? "font-black text-amber-600" : "font-semibold"}>
            {link.label}
          </Link>
        </li>
      ))}
    </>
  );

  return (
    <header className="sticky top-0 z-50 border-b border-amber-200/70 bg-white/75 backdrop-blur-xl">
      <div className="navbar mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="navbar-start">
          <div className="dropdown">
            <button tabIndex={0} className="btn btn-ghost lg:hidden" aria-label="Open menu">
              {/* Dropdown Icon */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </button>
            <ul tabIndex={0} className="menu dropdown-content menu-sm z-[1] mt-3 w-56 rounded-box bg-base-100 p-2 shadow">
              {menu}
            </ul>
          </div>
          <Link href="/" className="text-2xl font-black tracking-tight text-slate-950">
            Book<span className="text-amber-500">Nest</span>
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-2 px-1">{menu}</ul>
        </div>

        <div className="navbar-end gap-2">
          {isPending ? (
            <span className="loading loading-spinner loading-sm" />
          ) : session ? (
            <div className="flex items-center gap-2">
              <span className="hidden max-w-[140px] truncate font-bold text-slate-700 sm:inline">
                {session.user.name || "User"}
              </span>
              <button onClick={logout} className="btn btn-outline btn-sm rounded-full">Logout</button>
            </div>
          ) : (
            <Link href="/login" className="btn btn-warning btn-sm rounded-full px-5">Login</Link>
          )}
        </div>
      </div>
    </header>
  );
}
