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
  // Objects (e.g. z.object({}))
  if (schema.constructor.name === "ZodObject") {
    const shape = (schema as any).shape as Record<string, ZodTypeAny>;
    const nestedPaths = Object.entries(shape).flatMap(([key, child]) => {
      const fullPath = prefix ? `${prefix}.${key}` : key;
      return extractPaths(child, fullPath);
    });
    return [prefix, ...nestedPaths].filter(Boolean);
  }

  // Wrappers (optional, nullable, default, effects)
  if (
    schema.constructor.name === "ZodOptional" ||
    schema.constructor.name === "ZodNullable" ||
    schema.constructor.name === "ZodDefault" ||
    schema.constructor.name === "ZodEffects"
  ) {
    const inner =
      (schema as any)._def?.innerType ?? (schema as any)._def?.schema;
    return extractPaths(inner, prefix);
  }

  // Arrays
  if (schema.constructor.name === "ZodArray") {
    const itemPaths = extractPaths((schema as any)._def.type, "");

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
