"use client";

import {
  Package,
  TrendingUp,
  Users,
  Clock,
  Pencil,
  CheckCircle,
  XCircle,
  AlertTriangle,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DeleteRuleButton } from "./package-rules/actions/DeleteRuleButton";
import EditRuleButton from "./package-rules/actions/EditRuleButton";
import type { PackageRule_v2 } from "@fjordline/sanity-types";
import { ValidationSummary } from "@/lib/validation-utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { cn } from "@/lib/utils";

interface Props {
  pkg: PackageRule_v2 & { _originalId: string };
  isDraft: boolean;
  hasDraft: boolean;
  hasPublished: boolean;
  validation: ValidationSummary;
}

export function PackageRuleCard({
  pkg,
  isDraft,
  hasDraft,
  hasPublished,
  validation,
}: Props) {
  const journeyType = pkg.rules?.journeyType;
  const minTravelers = pkg.rules?.personConfiguration?.minTotalTravelers ?? 0;
  const maxTravelers = pkg.rules?.personConfiguration?.maxTotalTravelers ?? "∞";
  const duration = pkg.rules?.journeyDuration ?? "Not set";

  // Calculate error information
  const sectionsWithErrors = validation.sections.filter(
    (section) => section.errors.length > 0
  );
  const totalErrors = sectionsWithErrors.reduce(
    (sum, section) => sum + section.errors.length,
    0
  );
  const hasErrors = totalErrors > 0;

  return (
    <Card className="group border-0 bg-white/80 backdrop-blur-sm overflow-hidden hover:scale-[1.002] transition-all duration-300">
      <CardHeader className="relative pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-gradient-to-r from-brand-red-500 to-brand-red-600 rounded-xl shadow-lg">
              <Package className="h-6 w-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-xl text-brand-night-900 group-hover:text-brand-red-700 transition-colors">
                {pkg.name}
              </CardTitle>
              {pkg.description && (
                <CardDescription className="mt-2 text-brand-night-600 leading-relaxed">
                  {pkg.description}
                </CardDescription>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-2 items-start">
            {/* Error Badge with Tooltip */}
            {hasErrors && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Badge
                      className={cn(
                        "bg-red-500 text-white border-red-600 shadow-lg",
                        "animate-pulse hover:animate-none cursor-help",
                        "relative overflow-hidden"
                      )}
                    >
                      {/* Glowing effect */}
                      <div className="absolute inset-0 bg-red-400 opacity-50 animate-ping rounded-full" />
                      <XCircle className="h-3 w-3 mr-1 relative z-10" />
                      <span className="relative z-10">
                        {totalErrors} Error{totalErrors > 1 ? "s" : ""}
                      </span>
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent
                    side="left"
                    className="max-w-sm p-4 bg-red-50 border-red-200 text-red-900"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 font-semibold text-red-800">
                        <AlertTriangle className="h-4 w-4" />
                        Validation Errors
                      </div>

                      {sectionsWithErrors.map((section) => (
                        <div key={section.name} className="space-y-1">
                          <div className="font-medium text-red-800 text-sm">
                            {section.name}:
                          </div>
                          <ul className="space-y-1 ml-2">
                            {section.errors.map((error, index) => (
                              <li
                                key={index}
                                className="text-xs text-red-700 flex items-start gap-1"
                              >
                                <div className="w-1 h-1 bg-red-500 rounded-full mt-1.5 flex-shrink-0" />
                                <span>{error}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}

                      <div className="pt-2 border-t border-red-200 text-xs text-red-600">
                        Click "Edit" to fix these issues
                      </div>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}

            {/* Status Badges */}
            {isDraft && (
              <Badge className="bg-yellow-200 text-yellow-900 border-yellow-300">
                <Pencil className="h-3 w-3 mr-1" />
                Draft
              </Badge>
            )}

            {hasPublished && !hasErrors && (
              <Badge className="bg-green-200 text-green-900 border-green-300">
                <CheckCircle className="h-3 w-3 mr-1" />
                Published
              </Badge>
            )}

            {journeyType && (
              <Badge
                variant="outline"
                className="border-brand-ocean-200 text-brand-ocean-700 bg-brand-ocean-50 hover:bg-brand-ocean-100 transition-colors"
              >
                {pkg.rules?.journeyType}
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="relative pt-0">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 text-sm text-brand-night-600">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-brand-ocean-500" />
            {minTravelers}–{maxTravelers} travelers
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-brand-glow-600" />
            <span>{duration} hours</span>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-brand-red-500" />
            <span>Updated {new Date(pkg._updatedAt).toLocaleDateString()}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div
                className={`h-2 w-2 rounded-full ${
                  hasPublished ? "bg-brand-ocean-500" : "bg-brand-seashell-500"
                }`}
              />
              <span className="text-xs text-brand-night-500">
                {hasPublished ? "Active Rule" : "Inactive Rule"}
              </span>
            </div>

            {/* Progress Indicator */}
            <div className="flex items-center gap-2">
              <div
                className={cn(
                  "text-xs px-2 py-1 rounded-full font-medium",
                  validation.overallProgress === 100
                    ? "bg-green-100 text-green-800"
                    : validation.overallProgress >= 75
                    ? "bg-blue-100 text-blue-800"
                    : validation.overallProgress >= 50
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-red-100 text-red-800"
                )}
              >
                {Math.round(validation.overallProgress)}% complete
              </div>
            </div>
          </div>

          <div id="action-buttons" className="flex items-center gap-2">
            <EditRuleButton
              ruleId={pkg._originalId}
              isDraft={isDraft}
              hasDraft={hasDraft}
            />
            <DeleteRuleButton ruleId={pkg._originalId} isDraft={isDraft} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
