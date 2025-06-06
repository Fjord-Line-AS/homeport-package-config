import { Suspense } from "react";
import Link from "next/link";
import { Plus, Package, TrendingUp, Clock, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getPackageRules } from "@/lib/sanity-mock";
import { PackageRulesSearch } from "@/components/admin/package-rules-search";

async function PackageRulesList() {
  const rules = await getPackageRules();

  return (
    <div className="grid gap-6">
      {rules.map((rule, index) => (
        <Card
          key={rule._id}
          className="group hover:shadow-brand-lg transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm overflow-hidden hover:scale-[1.02]"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-brand-seashell-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <CardHeader className="relative pb-3">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-gradient-to-r from-brand-red-500 to-brand-red-600 rounded-xl shadow-lg">
                  <Package className="h-6 w-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-xl text-brand-night-900 group-hover:text-brand-red-700 transition-colors">
                    {rule.name}
                  </CardTitle>
                  {rule.description && (
                    <CardDescription className="mt-2 text-brand-night-600 leading-relaxed">
                      {rule.description}
                    </CardDescription>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {rule.bundlePackageRules.journeyType && (
                  <Badge
                    variant="outline"
                    className="border-brand-ocean-200 text-brand-ocean-700 bg-brand-ocean-50 hover:bg-brand-ocean-100 transition-colors"
                  >
                    {rule.bundlePackageRules.journeyType}
                  </Badge>
                )}
                {rule.bundlePackageRules.cabinInfo?.cabins &&
                rule.bundlePackageRules.cabinInfo.cabins.length > 0 ? (
                  <Badge
                    variant="default"
                    className="bg-gradient-to-r from-brand-glow-500 to-brand-glow-600 text-white border-0 shadow-sm"
                  >
                    ✓ Cabins Configured
                  </Badge>
                ) : (
                  <Badge
                    variant="secondary"
                    className="bg-brand-night-100 text-brand-night-700 border-brand-night-200"
                  >
                    No Cabin Config
                  </Badge>
                )}
              </div>
            </div>
          </CardHeader>

          <CardContent className="relative pt-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="flex items-center gap-2 text-sm text-brand-night-600">
                <Users className="h-4 w-4 text-brand-ocean-500" />
                <span>
                  {rule.bundlePackageRules.personConfiguration
                    ?.minTotalTravelers || 0}
                  -
                  {rule.bundlePackageRules.personConfiguration
                    ?.maxTotalTravelers || "∞"}{" "}
                  travelers
                </span>
              </div>

              <div className="flex items-center gap-2 text-sm text-brand-night-600">
                <Clock className="h-4 w-4 text-brand-glow-600" />
                <span>
                  {rule.bundlePackageRules.journeyDuration || "Not set"} hours
                </span>
              </div>

              <div className="flex items-center gap-2 text-sm text-brand-night-600">
                <TrendingUp className="h-4 w-4 text-brand-red-500" />
                <span>
                  Updated {new Date(rule._updatedAt).toLocaleDateString()}
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
                <Link href={`/admin/package-rules/${rule._id}`}>Edit Rule</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default function PackageRulesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-seashell-50 via-white to-brand-seashell-100">
      {/* Beautiful Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-red-600 via-brand-red-500 to-brand-ocean-500 opacity-90" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent" />
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:20px_20px]" />
        </div>

        <div className="relative z-10 p-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="p-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
                <Package className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">
                  Package Rules
                </h1>
                <p className="text-white/80 text-lg">
                  Manage travel package configuration rules
                </p>
              </div>
            </div>

            <Button
              asChild
              className="bg-white text-brand-red-600 hover:bg-white/90 shadow-lg hover:shadow-xl transition-all duration-200 px-6 py-3 text-lg"
            >
              <Link href="/admin/package-rules/new">
                <Plus className="h-5 w-5 mr-2" />
                New Rule
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="px-8 -mt-4 relative z-20">
        {/* Search Card */}
        <Card className="mb-8 bg-white/90 backdrop-blur-sm border-0 shadow-brand">
          <CardContent className="p-6">
            <PackageRulesSearch />
          </CardContent>
        </Card>

        {/* Rules List */}
        <Suspense
          fallback={
            <div className="grid gap-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <Card key={i} className="animate-pulse border-0 bg-white/60">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 bg-brand-seashell-200 rounded-xl" />
                      <div className="space-y-2 flex-1">
                        <div className="h-6 bg-brand-seashell-200 rounded w-1/3" />
                        <div className="h-4 bg-brand-seashell-200 rounded w-2/3" />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-4 bg-brand-seashell-200 rounded w-1/2" />
                  </CardContent>
                </Card>
              ))}
            </div>
          }
        >
          <PackageRulesList />
        </Suspense>
      </div>
    </div>
  );
}
