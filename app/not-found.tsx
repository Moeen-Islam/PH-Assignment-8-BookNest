import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] items-center justify-center px-4 py-16">
      <div className="max-w-lg rounded-[2rem] bg-white/85 p-8 text-center shadow-2xl">
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-amber-600">404</p>
        <h1 className="mt-3 text-4xl font-black text-slate-950">Page not found</h1>
        <p className="mt-4 text-slate-600">The page or book you are looking for does not exist.</p>
        <Link href="/books" className="btn btn-warning mt-6 rounded-full px-8">Browse Books</Link>
      </div>
    </section>
  );
}
