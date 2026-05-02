import BorrowButton from "@/components/BorrowButton";
import { getBookById } from "@/lib/books";
import { getCurrentSession } from "@/lib/session";
import { notFound, redirect } from "next/navigation";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function BookDetailsPage({ params }: Props) {
  const session = await getCurrentSession();

  if (!session) {
    redirect("/login");
  }

  const { id } = await params;
  const book = getBookById(id);

  if (!book) {
    notFound();
  }

  return (
    <section className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-6xl gap-10 rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-2xl shadow-amber-100/70 backdrop-blur lg:grid-cols-[0.8fr_1.2fr] lg:p-10">
        <img src={book.image_url} alt={book.title} className="h-[520px] w-full rounded-[1.5rem] object-cover shadow-2xl" />
        <div className="flex flex-col justify-center">
          <span className="badge badge-warning w-fit font-bold">{book.category}</span>
          <h1 className="mt-5 text-4xl font-black text-slate-950 sm:text-5xl">{book.title}</h1>
          <p className="mt-3 text-xl font-semibold text-slate-700">by {book.author}</p>
          <p className="mt-6 text-lg leading-8 text-slate-600">{book.description}</p>
          <div className="mt-8 rounded-3xl bg-amber-50 p-5">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-amber-700">Availability</p>
            <p className="mt-2 text-3xl font-black text-slate-950">{book.available_quantity} copies left</p>
          </div>
          <div className="mt-8">
            <BorrowButton bookId={book.id} title={book.title} />
          </div>
        </div>
      </div>
    </section>
  );
}
