import { useEffect } from "react";
import type { PackageRuleFormData } from "@/lib/validation";

export function usePackageRuleDraftWatcher(id: string, form: { watch: any }) {
  useEffect(() => {
    const draftKey = `draft:package-rule:${id}`;

    const subscription = form.watch((value: PackageRuleFormData) => {
      try {
        sessionStorage.setItem(draftKey, JSON.stringify(value));
      } catch (err) {
        console.error("Failed to save draft", err);
      }
    });

    return () => subscription.unsubscribe();
  }, [id, form]);
}
