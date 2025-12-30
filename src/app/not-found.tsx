"use client";

import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="py-20 text-center">
      <h2 className="text-2xl font-semibold">Page not found</h2>

      <button
        onClick={() => router.back()}
        className="mt-6 inline-flex cursor-pointer items-center justify-center rounded-md bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-black/85"
      >
        ← Back
      </button>
    </div>
  );
}
