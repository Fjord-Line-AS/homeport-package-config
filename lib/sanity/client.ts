import { createClient } from "next-sanity";

const sharedConfig = {
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "vX",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
  // SANITY_DATASET is used for the live client - comes from configmap
  // NEXT_PUBLIC_SANITY_DATASET comes from library in azure and used in build time
  dataset:
    process.env.SANITY_DATASET ||
    process.env.NEXT_PUBLIC_SANITY_DATASET ||
    "homeport",
  useCdn: true,
};

/**
 * This client fetches fresh data
 */
const sanityClient = createClient({
  ...sharedConfig,
});
/**

/**
 * This client uses a sanity token to interacte with the Sanity API
 */
const sanityApiClient = createClient({
  ...sharedConfig,
  token: process.env.SANITY_TOKEN,
  stega: {
    studioUrl: "https://fjordline.sanity.studio",
  },
});

export { sanityClient, sharedConfig, sanityApiClient };
