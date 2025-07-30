import { NextResponse } from "next/server";
import { sanityApiClient } from "@/lib/sanity/client";

const client = sanityApiClient;

export async function POST(req: Request) {
  try {
    const { id, data } = await req.json();

    if (!id || !data) {
      return NextResponse.json(
        { error: "Missing ID or data" },
        { status: 400 }
      );
    }

    const draftId = id;

    await client.createOrReplace({
      ...data,
      _id: draftId,
      _type: "packageRule_v2",
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[Sanity Draft API] Failed to save draft", err);
    return NextResponse.json(
      { error: "Failed to save draft" },
      { status: 500 }
    );
  }
}
