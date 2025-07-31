"use server";

import type { PackageRuleFormData } from "@/lib/validation";
import { sanityApiClient } from "@/lib/sanity/client";

const client = sanityApiClient;

export async function savePackageRuleDraft(
  id: string,
  data: PackageRuleFormData
) {
  if (!id) throw new Error("Missing document ID");

  const draftId = id.startsWith("drafts.") ? id : `drafts.${id}`;

  try {
    await client.createOrReplace(
      {
        ...data,
        _id: draftId,
        _type: "packageRule_v2",
      },
      { autoGenerateArrayKeys: true }
    );

    return { success: true };
  } catch (err) {
    console.error("[Server Action] Failed to save draft", err);
    return { success: false, error: "Failed to save draft" };
  }
}
