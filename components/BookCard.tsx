import Link from "next/link";
import type { Book } from "@/types/book";

export default function BookCard({ book, compact = false }: { book: Book; compact?: boolean }) {
  return (
    <article className="group overflow-hidden rounded-[1.7rem] border border-white/80 bg-white/85 shadow-xl shadow-amber-100/60 transition hover:-translate-y-1 hover:shadow-2xl">
      <div className="relative">
        <img src={book.image_url} alt={book.title} className={`w-full object-cover transition duration-300 group-hover:scale-105 ${compact ? "h-64" : "h-72"}`} />
        <span className="badge badge-warning absolute left-4 top-4 font-bold">{book.category}</span>
      </div>
      <div className="p-5">
        <h3 className="line-clamp-2 text-xl font-black text-slate-950">{book.title}</h3>
        {!compact && <p className="mt-1 text-sm font-semibold text-slate-500">{book.author}</p>}
        <Link href={`/books/${book.id}`} className="btn btn-neutral mt-5 w-full rounded-full">
          {compact ? "Details" : "View Details"}
        </Link>
      </div>
    </article>
  );
}
