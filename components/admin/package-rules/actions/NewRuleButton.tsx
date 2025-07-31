"use client";

import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createNewPackageRuleDraft } from "@/app/actions/packageRules/createNewPackageRuleDraft";

export function NewRuleButton() {
  const router = useRouter();

  async function handleClick() {
    const id = await createNewPackageRuleDraft();
    router.push(`/admin/package-rules/${id}`);
  }

  return (
    <Button
      onClick={handleClick}
      className="bg-white cursor-pointer text-brand-red-600 hover:bg-white/90 shadow-lg hover:shadow-xl transition-all duration-200 px-6 py-3 text-lg"
    >
      <Plus className="h-5 w-5 mr-2" />
      New Rule
    </Button>
  );
}
