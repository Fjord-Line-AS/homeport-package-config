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
import { PackageRulesSearch } from "@/components/admin/package-rules-search";
import { PackageRule_v2 } from "@fjordline/sanity-types";
import { sanityFetch } from "@/lib/sanity/live";
import { PackageRulesListClient } from "@/components/admin/package-rules-list";

export async function getPackageRules(): Promise<PackageRule_v2[]> {
  const sanityFetchConfig = {
    query: `*[_type == "packageRule_v2"] | order(_updatedAt desc)`,
  };
  const res = await sanityFetch(sanityFetchConfig);
  if (!res || !Array.isArray(res.data)) {
    throw new Error("Failed to fetch package rules");
  }
  return res.data;
}

export default async function PackageRulesPage() {
  const packages = await getPackageRules();
  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-seashell-50 via-white to-brand-night-100">
      {/* Beautiful Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-red-600  to-brand-red-700 opacity-90" />
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
          <PackageRulesListClient packages={packages} />
        </Suspense>
      </div>
    </div>
  );
}
