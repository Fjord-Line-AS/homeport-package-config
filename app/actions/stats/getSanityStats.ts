"use server";
interface SanityStatsResponse {
  documents: {
    count: { value: number; limit: number; unit: string };
    sizeSum: { value: number; limit: number; unit: string };
    jsonSizeSum: { value: number; limit: number; unit: string };
  };
  fields: {
    count: { value: number; limit: number; unit: string };
  };
  types: {
    count: { value: number; limit: number; unit: string };
  };
  releases: {
    count: { value: number; limit: number; unit: string };
  };
}

export async function getSanityStats(): Promise<SanityStatsResponse> {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset =
    process.env.SANITY_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET;

  if (!projectId) {
    throw new Error("NEXT_PUBLIC_SANITY_PROJECT_ID is not configured");
  }

  const response = await fetch(
    `https://${projectId}.api.sanity.io/v1/data/stats/${dataset}`
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch Sanity stats: ${response.statusText}`);
  }

  return response.json();
}
