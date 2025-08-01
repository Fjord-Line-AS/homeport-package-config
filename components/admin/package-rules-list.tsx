"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import type { PackageRule_v2 } from "@fjordline/sanity-types";

import { PackageRuleCard } from "./PackageRuleCard";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "../ui/card";

interface Props {
  packages: (PackageRule_v2 & { _originalId: string })[]; // draft or published
  publishedPackages: (PackageRule_v2 & { _originalId: string })[];
}

export function PackageRulesListClient({ packages, publishedPackages }: Props) {
  const [search, setSearch] = useState("");
  const [journeyType, setJourneyType] = useState("");

  const filtered = packages
    .filter((pkg) => {
      const q = search.toLowerCase();
      return (
        pkg.name?.toLowerCase().includes(q) ||
        pkg.description?.toLowerCase().includes(q)
      );
    })
    .filter((pkg) => {
      if (!journeyType || journeyType === "all") return true;
      return pkg.rules?.journeyType === journeyType;
    });

  return (
    <>
      <Card className="mb-8 bg-white/90 backdrop-blur-sm border-0 shadow-brand">
        <CardContent className="p-6">
          <div className="flex gap-4 flex-col md:flex-row md:items-center md:justify-between">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search rules by name or description..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={journeyType} onValueChange={setJourneyType}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Journey Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="one-way">One Way</SelectItem>
                <SelectItem value="return">Return</SelectItem>
                <SelectItem value="multi-leg">Multi Leg</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6">
        {packages.length > 0 ? (
          <div className="grid gap-6 pb-8">
            {packages
              .filter((pkg) => {
                const q = search.toLowerCase();
                return (
                  pkg.name?.toLowerCase().includes(q) ||
                  pkg.description?.toLowerCase().includes(q)
                );
              })
              .filter((pkg) => {
                if (!journeyType || journeyType === "all") return true;
                return pkg.rules?.journeyType === journeyType;
              })
              .map((pkg) => {
                const isDraft = pkg._originalId.startsWith("drafts.");
                const hasDraft = packages.some(
                  (p) => p._originalId === pkg._originalId
                );
                const hasPublished = publishedPackages.some(
                  (p) => p._id === pkg._id
                );

                return (
                  <PackageRuleCard
                    key={pkg._id}
                    pkg={pkg}
                    hasDraft={hasDraft}
                    isDraft={isDraft}
                    hasPublished={hasPublished}
                  />
                );
              })}
          </div>
        ) : (
          <div className="text-sm text-brand-night-600 px-2 py-4">
            No matching rules found.
          </div>
        )}
      </div>
    </>
  );
}
