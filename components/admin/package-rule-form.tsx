"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  Save,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Circle,
  Lightbulb,
  Info,
  HelpCircle,
  X,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Target,
  MapPin,
  Calendar,
  Users,
  Car,
  Bed,
  Home,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  Accommodation_v2,
  AllowedVehicleCategory,
  PackageRule_v2,
  Port,
  Ship,
  ShipCabin,
  ShipProductCode,
} from "@fjordline/sanity-types";
import { packageRuleSchema, type PackageRuleFormData } from "@/lib/validation";
import {
  validatePackageRule,
  type ValidationSummary,
} from "@/lib/validation-utils";

import { JourneyInfoSection } from "./form-sections/journey-info-section";
import { PortConfigurationSection } from "./form-sections/port-configuration-section";
import { DatesSection } from "./form-sections/dates-section";
import { PersonConfigurationSection } from "./form-sections/person-configuration-section";
import { VehiclesSection } from "./form-sections/vehicles-section";
import { CabinsSection } from "./form-sections/cabins-section";
import { AccommodationSection } from "./form-sections/accommodation-section";

import { clearPackageRuleDraft } from "@/lib/drafts/package-rule-draft";

import { createPackageRule } from "@/app/actions/packageRules/createPackageRule";
import { mapFormDataToSanityDoc } from "@/lib/transform/formToSanity";

import { toast } from "sonner";
import { useSanityDraftSync } from "@/hooks/useSanityDraftSync";
import { setSkipNextDraftWrite } from "@/lib/formSync";
import { publishPackageRule } from "@/app/actions/packageRules/publishPackageRule";

interface ReferenceData {
  ports: Port[];
  shipProductCodes: ShipProductCode[];
  ships: Ship[];
  shipCabins: ShipCabin[];
  vehicleCategories: AllowedVehicleCategory[];
  accommodations: Accommodation_v2[];
}

interface PackageRuleFormProps {
  rule?: PackageRule_v2;
  referenceData: ReferenceData;
}

const tabs = [
  {
    id: "journey",
    label: "Journey Info",
    shortLabel: "Journey",
    description: "Basic journey configuration",
    icon: Target,
    color: "brand-red",
    tips: [
      "Choose a descriptive name that clearly identifies the package",
      "Package codes should be unique and follow your naming convention",
      "Journey type determines available configuration options",
    ],
  },
  {
    id: "ports",
    label: "Port Configuration",
    shortLabel: "Ports",
    description: "Departure and arrival ports",
    icon: MapPin,
    color: "brand-ocean",
    tips: [
      "Default ports are pre-selected for customers",
      "Available ports list shows all selectable options",
      "Enable different return ports for flexible itineraries",
    ],
  },
  {
    id: "dates",
    label: "Dates & Duration",
    shortLabel: "Dates",
    description: "Booking and travel dates",
    icon: Calendar,
    color: "brand-glow",
    tips: [
      "Select weekdays when this package is available",
      "Journey duration affects pricing calculations",
      "Lock dates to prevent customer changes",
    ],
  },
  {
    id: "persons",
    label: "Person Configuration",
    shortLabel: "Persons",
    description: "Traveler and room settings",
    icon: Users,
    color: "brand-ocean",
    tips: [
      "Set minimum travelers to ensure viable bookings",
      "Lock settings to prevent customer modifications",
      "Consider family-friendly age limits for children",
    ],
  },
  {
    id: "vehicles",
    label: "Vehicles",
    shortLabel: "Vehicles",
    description: "Vehicle support settings",
    icon: Car,
    color: "brand-glow",
    tips: [
      "Vehicle categories determine available options",
      "Default values speed up the booking process",
      "Lock settings for packages with included vehicles",
    ],
  },
  {
    id: "cabins",
    label: "Cabins",
    shortLabel: "Cabins",
    description: "Cabin types and pricing",
    icon: Bed,
    color: "brand-ocean",
    tips: [
      "Suggest groups help customers find suitable cabins",
      "Additional costs are added to the base price",
      "Mark cabins as included for all-inclusive packages",
    ],
  },
  {
    id: "accommodation",
    label: "Accommodation",
    shortLabel: "Hotels",
    description: "Hotel and accommodation options",
    icon: Home,
    color: "brand-glow",
    tips: [
      "Configure available accommodation types",
      "Set additional costs for premium options",
      "Lock room details for fixed packages",
    ],
  },
];

