"use server";

import { revalidatePath } from "next/cache";
import { sanityApiClient } from "@/lib/sanity/client";
import { PackageRule_v2 } from "@fjordline/sanity-types";

export async function updatePackageRule(
  id: string,
  data: Partial<PackageRule_v2>
): Promise<PackageRule_v2> {
  const noDraftId = id.startsWith("drafts.") ? id.replace("drafts.", "") : id;
  const draftId = `drafts.${noDraftId}`;

  // 1. Update the published document
  const updated: PackageRule_v2 = await sanityApiClient
    .patch(noDraftId)
    .set({ ...data, _updatedAt: new Date().toISOString() })
    .commit({ autoGenerateArrayKeys: true });

  // 2. Delete the lingering draft
  await sanityApiClient.delete(draftId).catch((err) => {
    console.warn(`[updatePackageRule] Failed to delete draft ${draftId}`, err);
  });

  // 3. Revalidate
  revalidatePath("/admin/package-rules");

  return updated;
}
