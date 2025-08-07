"use client";

import { type UseFormReturn, useFieldArray } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Trash2,
  Globe,
  Languages,
  DollarSign,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useState } from "react";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { MultiSelect, type Option } from "@/components/ui/multi-select";
import type { PackageRuleFormData } from "@/lib/validation";
import {
  Accommodation_v2,
  ACCOMMODATION_WITH_TRANSLATIONS_Result,
  AllowedVehicleCategory,
  Port,
  Ship,
  ShipCabin,
  ShipProductCode,
} from "@fjordline/sanity-types";
import { setSkipNextDraftWrite } from "@/lib/formSync";
import { removeFieldArrayItem } from "@/lib/form/removeFieldArrayItem";

interface ReferenceData {
  ports: Port[];
  shipProductCodes: ShipProductCode[];
  ships: Ship[];
  shipCabins: ShipCabin[];
  vehicleCategories: AllowedVehicleCategory[];
  accommodations: ACCOMMODATION_WITH_TRANSLATIONS_Result[];
}

interface AccommodationSectionProps {
  form: UseFormReturn<PackageRuleFormData>;
  referenceData: ReferenceData;
}

export function AccommodationSection({
  form,
  referenceData,
}: AccommodationSectionProps) {
  const { fields, append } = useFieldArray({
    control: form.control,
    name: "rules.accommodationInfo.accommodations",
  });

  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());

  const addAccommodation = () => {
    setSkipNextDraftWrite();
    append({
      additonalCost: 0,
      accommodationType: { _ref: "", _type: "reference" },
      roomDetails: {
        value: 1,
        locked: false,
      },
      _type: "accommodation",
      _key: `accommodation-${Date.now()}`,
    });
    setSkipNextDraftWrite();
  };

  const getTranslationGroupIds = (
    acc: ACCOMMODATION_WITH_TRANSLATIONS_Result | null
  ) => {
    if (!acc) return [];
    return [
      acc._id,
      ...(acc._translations?.map((t) => (t ? t._id : "")) ?? []),
    ].sort();
  };

  const toggleGroupExpansion = (groupKey: string) => {
    const newExpanded = new Set(expandedGroups);
    if (newExpanded.has(groupKey)) {
      newExpanded.delete(groupKey);
    } else {
      newExpanded.add(groupKey);
    }
    setExpandedGroups(newExpanded);
  };

  // Convert accommodations to options for the searchable dropdown
  const accommodationOptions: Option[] = referenceData.accommodations
    .filter((acc) => acc)
    .map((acc) => ({
      label: acc?.title || "Untitled",
      value: acc?._id || "",
      description: `${acc?.language?.toUpperCase() || "N/A"} • ${
        acc?._type || "Accommodation"
      }`,
    }));

  // Group accommodations by translation groups
  const groupedAccommodations = fields.reduce((groups, field, index) => {
    const refId = field.accommodationType?._ref;

    if (!refId) {
      const ungroupedKey = `ungrouped-${index}`;
      groups[ungroupedKey] = [{ field, index, acc: null, groupIds: [] }];
      return groups;
    }

    const acc =
      referenceData.accommodations.find((a) => a && a._id === refId) ?? null;
    const groupIds = getTranslationGroupIds(acc);
    const groupKey = groupIds[0] || refId;

    if (!groups[groupKey]) {
      groups[groupKey] = [];
    }
    groups[groupKey].push({ field, index, acc, groupIds });
    return groups;
  }, {} as Record<string, Array<{ field: any; index: number; acc: any; groupIds: string[] }>>);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Accommodation Options</CardTitle>
              <CardDescription>
                Configure available accommodation types and pricing
              </CardDescription>
            </div>
            <Button onClick={addAccommodation} variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Accommodation
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <AnimatePresence>
            {Object.entries(groupedAccommodations).map(
              ([groupKey, groupItems]) => {
                const isTranslationGroup =
                  groupItems.length > 1 && groupItems[0].acc;
                const primaryItem = groupItems[0];
                const isUngrouped = !primaryItem.field.accommodationType?._ref;
                const isExpanded = expandedGroups.has(groupKey);

                return (
                  <motion.div
                    key={groupKey}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2 }}
                    className="mb-4"
                  >
                    <Card
                      className={
                        isTranslationGroup ? "border-l-4 border-l-blue-500" : ""
                      }
                    >
                      {/* Header */}
                      <CardHeader className="pb-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div>
                              <CardTitle className="text-base">
                                {isUngrouped
                                  ? `New Accommodation`
                                  : primaryItem.acc?.title ||
                                    `Accommodation ${primaryItem.index + 1}`}
                              </CardTitle>
                              {isTranslationGroup && (
                                <div className="flex items-center gap-2 mt-1">
                                  <Badge
                                    variant="secondary"
                                    className="text-xs"
                                  >
                                    <Languages className="w-3 h-3 mr-1" />
                                    {groupItems.length} languages
                                  </Badge>
                                  <div className="flex gap-1">
                                    {groupItems.slice(0, 3).map((item) => (
                                      <Badge
                                        key={item.index}
                                        variant="outline"
                                        className="text-xs px-1.5 py-0.5"
                                      >
                                        {item.acc?.language?.toUpperCase() ||
                                          "N/A"}
                                      </Badge>
                                    ))}
                                    {groupItems.length > 3 && (
                                      <Badge
                                        variant="outline"
                                        className="text-xs px-1.5 py-0.5"
                                      >
                                        +{groupItems.length - 3}
                                      </Badge>
                                    )}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {isTranslationGroup && (
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => toggleGroupExpansion(groupKey)}
                              >
                                {isExpanded ? (
                                  <ChevronUp className="h-4 w-4" />
                                ) : (
                                  <ChevronDown className="h-4 w-4" />
                                )}
                              </Button>
                            )}
                            <Button
                              type="button"
                              onClick={() => {
                                const indicesToRemove = groupItems
                                  .map((item) => item.index)
                                  .sort((a, b) => b - a);

                                indicesToRemove.forEach((index) => {
                                  removeFieldArrayItem(
                                    form,
                                    "rules.accommodationInfo.accommodations",
                                    index
                                  );
                                });
                              }}
                              variant="ghost"
                              size="sm"
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardHeader>

                      <CardContent className="space-y-4">
                        {/* Accommodation Selection with Searchable Dropdown */}
                        <FormField
                          control={form.control}
                          name={`rules.accommodationInfo.accommodations.${primaryItem.index}.accommodationType`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Accommodation Type</FormLabel>
                              <FormControl>
                                <MultiSelect
                                  options={accommodationOptions}
                                  selected={
                                    field.value?._ref ? [field.value._ref] : []
                                  }
                                  onChange={(selected) => {
                                    const selectedId = selected[0];
                                    if (!selectedId) {
                                      field.onChange({
                                        _ref: "",
                                        _type: "reference",
                                      });
                                      return;
                                    }

                                    const selectedAccommodation =
                                      referenceData.accommodations.find(
                                        (acc) => acc && acc._id === selectedId
                                      );
                                    if (!selectedAccommodation) return;

                                    field.onChange({
                                      _ref: selectedId,
                                      _type: "reference",
                                    });

                                    const translationIds = [
                                      selectedAccommodation._id,
                                      ...(selectedAccommodation._translations?.map(
                                        (t) => t && t._id
                                      ) ?? []),
                                    ];

                                    const accommodationsArray =
                                      form.getValues(
                                        "rules.accommodationInfo.accommodations"
                                      ) ?? [];
                                    const existingRefs =
                                      accommodationsArray.map(
                                        (item) => item.accommodationType?._ref
                                      );

                                    translationIds.forEach((_ref) => {
                                      if (
                                        _ref !== selectedId &&
                                        !existingRefs.includes(_ref || "")
                                      ) {
                                        setSkipNextDraftWrite();
                                        append({
                                          additonalCost: 0,
                                          accommodationType: {
                                            _ref: _ref || "",
                                            _type: "reference",
                                          },
                                          roomDetails: {
                                            value: 1,
                                            locked: false,
                                          },
                                          _type: "accommodation",
                                          _key: `accommodation-${Date.now()}-${_ref}`,
                                        });
                                      }
                                    });

                                    // Auto-expand translation groups
                                    if (translationIds.length > 1) {
                                      setExpandedGroups(
                                        (prev) => new Set([...prev, groupKey])
                                      );
                                    }
                                  }}
                                  single={true}
                                  placeholder="Search and select accommodation type..."
                                  searchPlaceholder="Search accommodations..."
                                  emptyText="No accommodations found."
                                />
                              </FormControl>
                              <FormDescription>
                                Search by accommodation name, language, or type
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* Quick Summary for Translation Groups */}
                        {isTranslationGroup && !isExpanded && (
                          <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                            <div className="flex items-center gap-2">
                              <Globe className="w-4 h-4 text-blue-600" />
                              <span className="text-sm text-blue-800">
                                {groupItems.length} language versions configured
                              </span>
                            </div>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => toggleGroupExpansion(groupKey)}
                              className="text-blue-600 hover:text-blue-800"
                            >
                              View Details
                            </Button>
                          </div>
                        )}

                        {/* Expanded Details */}
                        <Collapsible open={!isTranslationGroup || isExpanded}>
                          <CollapsibleContent className="space-y-4">
                            {/* Pricing Configuration */}
                            <div className="space-y-3">
                              <div className="flex items-center gap-2">
                                <DollarSign className="w-4 h-4" />
                                <h4 className="text-sm font-medium">
                                  Additional Costs
                                </h4>
                              </div>

                              {isTranslationGroup ? (
                                <div className="grid gap-3">
                                  {groupItems.map((item) => (
                                    <div
                                      key={item.index}
                                      className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                                    >
                                      <Badge
                                        variant="outline"
                                        className="shrink-0"
                                      >
                                        {item.acc?.language?.toUpperCase()}
                                      </Badge>
                                      <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium truncate">
                                          {item.acc?.title}
                                        </p>
                                      </div>
                                      <div className="w-24">
                                        <FormField
                                          control={form.control}
                                          name={`rules.accommodationInfo.accommodations.${item.index}.additonalCost`}
                                          render={({ field }) => (
                                            <FormItem>
                                              <FormControl>
                                                <Input
                                                  type="number"
                                                  min="0"
                                                  step="0.01"
                                                  placeholder="0.00"
                                                  className="text-right text-sm"
                                                  {...field}
                                                  onChange={(e) =>
                                                    field.onChange(
                                                      e.target.value
                                                        ? Number.parseFloat(
                                                            e.target.value
                                                          )
                                                        : undefined
                                                    )
                                                  }
                                                />
                                              </FormControl>
                                              <FormMessage />
                                            </FormItem>
                                          )}
                                        />
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <FormField
                                  control={form.control}
                                  name={`rules.accommodationInfo.accommodations.${primaryItem.index}.additonalCost`}
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormControl>
                                        <Input
                                          type="number"
                                          min="0"
                                          step="0.01"
                                          placeholder="0.00"
                                          className="max-w-xs"
                                          {...field}
                                          onChange={(e) =>
                                            field.onChange(
                                              e.target.value
                                                ? Number.parseFloat(
                                                    e.target.value
                                                  )
                                                : undefined
                                            )
                                          }
                                        />
                                      </FormControl>
                                      <FormDescription>
                                        Additional cost for this accommodation
                                      </FormDescription>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              )}
                            </div>

                            {/* Room Configuration */}
                            <div className="space-y-3">
                              <h4 className="text-sm font-medium">
                                Room Configuration
                              </h4>
                              <div className="grid gap-4 md:grid-cols-2">
                                <FormField
                                  control={form.control}
                                  name={`rules.accommodationInfo.accommodations.${primaryItem.index}.roomDetails.value`}
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Number of Rooms</FormLabel>
                                      <FormControl>
                                        <Input
                                          type="number"
                                          min="1"
                                          defaultValue={1}
                                          {...field}
                                          onChange={(e) =>
                                            field.onChange(
                                              e.target.value
                                                ? Number.parseInt(
                                                    e.target.value
                                                  )
                                                : undefined
                                            )
                                          }
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />

                                <FormField
                                  control={form.control}
                                  name={`rules.accommodationInfo.accommodations.${primaryItem.index}.roomDetails.locked`}
                                  render={({ field }) => (
                                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                                      <div className="space-y-0.5">
                                        <FormLabel className="text-sm">
                                          Lock Room Count
                                        </FormLabel>
                                        <p className="text-xs text-muted-foreground">
                                          Prevent changes to room quantity
                                        </p>
                                      </div>
                                      <FormControl>
                                        <Switch
                                          checked={field.value}
                                          onCheckedChange={field.onChange}
                                        />
                                      </FormControl>
                                    </FormItem>
                                  )}
                                />
                              </div>
                            </div>
                          </CollapsibleContent>
                        </Collapsible>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              }
            )}
          </AnimatePresence>

          {fields.length === 0 && (
            <Card className="border-dashed">
              <CardContent className="flex flex-col items-center justify-center py-8">
                <p className="text-muted-foreground mb-4">
                  No accommodations configured
                </p>
                <Button onClick={addAccommodation} variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Add First Accommodation
                </Button>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
