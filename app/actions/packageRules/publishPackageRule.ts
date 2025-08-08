"use server";

import { revalidatePath } from "next/cache";
import { sanityApiClient } from "@/lib/sanity/client";
import { PackageRule_v2 } from "@fjordline/sanity-types";

export async function publishPackageRule(
  id: string,
  data: Partial<PackageRule_v2>
): Promise<PackageRule_v2> {
  const noDraftId = id.startsWith("drafts.") ? id.replace("drafts.", "") : id;
  const draftId = `drafts.${noDraftId}`;

  // 1. Update the published document
  const updatedDoc: PackageRule_v2 = {
    ...data,
    _id: noDraftId,
    _type: "packageRule_v2", // or whatever type you use
    _updatedAt: new Date().toISOString(),
    _createdAt: data._createdAt ?? new Date().toISOString(),
    _rev: data._rev ?? "", // Ensure _rev is always a string
  };

  console.log("[publishPackageRule] Updating document:", updatedDoc);

  const updated = await sanityApiClient.createOrReplace(updatedDoc, {
    autoGenerateArrayKeys: true,
  });

  // 2. Delete the lingering draft
  await sanityApiClient.delete(draftId).catch((err) => {
    console.warn(`[publishPackageRule] Failed to delete draft ${draftId}`, err);
  });

  // 3. Revalidate
  revalidatePath("/admin/package-rules");

  return updated;
}
