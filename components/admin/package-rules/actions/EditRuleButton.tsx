import { Button } from "@/components/ui/button";
import { Edit2 } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {
  ruleId: string;
  isDraft?: boolean;
  hasDraft?: boolean;
};

const EditRuleButton = ({ ruleId, isDraft, hasDraft }: Props) => {
  return (
    <Button
      variant="outline"
      className="border-brand-red-200 text-brand-red-700 hover:bg-brand-red-50 hover:border-brand-red-300 transition-all duration-200 group-hover:shadow-md"
    >
      <Edit2 className="h-4 w-4 mr-2" />
      <Link href={`/admin/package-rules/${ruleId}`}>
        {isDraft ? "Edit Draft" : "Edit Rule"}
      </Link>
    </Button>
  );
};

export default EditRuleButton;
