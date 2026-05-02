import BookCard from "@/components/BookCard";
import type { Book } from "@/types/book";

export default function FeaturedBooks({ books }: { books: Book[] }) {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-amber-600">Featured Books</p>
            <h2 className="mt-3 text-3xl font-black text-slate-950 sm:text-4xl">Top picks from the shelf</h2>
          </div>
          <p className="max-w-xl text-slate-600"></p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {books.map((book) => <BookCard key={book.id} book={book} />)}
        </div>
      </div>
    </section>
  );
}
