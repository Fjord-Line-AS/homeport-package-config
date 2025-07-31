"use client";

import { type UseFormReturn, useFieldArray } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2 } from "lucide-react";

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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import type { PackageRuleFormData } from "@/lib/validation";
import {
  Accommodation_v2,
  AllowedVehicleCategory,
  Port,
  Ship,
  ShipCabin,
  ShipProductCode,
} from "@fjordline/sanity-types";
import { removeFieldArrayItem } from "@/lib/form/removeFieldArrayItem";

interface ReferenceData {
  ports: Port[];
  shipProductCodes: ShipProductCode[];
  ships: Ship[];
  shipCabins: ShipCabin[];
  vehicleCategories: AllowedVehicleCategory[];
  accommodations: Accommodation_v2[];
}

interface CabinsSectionProps {
  form: UseFormReturn<PackageRuleFormData>;
  referenceData: ReferenceData;
}

export function CabinsSection({ form, referenceData }: CabinsSectionProps) {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "rules.cabinInfo.cabins",
  });

  const addCabinType = () => {
    append({
      isIncluded: false,
      additonalCost: 0,
      cabinType: { _ref: "", _type: "reference" },
      _type: "cabin",
      _key: `cabin-${Date.now()}`,
    });
  };

  return (
    <div className="grid gap-6">
      {/* Outbound Cabin Configuration */}
      <Card>
        <CardHeader>
          <CardTitle>Outbound Cabin Configuration</CardTitle>
          <CardDescription>
            Configure cabin settings for outbound journey
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <FormField
            control={form.control}
            name="rules.cabinInfo.outbound.cabinSuggestGroups"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cabin Suggest Group</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select cabin group" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="EXTERIOR_CABINS">
                      Exterior Cabins
                    </SelectItem>
                    <SelectItem value="INTERIOR_CABINS">
                      Interior Cabins
                    </SelectItem>
                    <SelectItem value="SEATS">Seats</SelectItem>
                    <SelectItem value="LOUNGES">Lounges</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  Default cabin group suggestion for outbound journey
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-3">
            <label className="text-sm font-medium">
              Available Outbound Cabins
            </label>
            <div className="grid gap-3 md:grid-cols-2">
              {referenceData.shipCabins.map((cabin) => (
                <FormField
                  key={`outbound-${cabin._id}`}
                  control={form.control}
                  name="rules.cabinInfo.outbound.cabins"
                  render={({ field }) => {
                    const isChecked =
                      field.value?.some((ref) => ref._ref === cabin._id) ||
                      false;
                    return (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={isChecked}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                field.onChange([
                                  ...(field.value || []),
                                  {
                                    _ref: cabin._id,
                                    _type: "reference" as const,
                                    _key: `outbound-${cabin._id}-${Date.now()}`,
                                  },
                                ]);
                              } else {
                                field.onChange(
                                  field.value?.filter(
                                    (ref) => ref._ref !== cabin._id
                                  ) || []
                                );
                              }
                            }}
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-normal">
                          {cabin.cabinName?.en || cabin.cabinName?.nb} (
                          {cabin.cabinType})
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Inbound Cabin Configuration */}
      <Card>
        <CardHeader>
          <CardTitle>Inbound Cabin Configuration</CardTitle>
          <CardDescription>
            Configure cabin settings for inbound journey (optional - defaults to
            outbound if not set)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <FormField
            control={form.control}
            name="rules.cabinInfo.inbound.cabinSuggestGroups"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cabin Suggest Group</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select cabin group (optional)" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="EXTERIOR_CABINS">
                      Exterior Cabins
                    </SelectItem>
                    <SelectItem value="INTERIOR_CABINS">
                      Interior Cabins
                    </SelectItem>
                    <SelectItem value="SEATS">Seats</SelectItem>
                    <SelectItem value="LOUNGES">Lounges</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  Default cabin group suggestion for inbound journey
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-3">
            <label className="text-sm font-medium">
              Available Inbound Cabins
            </label>
            <div className="grid gap-3 md:grid-cols-2">
              {referenceData.shipCabins.map((cabin) => (
                <FormField
                  key={`inbound-${cabin._id}`}
                  control={form.control}
                  name="rules.cabinInfo.inbound.cabins"
                  render={({ field }) => {
                    const isChecked =
                      field.value?.some((ref) => ref._ref === cabin._id) ||
                      false;
                    return (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={isChecked}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                field.onChange([
                                  ...(field.value || []),
                                  {
                                    _ref: cabin._id,
                                    _type: "reference" as const,
                                    _key: `inbound-${cabin._id}-${Date.now()}`,
                                  },
                                ]);
                              } else {
                                field.onChange(
                                  field.value?.filter(
                                    (ref) => ref._ref !== cabin._id
                                  ) || []
                                );
                              }
                            }}
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-normal">
                          {cabin.cabinName?.en || cabin.cabinName?.nb} (
                          {cabin.cabinType})
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cabin Pricing Configuration */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Cabin Pricing Configuration</CardTitle>
              <CardDescription>
                Configure cabin types with pricing and inclusion settings
              </CardDescription>
            </div>
            <Button
              onClick={addCabinType}
              variant="outline"
              size="sm"
              type="button"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Cabin Type
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <AnimatePresence>
            {fields.map((field, index) => (
              <motion.div
                key={field.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className="mb-4"
              >
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">
                        Cabin Configuration {index + 1}
                      </CardTitle>
                      <Button
                        onClick={() => {
                          removeFieldArrayItem(
                            form,
                            "rules.cabinInfo.cabins",
                            index
                          );
                        }}
                        variant="ghost"
                        size="sm"
                        type="button"
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-3">
                      <FormField
                        control={form.control}
                        name={`rules.cabinInfo.cabins.${index}.cabinType`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Cabin Type</FormLabel>
                            <Select
                              onValueChange={(value) => {
                                field.onChange({
                                  _ref: value,
                                  _type: "reference",
                                });
                              }}
                              value={field.value?._ref}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select cabin type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {referenceData.shipCabins.map((cabin) => (
                                  <SelectItem key={cabin._id} value={cabin._id}>
                                    {cabin.cabinName?.en || cabin.cabinName?.nb}{" "}
                                    ({cabin.cabinType})
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`rules.cabinInfo.cabins.${index}.additonalCost`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Additional Cost</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                min="0"
                                step="0.01"
                                placeholder="0.00"
                                {...field}
                                onChange={(e) =>
                                  field.onChange(
                                    e.target.value
                                      ? Number.parseFloat(e.target.value)
                                      : undefined
                                  )
                                }
                              />
                            </FormControl>
                            <FormDescription>
                              Additional cost for this cabin
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`rules.cabinInfo.cabins.${index}.isIncluded`}
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                            <div className="space-y-0.5">
                              <FormLabel className="text-sm">
                                Included
                              </FormLabel>
                              <FormDescription>
                                Is this cabin included in the base price?
                              </FormDescription>
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
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>

          {fields.length === 0 && (
            <Card className="border-dashed">
              <CardContent className="flex flex-col items-center justify-center py-8">
                <p className="text-muted-foreground mb-4">
                  No cabin pricing configurations
                </p>
                <Button onClick={addCabinType} variant="outline" type="button">
                  <Plus className="h-4 w-4 mr-2" />
                  Add First Cabin Configuration
                </Button>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
