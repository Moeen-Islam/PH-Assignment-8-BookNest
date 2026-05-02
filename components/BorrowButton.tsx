"use client";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function BorrowButton({ bookId, title }: { bookId: string; title: string }) {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const borrow = () => {
    if (isPending) return;
    if (!session) {
      toast.error("Please login before borrowing a book.");
      router.push(`/login?redirect=/books/${bookId}`);
      return;
    }
    toast.success(`Borrow confirmed for ${title}`);
  };

  return (
    <button onClick={borrow} className="btn btn-warning btn-lg rounded-full px-10" disabled={isPending}>
      {isPending ? "Checking..." : "Borrow This Book"}
    </button>
  );
}
