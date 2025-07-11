"use server";

import { sanityFetch } from "@/lib/sanity/live";
import { AllowedVehicleCategory } from "@fjordline/sanity-types";

export async function getVehicleCategories(): Promise<
  AllowedVehicleCategory[]
> {
  const sanityFetchConfig = {
    query: `*[_type == "allowedVehicleCategory"]`,
  };
  const res = await sanityFetch(sanityFetchConfig);
  if (!res || !Array.isArray(res.data)) {
    throw new Error("Failed to fetch vehicle categories");
  }
  return res.data;
}
