"use server";
import { sanityFetch } from "@/lib/sanity/live";
import { Port } from "@fjordline/sanity-types";

export async function getPorts(): Promise<Port[]> {
  const sanityFetchConfig = {
    query: `*[_type == "port"]`,
  };
  const res = await sanityFetch(sanityFetchConfig);
  if (!res || !Array.isArray(res.data)) {
    throw new Error("Failed to fetch ports");
  }
  return res.data;
}
