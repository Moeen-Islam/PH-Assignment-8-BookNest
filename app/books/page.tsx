import AllBooksClient from "@/components/AllBooksClient";
import { getBooks } from "@/lib/books";

export default function AllBooksPage() {
  return (
    <section className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 rounded-[2rem] bg-slate-950 p-8 text-white shadow-2xl">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-amber-300">All Books</p>
          <h1 className="mt-3 text-4xl font-black sm:text-5xl">Browse the full library</h1>
          <p className="mt-4 max-w-2xl text-slate-300">Search by title or use the category sidebar to discover the right book.</p>
        </div>
        <AllBooksClient books={getBooks()} />
      </div>
    </section>
  );
}
