"use client";

import { useEffect, useState } from "react";
import type { PackageRuleFormData } from "@/lib/validation";

export function usePackageRuleDraftsMap(ids: string[]) {
  const [drafts, setDrafts] = useState<Record<string, PackageRuleFormData>>({});

  useEffect(() => {
    const map: Record<string, PackageRuleFormData> = {};

    ids.forEach((id) => {
      try {
        const raw = sessionStorage.getItem(`draft:package-rule:${id}`);
        if (raw) {
          const parsed = JSON.parse(raw) as PackageRuleFormData;
          map[id] = parsed;
        }
      } catch (e) {
        console.warn("Invalid draft for", id);
      }
    });

    setDrafts(map);
  }, [ids]);

  return drafts;
}
