"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import type {
  PackageRule_v2,
  BundlePackageRules,
} from "@fjordline/sanity-types";

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
import { AnimatePresence, motion } from "framer-motion";
import { mapSanityDocToFormData } from "@/lib/transform/formToSanity";
import { validatePackageRule } from "@/lib/validation-utils";

interface Props {
  packages: (PackageRule_v2 & { _originalId: string })[]; // draft or published
  publishedPackages: (PackageRule_v2 & { _originalId: string })[];
}

type TJourneyType = BundlePackageRules["journeyType"];

const PackageRulesListClient = ({ packages, publishedPackages }: Props) => {
  const [search, setSearch] = useState("");
  const [journeyType, setJourneyType] = useState("");

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
            <Select
              value={journeyType}
              onValueChange={(value) =>
                setJourneyType(
                  (value ?? "") === "all" ? "" : value ?? ("" as TJourneyType)
                )
              }
            >
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Journey Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="ONEWAY">One Way</SelectItem>
                <SelectItem value="RETURN">Return</SelectItem>
                <SelectItem value="ONEWAY_RETURN">One Way / Return</SelectItem>
                <SelectItem value="CRUISE">Cruise</SelectItem>
                <SelectItem value="PACKAGE">Package</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6">
        {packages.length > 0 ? (
          <AnimatePresence mode="popLayout">
            <motion.div className="grid gap-6 grid-cols-2 pb-8" layout>
              {packages
                .filter((pkg) => {
                  const q = search.toLowerCase();
                  return (
                    pkg.name?.toLowerCase().includes(q) ||
                    pkg.description?.toLowerCase().includes(q)
                  );
                })
                .filter((pkg) => {
                  if (!journeyType) return true;
                  return pkg.rules?.journeyType === journeyType;
                })
                .map((pkg, index) => {
                  const isDraft = pkg._originalId.startsWith("drafts.");
                  const hasDraft = packages.some(
                    (p) => p._originalId === pkg._originalId
                  );
                  const hasPublished = publishedPackages.some(
                    (p) => p._id === pkg._id
                  );

                  const formData = mapSanityDocToFormData(pkg);
                  const validation = validatePackageRule(formData);

                  return (
                    <motion.div
                      key={pkg._id}
                      layout
                      initial={{ opacity: 0, y: 20, scale: 0.95 }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        transition: {
                          duration: 0.4,
                          delay: index * 0.1,
                          ease: [0.25, 0.46, 0.45, 0.94],
                        },
                      }}
                      exit={{
                        opacity: 0,
                        y: -20,
                        scale: 0.95,
                        transition: {
                          duration: 0.3,
                          ease: [0.25, 0.46, 0.45, 0.94],
                        },
                      }}
                      whileHover={{
                        scale: 1.002,
                        transition: { duration: 0.2 },
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <PackageRuleCard
                        pkg={pkg}
                        hasDraft={hasDraft}
                        isDraft={isDraft}
                        hasPublished={hasPublished}
                        validation={validation}
                      />
                    </motion.div>
                  );
                })}
            </motion.div>
          </AnimatePresence>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm text-brand-night-600 px-2 py-4"
          >
            No matching rules found.
          </motion.div>
        )}
      </div>
    </>
  );
};

export default PackageRulesListClient;
