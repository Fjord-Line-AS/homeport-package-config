import { CheckCircle2, AlertCircle, Circle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type ValidationStatus = "complete" | "partial" | "incomplete" | "error";

interface ValidationIndicatorProps {
  status: ValidationStatus;
  tooltip?: string;
}

export function ValidationIndicator({
  status,
  tooltip,
}: ValidationIndicatorProps) {
  const getIcon = () => {
    switch (status) {
      case "complete":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case "partial":
        return <Circle className="h-4 w-4 text-amber-500" />;
      case "incomplete":
        return <Circle className="h-4 w-4 text-gray-300" />;
      case "error":
        return <AlertCircle className="h-4 w-4 text-red-500" />;
    }
  };

  if (!tooltip) {
    return getIcon();
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span>{getIcon()}</span>
        </TooltipTrigger>
        <TooltipContent>
          <p>{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
