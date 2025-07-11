"use server";

import { revalidatePath } from "next/cache";
import { sanityApiClient } from "@/lib/sanity/client";

export async function deletePackageRule(id: string): Promise<void> {
  await sanityApiClient.delete(id);
  revalidatePath("/admin/package-rules");
}
