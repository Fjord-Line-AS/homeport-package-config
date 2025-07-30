"use server";
import { sanityFetch } from "@/lib/sanity/live";
import { PackageRule_v2 } from "@fjordline/sanity-types";

export async function getPackageRule(
  id: string
): Promise<PackageRule_v2 | null> {
  const sanityFetchConfig = {
    query: `*[_type == "packageRule_v2" && _id == $id || _originalId == $id][0]`,
    params: { id },
    perspective: "drafts" as const,
  };
  const res = await sanityFetch(sanityFetchConfig);
  if (!res || !res.data) {
    return null;
  }
  return res.data;
}
