import { defineLive } from "next-sanity";
import { sanityApiClient } from "./client";

const token = process.env.SANITY_TOKEN;
if (!token) {
  throw new Error("Missing SANITY_API_READ_TOKEN");
}

export const { sanityFetch, SanityLive } = defineLive({
  client: sanityApiClient,
  serverToken: token,
  browserToken: token,
});
