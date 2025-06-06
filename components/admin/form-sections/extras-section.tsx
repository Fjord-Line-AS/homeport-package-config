"use client";

import type { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { PackageRuleFormData } from "@/lib/validation";
import type {
  Port,
  ProductCode,
  Vessel,
  CabinType,
  Accommodation,
} from "@/lib/types";

interface ReferenceData {
  ports: Port[];
  productCodes: ProductCode[];
  vessels: Vessel[];
  cabinTypes: CabinType[];
  accommodations: Accommodation[];
}

interface ExtrasSectionProps {
  form: UseFormReturn<PackageRuleFormData>;
  referenceData: ReferenceData;
}

export function ExtrasSection({ form, referenceData }: ExtrasSectionProps) {
  const watchVesselRestrictionEnabled = form.watch(
    "rules.vesselRestriction.enabled"
  );

  return (
    <div className="grid gap-6">
      {/* Accommodation */}
      <Card>
        <CardHeader>
          <CardTitle>Accommodation Options</CardTitle>
          <CardDescription>
            Select available accommodation types for this package
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FormField
            control={form.control}
            name="rules.accommodation"
            render={() => (
              <FormItem>
                <div className="grid gap-3 md:grid-cols-2">
                  {referenceData.accommodations.map((accommodation) => (
                    <FormField
                      key={accommodation._id}
                      control={form.control}
                      name="rules.accommodation"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={accommodation._id}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(
                                  accommodation._id
                                )}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([
                                        ...field.value,
                                        accommodation._id,
                                      ])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== accommodation._id
                                        )
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className="text-sm font-normal">
                              {accommodation.name} ({accommodation.type})
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>

      {/* Vessel Restrictions */}
      <Card>
        <CardHeader>
          <CardTitle>Vessel Restrictions</CardTitle>
          <CardDescription>
            Restrict this package to specific vessels
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <FormField
            control={form.control}
            name="rules.vesselRestriction.enabled"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">
                    Enable Vessel Restrictions
                  </FormLabel>
                  <FormDescription>
                    Limit package to specific vessels only
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

          {watchVesselRestrictionEnabled && (
            <FormField
              control={form.control}
              name="rules.vesselRestriction.allowedVessels"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel className="text-base">Allowed Vessels</FormLabel>
                    <FormDescription>
                      Select which vessels can be used for this package
                    </FormDescription>
                  </div>
                  <div className="grid gap-3 md:grid-cols-2">
                    {referenceData.vessels.map((vessel) => (
                      <FormField
                        key={vessel._id}
                        control={form.control}
                        name="rules.vesselRestriction.allowedVessels"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={vessel._id}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(vessel._id)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([
                                          ...field.value,
                                          vessel._id,
                                        ])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== vessel._id
                                          )
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="text-sm font-normal">
                                {vessel.name} ({vessel.code})
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </CardContent>
      </Card>

      {/* Placeholder for Meals and Extras */}
      <Card>
        <CardHeader>
          <CardTitle>Meals & Additional Extras</CardTitle>
          <CardDescription>
            Additional meal plans and extra services (placeholder)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Meal plans and additional extras configuration will be implemented
            when reference data is available.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
