import { db } from "@/database/drizzle";
import { books } from "@/database/schema";
import { sql, desc } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;

    // Extract query params
    const pageSize = Number(searchParams.get("pageSize") || 10);
    const pageNo = Number(searchParams.get("pageNo") || 1);
    const searchQuery = searchParams.get("q")?.toLowerCase() || "";

    // Validate pagination input
    if (isNaN(pageSize) || isNaN(pageNo) || pageNo < 1 || pageSize < 5) {
      return NextResponse.json(
        { message: "Invalid pagination parameters" },
        { status: 400 }
      );
    }

    const offset = (pageNo - 1) * pageSize;

    // Fetch books with optional search filter
    const result = await db
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
        total: sql<number>`COUNT(*) OVER()`, // include total count
      })
      .from(books)
      .where(
        searchQuery
          ? sql`LOWER(${books.title}) LIKE ${`%${searchQuery}%`}`
          : undefined
      )
      .limit(pageSize)
      .offset(offset)
      .orderBy(desc(books.createdAt));

    return NextResponse.json({ books: result }, { status: 200 });
  } catch (error) {
    console.error("Error while fetching books:", error);
    return NextResponse.json(
      {
        message: "Something went wrong. Please try again later.",
        error: (error as Error).message || error,
      },
      { status: 500 }
    );
  }
}
