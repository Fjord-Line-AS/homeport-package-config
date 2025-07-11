import { defineLive } from "next-sanity";
import { sanityApiClient } from "./client";
// import your local configured client

// set your viewer token
const token = process.env.SANITY_TOKEN;
if (!token) {
  throw new Error("Missing SANITY_API_READ_TOKEN");
}

// export the sanityFetch helper and the SanityLive component
export const { sanityFetch, SanityLive } = defineLive({
  client: sanityApiClient,
  serverToken: token,
  browserToken: token,
});
