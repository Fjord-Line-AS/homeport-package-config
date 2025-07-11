"use server";
import { sanityFetch } from "@/lib/sanity/live";
import { ShipProductCode } from "@fjordline/sanity-types";

export async function getShipProductCodes(): Promise<ShipProductCode[]> {
  const sanityFetchConfig = {
    query: `*[_type == "shipProductCode"]`,
  };
  const res = await sanityFetch(sanityFetchConfig);
  if (!res || !Array.isArray(res.data)) {
    throw new Error("Failed to fetch ship product codes");
  }
  return res.data;
}
