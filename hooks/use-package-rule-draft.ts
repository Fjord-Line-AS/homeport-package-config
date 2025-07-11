import { useEffect } from "react";
import type { PackageRuleFormData } from "@/lib/validation";

export function usePackageRuleDraft(
  id: string,
  form: { watch: any; getValues: () => PackageRuleFormData }
) {
  const draftKey = `draft:package-rule:${id}`;

  // Restore saved draft (on init only)
  const getInitialDraft = (): PackageRuleFormData | null => {
    if (typeof window === "undefined") return null;
    const raw = localStorage.getItem(draftKey);
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  };

  // Watch changes and persist them
  useEffect(() => {
    const subscription = form.watch((value: PackageRuleFormData) => {
      localStorage.setItem(draftKey, JSON.stringify(value));
    });
    return () => subscription.unsubscribe();
  }, [form, draftKey]);

  const clearDraft = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(draftKey);
    }
  };

  return {
    getInitialDraft,
    clearDraft,
  };
}
