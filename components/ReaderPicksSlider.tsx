"use client";

import Link from "next/link";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import type { Book } from "@/types/book";

export default function ReaderPicksSlider({ books }: { books: Book[] }) {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl rounded-[2rem] bg-slate-950 p-6 text-white shadow-2xl sm:p-10">
        <div className="mb-8">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-amber-300">Reader Picks</p>
          <h2 className="mt-3 text-3xl font-black sm:text-4xl">Popular this week</h2>
          <p className="mt-3 max-w-xl text-slate-300">Built with SwiperJS for the npm package challenge.</p>
        </div>

        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={24}
          pagination={{ clickable: true }}
          autoplay={{ delay: 2600, disableOnInteraction: false }}
          breakpoints={{ 0: { slidesPerView: 1 }, 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
        >
          {books.map((book) => (
            <SwiperSlide key={book.id}>
              <div className="mb-12 rounded-[1.5rem] bg-white p-4 text-slate-950">
                <img src={book.image_url} alt={book.title} className="h-72 w-full rounded-2xl object-cover" />
                <div className="p-3">
                  <span className="badge badge-warning font-bold">{book.category}</span>
                  <h3 className="mt-3 line-clamp-2 text-xl font-black">{book.title}</h3>
                  <p className="mt-1 text-sm font-semibold text-slate-500">{book.author}</p>
                  <Link href={`/books/${book.id}`} className="btn btn-warning mt-4 w-full rounded-full">View Details</Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
