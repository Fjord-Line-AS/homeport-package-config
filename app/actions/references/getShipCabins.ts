"use server";
import { sanityFetch } from "@/lib/sanity/live";
import { ShipCabin } from "@fjordline/sanity-types";

export async function getShipCabins(): Promise<ShipCabin[]> {
  const sanityFetchConfig = {
    query: `*[_type == "shipCabin"]`,
  };
  const res = await sanityFetch(sanityFetchConfig);
  if (!res || !Array.isArray(res.data)) {
    throw new Error("Failed to fetch ship cabins");
  }
  return res.data;
}
