"use client";

import { useMemo, useState } from "react";
import BookCard from "@/components/BookCard";
import type { Book, BookCategory } from "@/types/book";

type Category = "All" | BookCategory;
const categories: Category[] = ["All", "Story", "Tech", "Science"];

export default function AllBooksClient({ books }: { books: Book[] }) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category>("All");

  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      const matchesSearch = book.title.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = selectedCategory === "All" || book.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [books, search, selectedCategory]);

  return (
    <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
      <aside className="rounded-[1.7rem] border border-white/80 bg-white/85 p-5 shadow-xl shadow-amber-100/60 lg:sticky lg:top-24 lg:h-fit">
        <h2 className="text-lg font-black text-slate-950">Filter by Category</h2>
        <div className="mt-4 grid gap-2">
          {categories.map((category) => (
            <button key={category} onClick={() => setSelectedCategory(category)} className={`btn justify-start rounded-full ${selectedCategory === category ? "btn-warning" : "btn-ghost"}`}>
              {category}
            </button>
          ))}
        </div>
      </aside>

      <div>
        <input
          type="text"
          placeholder="Search books by title..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="input input-bordered mb-6 h-14 w-full rounded-full bg-white/90 shadow-lg"
        />

        <div className="mb-5 flex items-center justify-between gap-3">
          <p className="font-bold text-slate-700">Showing {filteredBooks.length} of {books.length} books</p>
          <span className="badge badge-warning font-bold">{selectedCategory}</span>
        </div>

        {filteredBooks.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {filteredBooks.map((book) => <BookCard key={book.id} book={book} compact />)}
          </div>
        ) : (
          <div className="rounded-[1.7rem] bg-white/85 p-10 text-center shadow-xl">
            <h3 className="text-2xl font-black text-slate-950">No books found</h3>
            <p className="mt-3 text-slate-600">Try another title or category.</p>
          </div>
        )}
      </div>
    </div>
  );
}
