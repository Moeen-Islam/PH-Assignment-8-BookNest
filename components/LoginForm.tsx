"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function LoginForm({ redirectTo = "/" }: { redirectTo?: string }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);


  const login = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage("");

    const { error } = await authClient.signIn.email({ email, password, rememberMe: true });
    setLoading(false);

    if (error) {
      const message = error.message || "Invalid email or password.";
      setErrorMessage(message);
      toast.error(message);
      return;
    }

    toast.success("Logged in successfully");
    router.push(redirectTo);
    router.refresh();
  };

  const googleLogin = async () => {
  setErrorMessage("");

  try {
    setGoogleLoading(true);

    const { error } = await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });

    if (error) {
      console.error("Google login error:", error);
      const message =
        error.message ||
        error.statusText ||
        "Google login failed. Check Google Client ID, Client Secret, and redirect URI.";

      setErrorMessage(message);
      toast.error(message);
      return;
    }
  } catch (error: any) {
    console.error("Google login exception:", error);

    const message =
      error?.message ||
      "Google login failed. Check your Google OAuth setup.";

    setErrorMessage(message);
    toast.error(message);
  } finally {
    setGoogleLoading(false);
  }
};

  return (
    <section className="flex min-h-[75vh] items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/70 bg-white/85 shadow-2xl shadow-amber-100/70 backdrop-blur lg:grid-cols-2">
        <div className="hidden bg-slate-950 p-10 text-white lg:block">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-amber-300">Welcome back</p>
          <h1 className="mt-4 text-5xl font-black">Return to your digital shelf.</h1>
          <p className="mt-6 text-slate-300">Login to view private book details, borrow books, and manage your profile.</p>
        </div>

        <div className="p-6 sm:p-10">
          <h2 className="text-3xl font-black text-slate-950">Login</h2>
          <p className="mt-2 text-slate-600">Enter your credentials to continue.</p>

          <form onSubmit={login} className="mt-8 space-y-4">
            <input type="email" required placeholder="Email" className="input input-bordered w-full rounded-full" value={email} onChange={(event) => setEmail(event.target.value)} />
            <input type="password" required minLength={8} placeholder="Password" className="input input-bordered w-full rounded-full" value={password} onChange={(event) => setPassword(event.target.value)} />
            {errorMessage && <p className="rounded-2xl bg-red-50 p-3 text-sm font-semibold text-red-600">{errorMessage}</p>}
            <button className="btn btn-warning w-full rounded-full" disabled={loading}>
              {loading ? <span className="loading loading-spinner loading-sm" /> : "Login"}
            </button>
          </form>

          <div className="divider">OR</div>
          <button onClick={googleLogin} className="btn btn-outline w-full rounded-full">Continue with Google</button>
          <p className="mt-6 text-center text-sm text-slate-600">
            New here? <Link href="/register" className="font-black text-amber-600">Create an account</Link>
          </p>
        </div>
      </div>
    </section>
  );
}
