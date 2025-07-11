"use client";

import { deletePackageRule } from "@/app/actions/packageRules/deletePackageRule";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function DeleteRuleButton({ ruleId }: { ruleId: string }) {
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this rule?")) return;
    try {
      await deletePackageRule(ruleId);
      toast("Rule deleted", {
        description: "This rule has been nuked from existence.",
      });
      router.push("/admin/package-rules");
    } catch (error) {
      console.error("Failed to delete:", error);
      toast("Error", {
        description: "Failed to delete the rule.",
      });
    }
  };

  return (
    <Button variant="destructive" onClick={handleDelete}>
      <Trash2 className="h-4 w-4 mr-2" />
      Delete
    </Button>
  );
}
