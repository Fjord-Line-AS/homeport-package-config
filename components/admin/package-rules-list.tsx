"use client";

import { Package, TrendingUp, Users, Clock, Pencil } from "lucide-react";
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

interface Props {
  packages: (PackageRule_v2 & { _originalId: string })[];
}

export function PackageRulesListClient({ packages }: Props) {
  return (
    <div className="grid gap-6 pb-8">
      {packages.map((pkg) => {
        const isDraft = pkg._id !== pkg._originalId;
        const journeyType = pkg.rules?.journeyType;
        const minTravelers =
          pkg.rules?.personConfiguration?.minTotalTravelers ?? 0;
        const maxTravelers =
          pkg.rules?.personConfiguration?.maxTotalTravelers ?? "∞";
        const duration = pkg.rules?.journeyDuration ?? "Not set";

        return (
          <Card
            key={pkg._id}
            className="group border-0 bg-white/80 backdrop-blur-sm overflow-hidden hover:scale-[1.002]"
          >
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

                <div className="flex flex-wrap gap-2">
                  {isDraft && (
                    <Badge className="bg-yellow-200 text-yellow-900 border-yellow-300">
                      <Pencil className="h-3 w-3 mr-1" />
                      Draft
                    </Badge>
                  )}
                  {journeyType && (
                    <Badge
                      variant="outline"
                      className="border-brand-ocean-200 text-brand-ocean-700 bg-brand-ocean-50 hover:bg-brand-ocean-100 transition-colors"
                    >
                      {journeyType}
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
                  <span>
                    Updated {new Date(pkg._updatedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-brand-ocean-500" />
                  <span className="text-xs text-brand-night-500">
                    Active Rule
                  </span>
                </div>

                <div id="action-buttons" className="flex items-center gap-2">
                  <EditRuleButton ruleId={pkg._originalId} isDraft={isDraft} />
                  <DeleteRuleButton
                    ruleId={pkg._originalId}
                    isDraft={isDraft}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
