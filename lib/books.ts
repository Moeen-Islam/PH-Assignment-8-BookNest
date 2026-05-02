import booksData from "@/data/books.json";
import type { Book, BookCategory } from "@/types/book";

const books = booksData as Book[];

export function getBooks() {
  return books;
}

export function getFeaturedBooks() {
  return books.slice(0, 4);
}

export function getReaderPicks() {
  return books.slice(4, 10);
}

export function getBookById(id: string) {
  return books.find((book) => book.id === id);
}

export function getCategories(): Array<"All" | BookCategory> {
  return ["All", "Story", "Tech", "Science"];
}
