import { writeFileSync } from "fs";
import { packageRuleSchema } from "@/lib/validation";

import { ZodTypeAny } from "zod";

/**
 * Recursively extracts valid dot-separated paths from a Zod schema.
 * Includes:
 *  - parent object keys
 *  - array keys
 *  - nested object fields
 */
export function extractPaths(schema: ZodTypeAny, prefix = ""): string[] {
  const def = schema._def;

  // Objects (e.g. z.object({}))
  if (def.typeName === "ZodObject") {
    const shape = def.shape() as Record<string, ZodTypeAny>;
    const nestedPaths = Object.entries(shape).flatMap(([key, child]) => {
      const fullPath = prefix ? `${prefix}.${key}` : key;
      return extractPaths(child, fullPath);
    });
    return [prefix, ...nestedPaths].filter(Boolean);
  }

  // Wrappers (optional, nullable, default, effects)
  if (
    def.typeName === "ZodOptional" ||
    def.typeName === "ZodNullable" ||
    def.typeName === "ZodDefault" ||
    def.typeName === "ZodEffects"
  ) {
    return extractPaths(def.innerType ?? def.schema, prefix);
  }

  // Arrays
  if (def.typeName === "ZodArray") {
    const itemPaths = extractPaths(def.type, "");

    // Always include the array key itself
    const result = [prefix];

    // If item is primitive, optionally include []. (optional)
    if (itemPaths.length === 1 && itemPaths[0] === "") {
      result.push(`${prefix}[]`);
    } else {
      // Nested array of objects
      result.push(...itemPaths.map((sub) => `${prefix}[].${sub}`));
    }

    return result;
  }

  // Base case: primitive leaf field
  return [prefix];
}

/**
 * Main generator function
 */
function generateValidPaths() {
  const ruleSchema = packageRuleSchema.shape.rules;
  const paths = extractPaths(ruleSchema, "rules");

  // Also include top-level fields like "name" and "description"
  const topLevel = extractPaths(packageRuleSchema, "");

  const allPaths = [...topLevel, ...paths];
  const unique = Array.from(new Set(allPaths)).sort();

  const output = `// Auto-generated from Zod schema
export type ValidPackageRulePath =
  ${unique.map((p) => `"${p}"`).join(" |\n  ")};
`;

  writeFileSync("types/zod/validPaths.ts", output, "utf-8");
  console.log("✅ validPaths.ts generated with", unique.length, "paths.");
}

generateValidPaths();
