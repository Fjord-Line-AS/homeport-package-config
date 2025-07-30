"use server";
import { sanityFetch } from "@/lib/sanity/live";
import { PackageRule_v2 } from "@fjordline/sanity-types";

export async function getPackageRules(): Promise<
  (PackageRule_v2 & { _originalId: string })[]
> {
  const sanityFetchConfig = {
    query: `*[_type == "packageRule_v2"] | order(_updatedAt desc)`,
    perspective: "drafts" as const,
  };
  const res = await sanityFetch(sanityFetchConfig);
  if (!res || !Array.isArray(res.data)) {
    throw new Error("Failed to fetch package rules");
  }
  return res.data;
}
