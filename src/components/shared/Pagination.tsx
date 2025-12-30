import Link from "next/link";

export function Pagination({
  currentPage,
  totalPages,
  hasNext,
  hasPrev,
}: {
  currentPage: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-end gap-3 pb-4">
      <Link
        className={`px-3 py-1 border rounded ${
          currentPage === 1 ? "pointer-events-none opacity-50" : ""
        }`}
        href={`?page=${currentPage - 1}`}
      >
        Prev
      </Link>

      <span>
        Page {currentPage} of {totalPages}
      </span>

      <Link
        className={`px-3 py-1 border rounded ${
          currentPage === totalPages ? "pointer-events-none opacity-50" : ""
        }`}
        href={`?page=${currentPage + 1}`}
      >
        Next
      </Link>
    </div>
  );
}
