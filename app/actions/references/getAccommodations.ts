"use server";
import { sanityFetch } from "@/lib/sanity/live";
import { Accommodation_v2 } from "@fjordline/sanity-types";

export async function getAccommodations(): Promise<Accommodation_v2[]> {
  const sanityFetchConfig = {
    query: `*[_type == "accommodation_v2"]`,
  };
  const res = await sanityFetch(sanityFetchConfig);
  if (!res || !Array.isArray(res.data)) {
    throw new Error("Failed to fetch accommodations");
  }
  return res.data;
}
