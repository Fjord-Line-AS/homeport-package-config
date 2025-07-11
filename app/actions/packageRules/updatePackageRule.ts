// app/actions/packageRules/updatePackageRule.ts
"use server";

import { revalidatePath } from "next/cache";
import { sanityApiClient } from "@/lib/sanity/client";
import { PackageRule_v2 } from "@fjordline/sanity-types";

export async function updatePackageRule(
  id: string,
  data: Partial<PackageRule_v2>
): Promise<PackageRule_v2> {
  const updated: PackageRule_v2 = await sanityApiClient
    .patch(id)
    .set({ ...data, _updatedAt: new Date().toISOString() })
    .commit({ autoGenerateArrayKeys: true });

  // Optional: Revalidate any listing page or detail page
  revalidatePath("/admin/package-rules");

  return updated;
}
