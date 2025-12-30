"use client";

import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="py-20 text-center">
      <h2 className="text-2xl font-semibold">Page not found</h2>

      <button
        onClick={() => router.back()}
        className="mt-6 inline-flex cursor-pointer items-center justify-center rounded-md bg-black text-white p-2"
      >
        ← Back
      </button>
    </div>
  );
}
