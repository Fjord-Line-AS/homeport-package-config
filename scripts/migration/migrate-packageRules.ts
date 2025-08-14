import { sanityFetch } from "@/lib/sanity/live";
import { sanityApiClient } from "@/lib/sanity/client";
import { Bundle_v2 } from "@fjordline/sanity-types";
import { v4 as uuidv4 } from "uuid";

const client = sanityApiClient;

async function migrateBundleRules() {
  const sanityFetchConfig = {
    query: `*[_type == "bundle_v2" && defined(bundlePackageRules)] {
    _id,
    _rev,
    name,
    bundlePackageRules
  }`,
  };
  const res = await sanityFetch(sanityFetchConfig);
  const bundles: Bundle_v2[] = res.data;

  console.log(`Found ${bundles.length} bundles to migrate`);

  for (const bundle of bundles) {
    const { _id, name, bundlePackageRules } = bundle;

    const ruleDocId = uuidv4();

    // Create new package rule document
    await client.createIfNotExists({
      _id: ruleDocId,
      _type: "packageRule_v2",
      name: name ?? `Rule for ${_id}`,
      description: `Migrated from bundle ${_id}`,
      rules: bundlePackageRules,
    });

    // Patch original bundle to add reference
    await client
      .patch(_id)
      // .unset(["bundlePackageRules"]) // Uncomment if you want to remove the old rules
      .set({
        packageRuleRef: {
          _type: "reference",
          _ref: ruleDocId,
        },
      })
      .commit();

    console.log(`Migrated ${_id} → ${ruleDocId}`);
  }

  console.log("✅ Migration complete.");
}

migrateBundleRules().catch((err) => {
  console.error("❌ Migration failed:", err.message);
  process.exit(1);
});
