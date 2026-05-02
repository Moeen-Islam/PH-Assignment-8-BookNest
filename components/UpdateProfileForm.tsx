"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function UpdateProfileForm({ initialName, initialImage }: { initialName: string; initialImage: string }) {
  const router = useRouter();
  const [name, setName] = useState(initialName);
  const [image, setImage] = useState(initialImage);
  const [loading, setLoading] = useState(false);

  const updateProfile = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    const { error } = await authClient.updateUser({ name, image });
    setLoading(false);

    if (error) {
      toast.error(error.message || "Could not update profile.");
      return;
    }

    toast.success("Profile updated successfully");
    router.push("/profile");
    router.refresh();
  };

  return (
    <section className="flex min-h-[70vh] items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-2xl rounded-[2rem] border border-white/70 bg-white/85 p-8 shadow-2xl shadow-amber-100/70 backdrop-blur">
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-amber-600">Update Profile</p>
        <h1 className="mt-3 text-4xl font-black text-slate-950">Update Information</h1>

        <form onSubmit={updateProfile} className="mt-8 space-y-5">
          <input required className="input input-bordered w-full rounded-full" value={name} onChange={(event) => setName(event.target.value)} placeholder="Name" />
          <input type="url" className="input input-bordered w-full rounded-full" value={image} onChange={(event) => setImage(event.target.value)} placeholder="Image URL" />

          {image && (
            <div className="rounded-3xl bg-amber-50 p-4">
              <p className="mb-3 text-sm font-bold text-amber-700">Preview</p>
              <img src={image} alt="Profile preview" className="h-24 w-24 rounded-3xl object-cover" />
            </div>
          )}

          <button className="btn btn-warning w-full rounded-full" disabled={loading}>
            {loading ? <span className="loading loading-spinner loading-sm" /> : "Update Information"}
          </button>
        </form>
      </div>
    </section>
  );
}
