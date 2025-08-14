import { Suspense } from "react";
import { Package } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import PackageRulesListClient from "@/components/admin/package-rules-list";
import { getPackageRules } from "@/app/actions/packageRules/getPackageRules";
import { NewRuleButton } from "@/components/admin/package-rules/actions/NewRuleButton";

export default async function PackageRulesPage() {
  const packages = await getPackageRules();
  const publishedPackages = await getPackageRules("published");
  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-seashell-50 via-white to-brand-night-100">
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

            <NewRuleButton />
          </div>
        </div>
      </div>

      <div className="px-8 -mt-4 relative z-20">
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
          <PackageRulesListClient
            packages={packages}
            publishedPackages={publishedPackages}
          />
        </Suspense>
      </div>
    </div>
  );
}
