import type { PackageRuleFormData } from "../validation";
import { BundlePackageRules, PackageRule_v2 } from "@fjordline/sanity-types";

export function mapFormDataToSanityDoc(
  formData: PackageRuleFormData
): Omit<PackageRule_v2, "_id" | "_createdAt" | "_updatedAt" | "_rev"> {
  const rules: BundlePackageRules = {
    ...formData.rules,
    _type: "bundlePackageRules",
  };
  return {
    name: formData.name,
    description: formData.description ?? "",
    rules,
    _type: "packageRule_v2",
  };
}
