export async function fetchGoogleBooks(query: string = "novel", maxResults = 20) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY;

  if (!apiKey) {
    console.error("[Server] Missing NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY");
    return [];
  }

  const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=${maxResults}&key=${apiKey}`;

  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("[Server] Failed to fetch Google Books – Status:", res.status);
      return [];
    }

    const data = await res.json();

    return (
      data.items?.map((item: any) => {
        const volumeInfo = item.volumeInfo;
        const imageLinks = volumeInfo.imageLinks || {};

        return {
          id: item.id,
          title: volumeInfo.title,
          author: volumeInfo.authors?.join(", ") || "Unknown",
          genre: volumeInfo.categories?.[0] || "Unknown",
          rating: volumeInfo.averageRating || 0,
          coverUrl:
            imageLinks.thumbnail ||
            imageLinks.smallThumbnail ||
            "https://via.placeholder.com/128x192?text=No+Cover",
          coverColor: "#ffffff",
          description: volumeInfo.description || "No description available.",
          totalCopies: 0,
          availableCopies: 0,
          videoUrl: "",
          createdAt: new Date().toISOString(),
          summary: volumeInfo.subtitle || "",
          total: 0,
          source: "google" as const,
        };
      }) ?? []
    );
  } catch (error) {
    console.error("[Server] Failed to fetch Google Books:", error);
    return [];
  }
}
