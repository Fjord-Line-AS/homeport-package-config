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
import { Input } from "@/components/ui/input";
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
import {
  ACCOMMODATION_WITH_TRANSLATIONS_Result,
  AllowedVehicleCategory,
  Port,
  Ship,
  ShipCabin,
  ShipProductCode,
} from "@fjordline/sanity-types";

interface ReferenceData {
  ports: Port[];
  shipProductCodes: ShipProductCode[];
  ships: Ship[];
  shipCabins: ShipCabin[];
  vehicleCategories: AllowedVehicleCategory[];
  accommodations: ACCOMMODATION_WITH_TRANSLATIONS_Result[];
}

interface VehiclesSectionProps {
  form: UseFormReturn<PackageRuleFormData>;
  referenceData: ReferenceData;
}

export function VehiclesSection({ form, referenceData }: VehiclesSectionProps) {
  const watchCarLocked = form.watch("rules.vehicles.car.locked");
  const watchMotorcycleLocked = form.watch("rules.vehicles.motorcycle.locked");
  const watchBikesLocked = form.watch("rules.vehicles.bikes.locked");

  const carCategories = referenceData.vehicleCategories.filter(
    (cat) => cat.code === "VEHICLE"
  );
  const motorcycleCategories = referenceData.vehicleCategories.filter(
    (cat) => cat.code === "MC"
  );

  return (
    <div className="grid gap-6">
      {/* Car Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            🚗 Car Configuration
          </CardTitle>
          <CardDescription>
            Configure car vehicle support and categories
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <FormField
            control={form.control}
            name="rules.vehicles.car.locked"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Lock Car Settings</FormLabel>
                  <FormDescription>
                    Prevent changes to car configuration
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

          {!watchCarLocked && (
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="rules.vehicles.car.value"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Default Car Value</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="0"
                        defaultValue={1}
                        placeholder="1"
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
                    <FormDescription>Default number of cars</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-3">
                <label className="text-base">Allowed Vehicle Categories</label>
                <div className="grid gap-3 md:grid-cols-2">
                  {carCategories.map((category) => (
                    <FormField
                      key={`car-${category._id}`}
                      control={form.control}
                      name="rules.vehicles.car.vehicleCategories"
                      render={({ field }) => {
                        const isChecked =
                          field.value?.some(
                            (ref) => ref._ref === category._id
                          ) || false;
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
                                        _ref: category._id,
                                        _type: "reference" as const,
                                        _key: `car-${
                                          category._id
                                        }-${Date.now()}`,
                                      },
                                    ]);
                                  } else {
                                    field.onChange(
                                      field.value?.filter(
                                        (ref) => ref._ref !== category._id
                                      ) || []
                                    );
                                  }
                                }}
                              />
                            </FormControl>
                            <FormLabel className="text-sm font-normal">
                              {category.name?.en} ({category.code})
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Motorcycle Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            🏍️ Motorcycle Configuration
          </CardTitle>
          <CardDescription>
            Configure motorcycle vehicle support and categories
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <FormField
            control={form.control}
            name="rules.vehicles.motorcycle.locked"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">
                    Lock Motorcycle Settings
                  </FormLabel>
                  <FormDescription>
                    Prevent changes to motorcycle configuration
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

          {!watchMotorcycleLocked && (
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="rules.vehicles.motorcycle.value"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Default Motorcycle Value</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        defaultValue={0}
                        min="0"
                        placeholder="0"
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
                      Default number of motorcycles
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-3">
                <label className="text-base">
                  Allowed Motorcycle Categories
                </label>
                <div className="grid gap-3 md:grid-cols-2">
                  {motorcycleCategories.map((category) => (
                    <FormField
                      key={`mc-${category._id}`}
                      control={form.control}
                      name="rules.vehicles.motorcycle.vehicleCategories"
                      render={({ field }) => {
                        const isChecked =
                          field.value?.some(
                            (ref) => ref._ref === category._id
                          ) || false;
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
                                        _ref: category._id,
                                        _type: "reference" as const,
                                        _key: `mc-${
                                          category._id
                                        }-${Date.now()}`,
                                      },
                                    ]);
                                  } else {
                                    field.onChange(
                                      field.value?.filter(
                                        (ref) => ref._ref !== category._id
                                      ) || []
                                    );
                                  }
                                }}
                              />
                            </FormControl>
                            <FormLabel className="text-sm font-normal">
                              {category.name?.en} ({category.code})
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Bikes Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            🚲 Bicycle Configuration
          </CardTitle>
          <CardDescription>Configure bicycle support</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <FormField
            control={form.control}
            name="rules.vehicles.bikes.locked"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">
                    Lock Bicycle Settings
                  </FormLabel>
                  <FormDescription>
                    Prevent changes to bicycle configuration
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

          {!watchBikesLocked && (
            <FormField
              control={form.control}
              name="rules.vehicles.bikes.value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Default Bicycle Value</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      defaultValue={0}
                      min="0"
                      placeholder="0"
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
                  <FormDescription>Default number of bicycles</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
