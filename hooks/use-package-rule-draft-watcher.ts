import { useEffect } from "react";
import type { PackageRuleFormData } from "@/lib/validation";

export function usePackageRuleDraftWatcher(
  id: string,
  form: { watch: any },
  skipNextRef?: React.RefObject<boolean>
) {
  useEffect(() => {
    const draftKey = `draft:package-rule:${id}`;

    const subscription = form.watch((value: PackageRuleFormData) => {
      if (skipNextRef?.current) {
        skipNextRef.current = false;
        return;
      }

      try {
        localStorage.setItem(draftKey, JSON.stringify(value));
      } catch (err) {
        console.error("Failed to save draft", err);
      }
    });

    return () => subscription.unsubscribe();
  }, [id, form, skipNextRef]);
}
