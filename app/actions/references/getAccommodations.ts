"use server";
import { sanityFetch } from "@/lib/sanity/live";
import { ACCOMMODATION_WITH_TRANSLATIONS_Result } from "@fjordline/sanity-types";

export async function getAccommodations(): Promise<
  ACCOMMODATION_WITH_TRANSLATIONS_Result[]
> {
  const sanityFetchConfig = {
    perspective: "published" as const,
    query: `*[_type == "accommodation_v2"]{
    ...,
    "_translations": *[_type == "translation.metadata" && references(^._id)].translations[].value->{
    title,
    slug,
    language,
    _id
  },
    }`,
  };
  const res = await sanityFetch(sanityFetchConfig);
  if (!res || !Array.isArray(res.data)) {
    throw new Error("Failed to fetch accommodations");
  }
  return res.data;
}
