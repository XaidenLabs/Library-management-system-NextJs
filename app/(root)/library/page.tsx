"use client";

import { useEffect, useState } from "react";
import InfiniteScrollWrapper from "@/components/shared/InfiniteScrollWrapper";

export interface IBook {
  id: number;
  title: string;
  author: string;
  genre: string;
  rating: number;
  coverUrl: string;
  coverColor: string;
  description: string;
  totalCopies: number;
  availableCopies: number;
  videoUrl: string;
  createdAt: string;
  summary: string;
  total: number;
}

export default function BooksSearchClient() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState<IBook[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    const fetchBooks = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/books?q=${encodeURIComponent(query)}`, {
          signal: controller.signal,
        });

        if (!res.ok) {
          console.error("Failed to fetch books");
          return;
        }

        const data = await res.json();
        setBooks(data.books || []);
      } catch (err: any) {
        if (err.name !== "AbortError") console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    const timeout = setTimeout(fetchBooks, 300); // debounce

    return () => {
      clearTimeout(timeout);
      controller.abort(); // cancel previous fetch if user keeps typing
    };
  }, [query]);

  return (
    <div className="p-4">
      <div className="flex justify-center mb-6">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="w-full max-w-3xl flex gap-2"
        >
          <input
            type="text"
            placeholder="Search books..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 border border-gray-300 rounded-full px-6 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </form>
      </div>

      {loading ? (
        <div className="text-center text-gray-500">Loading...</div>
      ) : (
        <InfiniteScrollWrapper
          totalBooks={books[0]?.total || 0}
          initialBooks={books.map((book) => ({
            ...book,
            id: String(book.id),
            createdAt: new Date(book.createdAt),
          }))}
          limit={12}
        />
      )}
    </div>
  );
}
