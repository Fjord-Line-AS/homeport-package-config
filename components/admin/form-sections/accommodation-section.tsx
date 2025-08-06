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
import type { PackageRuleFormData } from "@/lib/validation";
import {
  Accommodation_v2,
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
  accommodations: Accommodation_v2[];
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
                        Accommodation {index + 1}
                      </CardTitle>
                      <Button
                        type="button"
                        onClick={() => {
                          removeFieldArrayItem(
                            form,
                            "rules.accommodationInfo.accommodations",
                            index
                          );
                        }}
                        variant="ghost"
                        size="sm"
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name={`rules.accommodationInfo.accommodations.${index}.accommodationType`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Accommodation Type</FormLabel>
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
                                  <SelectValue placeholder="Select accommodation" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {referenceData.accommodations.map(
                                  (accommodation) => (
                                    <SelectItem
                                      key={accommodation._id}
                                      value={accommodation._id}
                                    >
                                      {accommodation.title} (
                                      {accommodation.language})
                                    </SelectItem>
                                  )
                                )}
                              </SelectContent>
                            </Select>
                            <FormDescription>
                              Select the accommodation type
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`rules.accommodationInfo.accommodations.${index}.additonalCost`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Additional Cost</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                min="0"
                                step="0.01"
                                defaultValue={0}
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
                              Additional cost for this accommodation
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <Card className="bg-muted/50">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm">Room Details</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2">
                          <FormField
                            control={form.control}
                            name={`rules.accommodationInfo.accommodations.${index}.roomDetails.value`}
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
                                          ? Number.parseInt(e.target.value)
                                          : undefined
                                      )
                                    }
                                  />
                                </FormControl>
                                <FormDescription>
                                  Default number of rooms
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name={`rules.accommodationInfo.accommodations.${index}.roomDetails.locked`}
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
                      </CardContent>
                    </Card>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
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
