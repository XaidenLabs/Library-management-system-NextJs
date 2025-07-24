// components/ShowMoreButton.tsx
"use client";

export default function ShowMoreButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="mt-4 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
    >
      Show More
    </button>
  );
}
