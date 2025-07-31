import { useEffect, useTransition } from "react";
import { debounce } from "lodash-es";
import { type UseFormReturn } from "react-hook-form";
import type { PackageRuleFormData } from "@/lib/validation";
import { savePackageRuleDraft } from "@/app/actions/packageRules/savePackageRuleDraft";
import { shouldSkipNextDraftWrite } from "@/lib/formSync";

export function useSanityDraftSync(
  id: string,
  form: UseFormReturn<PackageRuleFormData>,
  enabled: boolean = true
) {
  const [, startTransition] = useTransition();

  useEffect(() => {
    if (!enabled || !id) return;

    const persistDraft = debounce((data: PackageRuleFormData) => {
      if (shouldSkipNextDraftWrite()) {
        console.log("[DraftSync] Skipping this write", data);
        return;
      }

      startTransition(() => {
        console.log("[DraftSync] Writing to draft:", data);
        savePackageRuleDraft(id, data);
      });
    }, 400);

    const subscription = form.watch((value) => {
      persistDraft(value as PackageRuleFormData);
    });

    return () => {
      subscription.unsubscribe();
      persistDraft.cancel();
    };
  }, [form, id, enabled]);
}
