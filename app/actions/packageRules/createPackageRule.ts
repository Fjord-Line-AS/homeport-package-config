"use server";

import { revalidatePath } from "next/cache";
import { PackageRule_v2 } from "@fjordline/sanity-types";
import { sanityApiClient } from "@/lib/sanity/client";

export async function createPackageRule(
  data: PackageRule_v2
): Promise<PackageRule_v2> {
  const newDoc: PackageRule_v2 = {
    ...data,
    _type: "packageRule_v2",
    _createdAt: new Date().toISOString(),
    _updatedAt: new Date().toISOString(),
  };

  const created = await sanityApiClient.create<PackageRule_v2>(newDoc, {
    autoGenerateArrayKeys: true,
  });

  revalidatePath("/admin/package-rules");

  return created;
}
