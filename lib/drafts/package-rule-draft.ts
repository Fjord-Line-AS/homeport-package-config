import type { PackageRuleFormData } from "@/lib/validation";

export function getPackageRuleDraft(id: string): PackageRuleFormData | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(`draft:package-rule:${id}`);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function clearPackageRuleDraft(id: string) {
  if (typeof window !== "undefined") {
    sessionStorage.removeItem(`draft:package-rule:${id}`);
  }
}
