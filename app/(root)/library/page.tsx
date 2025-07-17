import { auth } from "@/auth";
import InfiniteScrollWrapper from "@/components/shared/InfiniteScrollWrapper";
import { db } from "@/database/drizzle";
import { books } from "@/database/schema";
import { desc, sql, ilike } from "drizzle-orm";

export interface IBook extends Book {
  total: number;
}

interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

const Page = async ({ searchParams }: PageProps) => {
  const session = await auth();
  if (!session?.user?.id) return null;

  const limit = 12;

  // Extract and sanitize search query
  const searchRaw = searchParams.q;
  const search = typeof searchRaw === "string" ? searchRaw : "";

  const allBooks = (await db
    .select({
      id: books.id,
      title: books.title,
      author: books.author,
      genre: books.genre,
      rating: books.rating,
      coverUrl: books.coverUrl,
      coverColor: books.coverColor,
      description: books.description,
      totalCopies: books.totalCopies,
      availableCopies: books.availableCopies,
      videoUrl: books.videoUrl,
      createdAt: books.createdAt,
      summary: books.summary,
      total: sql<number>`COUNT(*) OVER()`,
    })
    .from(books)
    .where(search ? ilike(books.title, `%${search}%`) : undefined)
    .limit(20)
    .orderBy(desc(books.createdAt))) as IBook[];

  return (
    <div>
      {/* Search Bar */}
      <form
        action="/library"
        method="get"
        className="flex justify-end mb-6"
      >
        <input
          type="text"
          name="q"
          defaultValue={search}
          placeholder="Search books..."
          className="rounded-l-md px-4 py-2 text-black focus:outline-none"
        />
        <button
          type="submit"
          className="rounded-r-md bg-blue-700 px-4 py-2 text-white hover:bg-blue-800 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
            />
          </svg>
        </button>
      </form>

      {/* Book List */}
      <InfiniteScrollWrapper
        totalBooks={allBooks[0]?.total || 0}
        initialBooks={allBooks}
        limit={limit}
      />
    </div>
  );
};

export default Page;
