"use server";
import { sanityFetch } from "@/lib/sanity/live";
import { Ship } from "@fjordline/sanity-types";

export async function getShips(): Promise<Ship[]> {
  const sanityFetchConfig = {
    query: `*[_type == "ship"]`,
  };
  const res = await sanityFetch(sanityFetchConfig);
  if (!res || !Array.isArray(res.data)) {
    throw new Error("Failed to fetch ships");
  }
  return res.data;
}
