import { Suspense } from "react";
import SearchClient from "./SearchClient";

export default function SearchPage() {
  return (
    <Suspense fallback={<p className="text-center py-10">Loading search…</p>}>
      <SearchClient />
    </Suspense>
  );
}
