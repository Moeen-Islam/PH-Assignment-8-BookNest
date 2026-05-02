import Link from "next/link";

type Book = {
  id: string;
  title: string;
  author: string;
  description: string;
  category: string;
  available_quantity: number;
  image_url: string;
};

type BookCardProps = {
  book: Book;
};

export default function BookCard({ book }: BookCardProps) {
  return (
    <div className="group overflow-hidden rounded-[1.7rem] bg-white shadow-xl shadow-amber-100/70 transition duration-300 hover:-translate-y-2 hover:shadow-2xl">
      <div className="relative flex h-[360px] items-center justify-center overflow-hidden bg-gradient-to-br from-amber-50 via-white to-slate-100 p-4">
        <span className="absolute left-4 top-4 z-10 rounded-lg bg-amber-400 px-4 py-1 text-sm font-black text-slate-950 shadow">
          {book.category}
        </span>

        <img
          src={book.image_url}
          alt={book.title}
          className="h-full w-full rounded-2xl object-contain transition duration-500 group-hover:scale-105"
        />
      </div>

      <div className="space-y-5 p-6">
        <h3 className="line-clamp-2 min-h-[60px] text-2xl font-black leading-tight text-slate-950">
          {book.title}
        </h3>

        <Link
          href={`/books/${book.id}`}
          className="btn w-full rounded-full border-none bg-slate-950 text-white hover:bg-amber-500 hover:text-slate-950"
        >
          Details
        </Link>
      </div>
    </div>
  );
}