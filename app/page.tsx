import Link from "next/link";
import {
  Package,
  Settings,
  Users,
  Ship,
  ArrowRight,
  Sparkles,
  Target,
  MapPin,
  Calendar,
  Database,
  FileText,
  Layers,
  GitBranch,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { getSanityStats } from "./actions/stats/getSanityStats";

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return (
    Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  );
}

function formatNumber(num: number): string {
  return new Intl.NumberFormat().format(num);
}

function getUsagePercentage(value: number, limit: number): number {
  if (limit === 0) return 0;
  return Math.min((value / limit) * 100, 100);
}

function getUsageColor(percentage: number): string {
  if (percentage >= 90) return "text-red-600";
  if (percentage >= 75) return "text-yellow-600";
  return "text-green-600";
}

export default async function Home() {
  const stats = await getSanityStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-seashell-50 via-white to-brand-seashell-100">
      {/* Beautiful Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-red-600/80 to-brand-ocean-500/60" />
        <div className="absolute inset-0 bg-white/10" />
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:20px_20px] opacity-30" />

        <div className="relative z-10 px-8 py-18">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="p-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
                <Package className="h-12 w-12 text-white" />
              </div>
              <div className="p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                <Sparkles className="h-12 w-12 text-white" />
              </div>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Package Configuration
              <span className="block text-3xl md:text-4xl font-normal text-white/90 mt-2">
                Management System
              </span>
            </h1>

            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto leading-relaxed">
              Streamline your travel package management with our comprehensive
              configuration system. Create, manage, and optimize package rules
              with ease.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-white text-brand-red-600 hover:bg-white/90 shadow-lg hover:shadow-xl transition-all duration-200 px-8 py-4 text-lg font-semibold"
              >
                <Link href="/admin/package-rules">
                  <Package className="h-5 w-5 mr-2" />
                  Go to Admin Dashboard
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Link>
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 px-8 py-4 text-lg"
              >
                <Settings className="h-5 w-5 mr-2" />
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Dataset Usage Dashboard */}
      <div className="px-8 -mt-12 relative z-20">
        <div className="max-w-6xl mx-auto">
          {/* Dataset Stats Overview */}
          <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-brand-lg mb-8">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-brand-ocean-100 rounded-lg">
                  <Database className="h-6 w-6 text-brand-ocean-600" />
                </div>
                <div>
                  <CardTitle className="text-2xl">
                    Dataset Usage Overview
                  </CardTitle>
                  <CardDescription>
                    Monitor your Sanity dataset limits and usage
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {/* Documents */}
                <Card className="border-l-4 border-l-blue-500">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <FileText className="h-5 w-5 text-blue-600" />
                      <span className="font-medium">Documents</span>
                    </div>
                    <div className="text-2xl font-bold text-brand-night-900 mb-1">
                      {formatNumber(stats.documents.count.value)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      of {formatNumber(stats.documents.count.limit)} limit
                    </div>
                    <Progress
                      value={getUsagePercentage(
                        stats.documents.count.value,
                        stats.documents.count.limit
                      )}
                      className="mt-2 h-2"
                    />
                  </CardContent>
                </Card>

                {/* Fields */}
                <Card className="border-l-4 border-l-yellow-500">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <Layers className="h-5 w-5 text-yellow-600" />
                      <span className="font-medium">Fields</span>
                    </div>
                    <div className="text-2xl font-bold text-brand-night-900 mb-1">
                      {formatNumber(stats.fields.count.value)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      of {formatNumber(stats.fields.count.limit)} limit
                    </div>
                    <Progress
                      value={getUsagePercentage(
                        stats.fields.count.value,
                        stats.fields.count.limit
                      )}
                      className="mt-2 h-2"
                    />
                    <Badge
                      variant="secondary"
                      className={`mt-2 ${getUsageColor(
                        getUsagePercentage(
                          stats.fields.count.value,
                          stats.fields.count.limit
                        )
                      )}`}
                    >
                      {getUsagePercentage(
                        stats.fields.count.value,
                        stats.fields.count.limit
                      ).toFixed(1)}
                      % used
                    </Badge>
                  </CardContent>
                </Card>

                {/* JSON Size */}
                <Card className="border-l-4 border-l-green-500">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <Database className="h-5 w-5 text-green-600" />
                      <span className="font-medium">JSON Size</span>
                    </div>
                    <div className="text-2xl font-bold text-brand-night-900 mb-1">
                      {formatBytes(stats.documents.jsonSizeSum.value)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      of {formatBytes(stats.documents.jsonSizeSum.limit)} limit
                    </div>
                    <Progress
                      value={getUsagePercentage(
                        stats.documents.jsonSizeSum.value,
                        stats.documents.jsonSizeSum.limit
                      )}
                      className="mt-2 h-2"
                    />
                  </CardContent>
                </Card>

                {/* Releases */}
                <Card className="border-l-4 border-l-purple-500">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <GitBranch className="h-5 w-5 text-purple-600" />
                      <span className="font-medium">Releases</span>
                    </div>
                    <div className="text-2xl font-bold text-brand-night-900 mb-1">
                      {formatNumber(stats.releases.count.value)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      of {formatNumber(stats.releases.count.limit)} limit
                    </div>
                    <Progress
                      value={getUsagePercentage(
                        stats.releases.count.value,
                        stats.releases.count.limit
                      )}
                      className="mt-2 h-2"
                    />
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          {/* Features Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {/* Feature Cards */}
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-brand-lg hover:shadow-brand-lg hover:scale-105 transition-all duration-300 group">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto p-4 bg-gradient-to-r from-brand-red-500 to-brand-red-600 rounded-2xl shadow-lg mb-4 group-hover:shadow-xl transition-shadow duration-300">
                  <Target className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl text-brand-night-900">
                  Journey Configuration
                </CardTitle>
                <CardDescription className="text-brand-night-600">
                  Configure journey types, routes, and basic package settings
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Badge
                  variant="secondary"
                  className="bg-brand-red-100 text-brand-red-800 border-brand-red-200"
                >
                  Core Feature
                </Badge>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-ocean-lg hover:shadow-ocean-lg hover:scale-105 transition-all duration-300 group">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto p-4 bg-gradient-to-r from-brand-ocean-500 to-brand-ocean-600 rounded-2xl shadow-lg mb-4 group-hover:shadow-xl transition-shadow duration-300">
                  <MapPin className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl text-brand-night-900">
                  Port Management
                </CardTitle>
                <CardDescription className="text-brand-night-600">
                  Manage departure and arrival ports with flexible routing
                  options
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Badge
                  variant="secondary"
                  className="bg-brand-ocean-100 text-brand-ocean-800 border-brand-ocean-200"
                >
                  Advanced
                </Badge>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-glow hover:shadow-glow hover:scale-105 transition-all duration-300 group">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto p-4 bg-gradient-to-r from-brand-glow-500 to-brand-glow-600 rounded-2xl shadow-lg mb-4 group-hover:shadow-xl transition-shadow duration-300">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl text-brand-night-900">
                  Traveler Settings
                </CardTitle>
                <CardDescription className="text-brand-night-600">
                  Configure passenger limits, age restrictions, and room
                  settings
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Badge
                  variant="secondary"
                  className="bg-brand-glow-100 text-brand-glow-800 border-brand-glow-200"
                >
                  Essential
                </Badge>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card className="bg-gradient-to-r from-brand-seashell-50 to-white border-0 shadow-lg">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h3 className="text-2xl font-bold text-brand-night-900 mb-2">
                    Ready to get started?
                  </h3>
                  <p className="text-brand-night-600">
                    Access the admin dashboard to create and manage your package
                    rules
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    asChild
                    className="bg-brand-red-500 hover:bg-brand-red-600 text-white shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    <Link href="/admin/package-rules">
                      <Package className="h-4 w-4 mr-2" />
                      Package Rules
                    </Link>
                  </Button>

                  <Button
                    asChild
                    variant="outline"
                    className="border-brand-ocean-200 text-brand-ocean-700 hover:bg-brand-ocean-50 bg-transparent"
                  >
                    <Link href="/admin/package-rules/new">
                      <Sparkles className="h-4 w-4 mr-2" />
                      Create New Rule
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-24 py-12 bg-brand-night-900 text-white">
        <div className="max-w-6xl mx-auto px-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Package className="h-6 w-6 text-brand-red-400" />
            <span className="text-lg font-semibold">
              Package Configuration System
            </span>
          </div>
          <p className="text-brand-night-400">
            Streamline your travel package management with powerful
            configuration tools
          </p>
        </div>
      </footer>
    </div>
  );
}
