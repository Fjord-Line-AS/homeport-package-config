import { sanityFetch } from "@/lib/sanity/live";
import { sanityApiClient } from "@/lib/sanity/client";

const client = sanityApiClient;

async function migrateBundleRules() {
  const sanityFetchConfig = {
    query: `*[_type == "bundle_v2" && defined(bundlePackageRules)][0...1000] {
    _id,
    _rev,
    name,
    bundlePackageRules
  }`,
  };
  const res = await sanityFetch(sanityFetchConfig);
  const bundles = res.data;

  console.log(`Found ${bundles.length} bundles to migrate`);

  for (const bundle of bundles) {
    const { _id, name, bundlePackageRules } = bundle;

    const ruleDocId = `packageRule.${_id.replace("bundle_v2.", "")}`;

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
      .unset(["bundlePackageRules"])
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