export function PackageRuleForm({ rule, referenceData }: PackageRuleFormProps) {
  const router = useRouter();
  const currentActiveTab = localStorage.getItem("activeTab") || "journey";
  const [activeTab, setActiveTab] = useState(currentActiveTab);
  const [isLoading, setIsLoading] = useState(false);
  const [validation, setValidation] = useState<ValidationSummary | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const ruleId = rule?._id ?? "new";

  const form = useForm<PackageRuleFormData>({
    resolver: zodResolver(packageRuleSchema),
    defaultValues: rule?.rules
      ? {
          name: rule.name,
          description: rule.description || "",
          rules: rule.rules,
        }
      : {
          name: "Untitled Rule",
          description: "Get started by configuring your package rule",
          rules: {
            journeyType: "RETURN",
            ports: {
              availablePortsFrom: [],
              availablePortsTo: [],
              allowDifferentReturn: false,
            },
            dates: {
              outbound: { locked: false },
              inbound: { locked: false },
            },
            weekdays: ["monday", "tuesday", "wednesday", "thursday", "friday"],
            personConfiguration: {
              minTotalTravelers: 1,
              maxTotalTravelers: 10,
              roomQuantity: { minQuantity: 1, locked: false },
              adults: { minQuantity: 1, locked: false },
              children: { minQuantity: 0, maxAge: 16, locked: false },
            },
            vehicles: {
              car: { vehicleCategories: [], value: 0, locked: false },
              motorcycle: { vehicleCategories: [], value: 0, locked: false },
              bikes: { value: 0, locked: false },
            },
            allowedVesselsForDeparture: [],
            cabinInfo: {
              outbound: { cabins: [] },
              inbound: { cabins: [] },
              cabins: [],
            },
            accommodationInfo: {
              accommodations: [],
            },
          },
        },
    mode: "onChange",
  });

  // Watch form values and update validation
  useEffect(() => {
    // 🔥 Manual initial validation
    try {
      const initialValues = form.getValues();
      setValidation(validatePackageRule(initialValues));
    } catch {
      toast("Initial validation error", {
        description: "Form has errors on load.",
        className: "!bg-red-500 !text-white",
      });
      setValidation(null);
    }

    const subscription = form.watch((value) => {
      try {
        setValidation(validatePackageRule(value as PackageRuleFormData));
      } catch {
        toast("Validation error", {
          description: "Please fix the errors in the form.",
          className: "!bg-red-500 !text-white",
        });
        setValidation(null);
      }
    });

    return () => subscription.unsubscribe();
  }, [form]);

  // 🧠 Sync form state to Sanity
  let enabledDraftSync = true;
  useSanityDraftSync(ruleId, form, enabledDraftSync);

  const onSubmit = async (data: PackageRuleFormData) => {
    setIsLoading(true);
    const newDoc = mapFormDataToSanityDoc(data);
    try {
      if (rule) {
        await publishPackageRule(rule._id, newDoc);
        toast("Rule updated", {
          description: "Your changes have been saved.",
          className: "!bg-green-500 !text-white",
        });
        router.push("/admin/package-rules"); // 👈 redirect after save
      } else {
        await createPackageRule(newDoc as PackageRule_v2);
        toast("Rule created", {
          description: "New package rule has been created.",
        });
        clearPackageRuleDraft(ruleId);
        router.push("/admin/package-rules");
      }
    } catch (err) {
      toast("Error", {
        description: "Failed to save rule",
        className: "!bg-red-500 !text-white",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleTabChange = (tabId: string) => {
    setSkipNextDraftWrite();
    localStorage.setItem("activeTab", tabId);
    setActiveTab(tabId);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "complete":
        return <CheckCircle2 className="h-4 w-4 text-brand-ocean-600" />;
      case "partial":
        return <Circle className="h-4 w-4 text-brand-glow-600 animate-pulse" />;
      case "incomplete":
        return <Circle className="h-4 w-4 text-brand-night-300" />;
      case "error":
        return (
          <AlertCircle className="h-4 w-4 text-brand-red-600 animate-pulse" />
        );
      default:
        return <Circle className="h-4 w-4 text-brand-night-300" />;
    }
  };

  const renderCurrentSection = () => {
    switch (activeTab) {
      case "journey":
        return <JourneyInfoSection form={form} referenceData={referenceData} />;
      case "ports":
        return (
          <PortConfigurationSection form={form} referenceData={referenceData} />
        );
      case "dates":
        return <DatesSection form={form} />;
      case "persons":
        return <PersonConfigurationSection form={form} />;
      case "vehicles":
        return <VehiclesSection form={form} referenceData={referenceData} />;
      case "cabins":
        return <CabinsSection form={form} referenceData={referenceData} />;
      case "accommodation":
        return (
          <AccommodationSection form={form} referenceData={referenceData} />
        );
      default:
        return null;
    }
  };

  const currentTab = tabs.find((tab) => tab.id === activeTab);
  const currentSection = validation?.sections.find((s) => s.id === activeTab);

  const currentTabIndex = tabs.findIndex((tab) => tab.id === activeTab);
  const canGoPrevious = currentTabIndex > 0;
  const canGoNext = currentTabIndex < tabs.length - 1;

  const goToPrevious = () => {
    if (canGoPrevious) {
      setActiveTab(tabs[currentTabIndex - 1].id);
    }
  };

  const goToNext = () => {
    if (canGoNext) {
      setActiveTab(tabs[currentTabIndex + 1].id);
    }
  };

  // Fix progress calculation to cap at 100%
  const progressPercentage = validation
    ? Math.min(Math.round(validation.overallProgress), 100)
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-seashell-50 via-white to-brand-seashell-100 ">
      {/* Subtle Header with Toned Down Gradient */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-ocean-600 to-brand-ocean-500" />
        <div className="absolute inset-0 bg-white/10" />

        <div className="relative z-10 p-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                onClick={() => router.back()}
                className="cursor-pointer gap-2 text-white hover:text-white hover:bg-white/10 backdrop-blur-sm border border-white/20"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">
                  {rule ? "Edit Package Rule" : "Create Package Rule"}
                </h1>
                <p className="text-white/80">
                  {rule
                    ? `Modify "${rule.name}"`
                    : "Configure a new travel package rule"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {validation && (
                <div className="hidden sm:flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/20">
                  <div className="text-sm text-white/90">
                    <span className="font-medium">
                      {validation.totalCompletedFields}
                    </span>
                    <span className="text-white/70">
                      {" "}
                      of {validation.totalRequiredFields} fields
                    </span>
                  </div>
                  <Badge
                    variant="secondary"
                    className={cn(
                      "bg-white/20 text-white border-white/30 backdrop-blur-sm",
                      validation.isValid &&
                        "bg-brand-ocean-500/80 border-brand-ocean-400"
                    )}
                  >
                    {progressPercentage}% Complete
                  </Badge>
                </div>
              )}

              <Button
                variant="outline"
                size="sm"
                onClick={() => setSidebarOpen(true)}
                className="hidden lg:flex gap-2 bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
              >
                <HelpCircle className="h-4 w-4" />
                Help & Tips
              </Button>

              <Button
                type="submit"
                onClick={form.handleSubmit(onSubmit)}
                disabled={
                  isLoading || !form.formState.isValid || !validation?.isValid
                }
                className="cursor-pointer gap-2 bg-white text-brand-red-600 hover:bg-white/90 shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <Save className="h-4 w-4" />
                {isLoading
                  ? "Publishing..."
                  : !validation?.isValid || !form.formState.isValid
                  ? "Fix Validation Errors"
                  : "Publish Rule"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="px-8 -mt-4 relative z-20 mb-8">
        {/* Fixed Progress Card */}
        {validation && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-brand-ocean-500 rounded-lg">
                      <Sparkles className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-brand-night-900">
                        Configuration Progress
                      </h3>
                      <p className="text-sm text-brand-night-600">
                        Complete all sections to activate your rule
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-brand-night-900">
                      {progressPercentage}%
                    </div>
                    <div className="text-xs text-brand-night-600">Complete</div>
                  </div>
                </div>

                <div className="relative">
                  <Progress
                    value={progressPercentage}
                    className="h-3 bg-brand-seashell-200"
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Simplified Tab Navigation */}
            <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-lg overflow-hidden">
              <CardContent className="p-0">
                <div className="grid grid-cols-1 lg:grid-cols-7 gap-0">
                  {tabs.map((tab, index) => {
                    const section = validation?.sections.find(
                      (s) => s.id === tab.id
                    );
                    const status = section?.status || "incomplete";
                    const isActive = activeTab === tab.id;
                    const Icon = tab.icon;

                    return (
                      <motion.button
                        key={tab.id}
                        type="button"
                        onClick={() => handleTabChange(tab.id)}
                        className={cn(
                          "cursor-pointer relative p-6 text-left transition-all duration-300 group",
                          "border-r border-brand-seashell-200 last:border-r-0",
                          "lg:border-r lg:border-b-0 border-b",
                          isActive && "bg-brand-seashell-50",
                          !isActive && "hover:bg-brand-seashell-25"
                        )}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                      >
                        {/* Simplified Active indicator */}
                        {isActive && (
                          <motion.div
                            layoutId="activeTab"
                            className="absolute inset-x-0 bottom-0 h-1 bg-brand-red-500"
                            initial={false}
                            transition={{
                              type: "spring",
                              stiffness: 500,
                              damping: 30,
                            }}
                          />
                        )}

                        <div className="flex items-center gap-3 mb-2">
                          <div
                            className={cn(
                              "p-2 rounded-lg transition-all duration-300",
                              isActive
                                ? `bg-${tab.color}-500 text-white shadow-md`
                                : "bg-brand-seashell-100 text-brand-night-600 group-hover:bg-brand-seashell-200"
                            )}
                          >
                            <Icon className="h-4 w-4" />
                          </div>
                          {getStatusIcon(status)}
                        </div>

                        <div>
                          <h3
                            className={cn(
                              "font-medium text-sm transition-colors duration-300",
                              isActive
                                ? "text-brand-night-900"
                                : "text-brand-night-700"
                            )}
                          >
                            {tab.shortLabel}
                          </h3>
                          <p className="text-xs text-brand-night-500 mt-1 hidden lg:block">
                            {tab.description}
                          </p>
                        </div>

                        {section && section.errors.length > 0 && (
                          <Badge
                            variant="destructive"
                            className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-brand-red-500 text-white text-xs border-2 border-white"
                          >
                            {section.errors.length}
                          </Badge>
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Error Alert */}
            {currentSection && currentSection.errors.length > 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative"
              >
                <Card className="border-0 bg-brand-red-50 shadow-lg border-l-4 border-brand-red-500">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-brand-red-500 rounded-lg">
                        <AlertCircle className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-brand-red-900 mb-2">
                          Issues in {currentTab?.label}
                        </h3>
                        <ul className="space-y-2">
                          {currentSection.errors.map((error, index) => (
                            <li
                              key={index}
                              className="flex items-start gap-2 text-sm text-brand-red-800"
                            >
                              <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-red-600 flex-shrink-0" />
                              <span>{error}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Main Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-lg overflow-hidden py-0 border-t border-brand-seashell-200">
                  <CardHeader className="bg-brand-seashell-25 border-b border-brand-seashell-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div
                          className={cn(
                            "p-3 rounded-xl shadow-md",
                            `bg-${currentTab?.color}-500`
                          )}
                        >
                          {currentTab?.icon && (
                            <currentTab.icon className="h-6 w-6 text-white" />
                          )}
                        </div>
                        <div>
                          <CardTitle className="text-xl text-brand-night-900">
                            {currentTab?.label}
                          </CardTitle>
                          <CardDescription className="text-brand-night-600">
                            {currentTab?.description}
                          </CardDescription>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {currentSection && (
                          <Badge
                            variant="secondary"
                            className={cn(
                              "px-3 py-1 font-medium",
                              currentSection.status === "complete"
                                ? "bg-brand-ocean-100 text-brand-ocean-800 border-brand-ocean-200"
                                : currentSection.status === "partial"
                                ? "bg-brand-glow-100 text-brand-glow-800 border-brand-glow-200"
                                : currentSection.status === "error"
                                ? "bg-brand-red-100 text-brand-red-800 border-brand-red-200"
                                : "bg-brand-night-100 text-brand-night-700 border-brand-night-200"
                            )}
                          >
                            {currentSection.status === "complete"
                              ? "✓ Complete"
                              : currentSection.status === "partial"
                              ? "⏳ In Progress"
                              : currentSection.status === "error"
                              ? "⚠ Has Issues"
                              : "○ Not Started"}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="p-8">
                    {renderCurrentSection()}
                  </CardContent>

                  {/* Navigation Footer */}
                  <div className="flex items-center justify-between p-6 bg-brand-seashell-25 border-t border-brand-seashell-200">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={goToPrevious}
                      disabled={!canGoPrevious}
                      className="gap-2 border-brand-ocean-200 text-brand-ocean-700 hover:bg-brand-ocean-50 disabled:opacity-50"
                    >
                      <ChevronLeft className="h-4 w-4" />
                      Previous
                    </Button>

                    <div className="flex items-center gap-2">
                      {tabs.map((_, index) => (
                        <div
                          key={index}
                          className={cn(
                            "h-2 w-2 rounded-full transition-all duration-300",
                            index === currentTabIndex
                              ? "bg-brand-red-500 w-6"
                              : index < currentTabIndex
                              ? "bg-brand-ocean-500"
                              : "bg-brand-night-200"
                          )}
                        />
                      ))}
                    </div>

                    <Button
                      type="button"
                      variant="outline"
                      onClick={goToNext}
                      disabled={!canGoNext}
                      className="gap-2 border-brand-ocean-200 text-brand-ocean-700 hover:bg-brand-ocean-50 disabled:opacity-50"
                    >
                      Next
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              </motion.div>
            </AnimatePresence>
          </form>
        </Form>

        {/* Improved Sidebar with Better Readability */}
        <AnimatePresence>
          {sidebarOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-brand-night-900/20 backdrop-blur-sm z-40"
                onClick={() => setSidebarOpen(false)}
              />

              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 30, stiffness: 300 }}
                className="fixed right-0 top-0 h-full w-96 bg-white border-l border-brand-seashell-200 shadow-2xl z-50 overflow-y-auto"
              >
                <div className="p-6 space-y-6">
                  <div className="flex items-center justify-between border-b border-brand-seashell-200 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-brand-glow-500 rounded-lg">
                        <Lightbulb className="h-5 w-5 text-white" />
                      </div>
                      <h2 className="text-lg font-semibold text-brand-night-900">
                        Help & Tips
                      </h2>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSidebarOpen(false)}
                      className="text-brand-night-600 hover:text-brand-night-900"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

                  {validation && (
                    <Card className="border border-brand-ocean-200 bg-brand-ocean-25">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base flex items-center gap-2 text-brand-night-900">
                          <Info className="h-4 w-4 text-brand-ocean-600" />
                          Progress Overview
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm text-brand-night-800">
                            <span>Overall Progress</span>
                            <span className="font-bold text-lg text-brand-night-900">
                              {progressPercentage}%
                            </span>
                          </div>
                          <Progress
                            value={progressPercentage}
                            className="h-2 bg-brand-ocean-100"
                          />
                        </div>
                        <div className="text-sm text-brand-night-700">
                          {validation.totalCompletedFields} of{" "}
                          {validation.totalRequiredFields} required fields
                          completed
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {currentTab && (
                    <Card className="border border-brand-glow-200 bg-brand-glow-25">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base flex items-center gap-2 text-brand-night-900">
                          <Lightbulb className="h-4 w-4 text-brand-glow-600" />
                          Tips for {currentTab.label}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-3">
                          {currentTab.tips.map((tip, index) => (
                            <li
                              key={index}
                              className="flex items-start gap-2 text-sm"
                            >
                              <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-glow-600 flex-shrink-0" />
                              <span className="text-brand-night-800">
                                {tip}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  )}

                  {/* Quick Navigation */}
                  <Card className="border border-brand-seashell-200">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base text-brand-night-900">
                        Quick Navigation
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {tabs.map((tab) => {
                          const section = validation?.sections.find(
                            (s) => s.id === tab.id
                          );
                          const status = section?.status || "incomplete";
                          const isActive = activeTab === tab.id;

                          return (
                            <Button
                              key={tab.id}
                              type="button"
                              variant={isActive ? "default" : "ghost"}
                              onClick={() => {
                                handleTabChange(tab.id);
                                setSidebarOpen(false);
                              }}
                              className={cn(
                                "w-full justify-start gap-2 h-8 text-sm",
                                isActive &&
                                  "bg-brand-red-500 hover:bg-brand-red-600 text-white",
                                !isActive &&
                                  "text-brand-night-700 hover:bg-brand-seashell-100"
                              )}
                            >
                              {getStatusIcon(status)}
                              <span className="truncate">{tab.label}</span>
                            </Button>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
