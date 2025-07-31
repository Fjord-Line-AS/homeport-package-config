"use server";

import { v4 as uuidv4 } from "uuid";
import { sanityApiClient } from "@/lib/sanity/client";

const client = sanityApiClient;

export async function createNewPackageRuleDraft(): Promise<string> {
  const id = `drafts.${uuidv4()}`;

  await client.createIfNotExists(
    {
      _id: id,
      _type: "packageRule_v2",
      _createdAt: new Date().toISOString(),
      _updatedAt: new Date().toISOString(),
      name: "Untitled Rule",
    },
    { autoGenerateArrayKeys: true }
  );

  return id;
}
