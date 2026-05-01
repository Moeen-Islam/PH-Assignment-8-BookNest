import Link from "next/link";
import FeaturedBooks from "@/components/FeaturedBooks";
import ReaderPicksSlider from "@/components/ReaderPicksSlider";
import { getFeaturedBooks, getReaderPicks } from "@/lib/books";

export default function HomePage() {
  return (
    <div>
      <section className="relative overflow-hidden px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <div className="mb-5 inline-flex rounded-full border border-amber-300 bg-white/80 px-4 py-2 text-sm font-semibold text-amber-700 shadow-sm">
              Digital library. Real reading comfort.
            </div>
            <h1 className="max-w-3xl text-5xl font-black tracking-tight text-slate-950 sm:text-6xl lg:text-7xl">Find Your Next Read</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-700">
              Explore stories, technology books, and science titles in one fast, secure, and beautifully organized borrowing platform.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/books" className="btn btn-warning btn-lg rounded-full px-8">Browse Now</Link>
              <Link href="/register" className="btn btn-outline btn-lg rounded-full px-8">Join the Library</Link>
            </div>
          </div>

          <div className="book-shadow rounded-[2rem] border border-white/70 bg-white/80 p-5 backdrop-blur">
            <div className="rounded-[1.5rem] bg-slate-950 p-6 text-white">
              <p className="text-sm uppercase tracking-[0.3em] text-amber-300">BookNest Shelf</p>
              <div className="mt-6 grid grid-cols-3 gap-3">
                {["Story", "Tech", "Science", "Borrow", "Read", "Return"].map((item, index) => (
                  <div key={item} className="flex h-32 items-end rounded-t-xl bg-gradient-to-b from-amber-200 to-amber-500 p-3 text-sm font-bold text-slate-950" style={{ transform: `translateY(${index % 2 === 0 ? "0" : "18px"})` }}>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="overflow-hidden border-y border-amber-200 bg-slate-950 py-4 text-amber-100">
        <div className="marquee-track flex w-[200%] gap-8 whitespace-nowrap text-sm font-semibold uppercase tracking-[0.25em]">
          <span>New Arrivals: The Midnight Library | Special Discount on Memberships | Borrow Your Favorite Books Online |</span>
          <span>New Arrivals: The Midnight Library | Special Discount on Memberships | Borrow Your Favorite Books Online |</span>
        </div>
      </section>

      <FeaturedBooks books={getFeaturedBooks()} />

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 text-center">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-amber-600">Why BookNest?</p>
            <h2 className="mt-3 text-3xl font-black text-slate-950 sm:text-4xl">A smarter way to use a library</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              ["Fast Borrowing", "Borrow a book in seconds with a clear digital workflow."],
              ["Secure Access", "BetterAuth protects private routes and account access."],
              ["Curated Categories", "Filter books by Story, Tech, and Science."],
            ].map(([title, text]) => (
              <div key={title} className="rounded-3xl border border-white/70 bg-white/80 p-7 shadow-xl shadow-amber-100/60">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-400 text-xl font-black text-slate-950">{title.charAt(0)}</div>
                <h3 className="text-xl font-black text-slate-950">{title}</h3>
                <p className="mt-3 text-slate-600">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ReaderPicksSlider books={getReaderPicks()} />
    </div>
  );
}
