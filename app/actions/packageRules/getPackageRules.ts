"use server";
import { sanityFetch } from "@/lib/sanity/live";
import { PackageRule_v2 } from "@fjordline/sanity-types";

export async function getPackageRules(
  perspective: "drafts" | "published" = "drafts"
): Promise<(PackageRule_v2 & { _originalId: string })[]> {
  const query = `*[_type == "packageRule_v2"] | order(_updatedAt desc)`;

  const res = await sanityFetch({
    query,
    perspective,
  });

  if (!res || !Array.isArray(res.data)) {
    throw new Error("Failed to fetch package rules");
  }
  const data: (PackageRule_v2 & { _originalId: string })[] = res.data.map(
    (rule) => ({
      ...rule,
      _originalId: rule._originalId || rule._id.replace(/^drafts\./, ""),
    })
  );

  // Always add _originalId (for UI consistency)
  return data;
}
