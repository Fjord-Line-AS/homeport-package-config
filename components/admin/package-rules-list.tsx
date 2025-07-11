"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Package, TrendingUp, Users, Clock, Pencil } from "lucide-react";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PackageRule_v2 } from "@fjordline/sanity-types";
import type { PackageRuleFormData } from "@/lib/validation";

interface Props {
  packages: PackageRule_v2[];
}

export function PackageRulesListClient({ packages }: Props) {
  const [drafts, setDrafts] = useState<Record<string, PackageRuleFormData>>({});

  useEffect(() => {
    const map: Record<string, PackageRuleFormData> = {};

    packages.forEach((pkg) => {
      const key = `draft:package-rule:${pkg._id}`;
      try {
        const raw = localStorage.getItem(key);
        if (raw) {
          map[pkg._id] = JSON.parse(raw);
        }
      } catch (e) {
        console.warn("Could not parse draft for", pkg._id);
      }
    });

    setDrafts(map);
  }, [packages]);

  return (
    <div className="grid gap-6">
      {packages.map((pck) => {
        const draft = drafts[pck._id];
        const hasDraft = !!draft;

        const name = draft?.name || pck.name;
        const description = draft?.description || pck.description;
        const journeyType = draft?.rules?.journeyType || pck.rules?.journeyType;
        const minTravelers =
          draft?.rules?.personConfiguration?.minTotalTravelers ??
          pck.rules?.personConfiguration?.minTotalTravelers ??
          0;

        const maxTravelers =
          draft?.rules?.personConfiguration?.maxTotalTravelers ??
          pck.rules?.personConfiguration?.maxTotalTravelers ??
          undefined;

        const duration =
          draft?.rules?.journeyDuration ??
          pck.rules?.journeyDuration ??
          "Not set";

        return (
          <Card
            key={pck._id}
            className="group hover:shadow-brand-lg transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm overflow-hidden hover:scale-[1.002]"
          >
            <CardHeader className="relative pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gradient-to-r from-brand-red-500 to-brand-red-600 rounded-xl shadow-lg">
                    <Package className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl text-brand-night-900 group-hover:text-brand-red-700 transition-colors">
                      {name}
                    </CardTitle>
                    {description && (
                      <CardDescription className="mt-2 text-brand-night-600 leading-relaxed">
                        {description}
                      </CardDescription>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {hasDraft && (
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
                  {minTravelers}–{maxTravelers ?? "∞"} travelers
                </div>

                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-brand-glow-600" />
                  <span>{duration} hours</span>
                </div>

                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-brand-red-500" />
                  <span>
                    Updated {new Date(pck._updatedAt).toLocaleDateString()}
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

                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="border-brand-red-200 text-brand-red-700 hover:bg-brand-red-50 hover:border-brand-red-300 transition-all duration-200 group-hover:shadow-md"
                >
                  <Link href={`/admin/package-rules/${pck._id}`}>
                    Edit Rule
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
