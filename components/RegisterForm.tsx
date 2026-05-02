"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

function getAuthErrorMessage(error: any) {
  if (!error) return "Something went wrong. Please try again.";

  const parts = [
    error.message,
    error.statusText,
    error.code ? `Code: ${error.code}` : "",
    error.status ? `Status: ${error.status}` : "",
  ].filter(Boolean);

  return parts.length > 0 ? parts.join(" | ") : "Registration failed. Please try again.";
}

export default function RegisterForm() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    image: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const update = (key: keyof typeof form, value: string) => {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));
  };

  const register = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage("");

    const name = form.name.trim();
    const email = form.email.trim().toLowerCase();
    const image = form.image.trim();
    const password = form.password;

    if (!name) {
      const message = "Name is required.";
      setErrorMessage(message);
      toast.error(message);
      return;
    }

    if (password.length < 8) {
      const message = "Password must be at least 8 characters.";
      setErrorMessage(message);
      toast.error(message);
      return;
    }

    if (image && !image.startsWith("http://") && !image.startsWith("https://")) {
      const message = "Photo URL must start with http:// or https://";
      setErrorMessage(message);
      toast.error(message);
      return;
    }

    try {
      setLoading(true);

      const payload: {
        name: string;
        email: string;
        password: string;
        image?: string;
      } = {
        name,
        email,
        password,
      };

      if (image) {
        payload.image = image;
      }

      const { error } = await authClient.signUp.email(payload);

      if (error) {
        console.error("BetterAuth register error:", error);
        const message = getAuthErrorMessage(error);
        setErrorMessage(message);
        toast.error(message);
        return;
      }

      toast.success("Registration successful. Please login.");
      router.push("/login");
      router.refresh();
    } catch (error: any) {
      console.error("Register exception:", error);
      const message = error?.message || "Registration failed. Check MongoDB and environment variables.";
      setErrorMessage(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
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
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-amber-300">
            Join BookNest
          </p>
          <h1 className="mt-4 text-5xl font-black">
            Create your library identity.
          </h1>
          <p className="mt-6 text-slate-300">
            Register to borrow books, save your profile, and access private book details.
          </p>
        </div>

        <div className="p-6 sm:p-10">
          <h2 className="text-3xl font-black text-slate-950">Registration</h2>
          <p className="mt-2 text-slate-600">
            Fill in your information to get started.
          </p>

          <form onSubmit={register} className="mt-8 space-y-4">
            <input
              required
              placeholder="Name"
              className="input input-bordered w-full rounded-full"
              value={form.name}
              onChange={(event) => update("name", event.target.value)}
            />

            <input
              type="email"
              required
              placeholder="Email"
              className="input input-bordered w-full rounded-full"
              value={form.email}
              onChange={(event) => update("email", event.target.value)}
            />

            <input
              type="text"
              placeholder="Photo URL, example: https://example.com/photo.jpg"
              className="input input-bordered w-full rounded-full"
              value={form.image}
              onChange={(event) => update("image", event.target.value)}
            />

            <input
              type="password"
              required
              minLength={8}
              placeholder="Password, minimum 8 characters"
              className="input input-bordered w-full rounded-full"
              value={form.password}
              onChange={(event) => update("password", event.target.value)}
            />

            {errorMessage && (
              <p className="rounded-2xl bg-red-50 p-3 text-sm font-semibold text-red-600">
                {errorMessage}
              </p>
            )}

            <button className="btn btn-warning w-full rounded-full" disabled={loading}>
              {loading ? <span className="loading loading-spinner loading-sm" /> : "Register"}
            </button>
          </form>

          <div className="divider">OR</div>

          <button
            onClick={googleLogin}
            className="btn btn-outline w-full rounded-full"
            disabled={googleLoading}
          >
            {googleLoading ? (
              <span className="loading loading-spinner loading-sm" />
            ) : (
              "Continue with Google"
            )}
          </button>

          <p className="mt-6 text-center text-sm text-slate-600">
            Already have an account?{" "}
            <Link href="/login" className="font-black text-amber-600">
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}