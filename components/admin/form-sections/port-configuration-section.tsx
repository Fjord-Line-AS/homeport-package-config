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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  Port,
  ShipProductCode,
  Ship,
  ShipCabin,
  AllowedVehicleCategory,
  Accommodation_v2,
} from "@fjordline/sanity-types";

interface ReferenceData {
  ports: Port[];
  shipProductCodes: ShipProductCode[];
  ships: Ship[];
  shipCabins: ShipCabin[];
  vehicleCategories: AllowedVehicleCategory[];
  accommodations: Accommodation_v2[];
}

interface PortConfigurationSectionProps {
  form: UseFormReturn<PackageRuleFormData>;
  referenceData: ReferenceData;
}

export function PortConfigurationSection({
  form,
  referenceData,
}: PortConfigurationSectionProps) {
  const watchAllowDifferentReturn = form.watch(
    "rules.ports.allowDifferentReturn"
  );

  return (
    <div className="grid gap-6">
      {/* Outbound Ports */}
      <Card>
        <CardHeader>
          <CardTitle>Outbound Journey Ports</CardTitle>
          <CardDescription>
            Configure departure and arrival ports for outbound journey
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="rules.ports.defaultPortFrom"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Default Port From</FormLabel>
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
                        <SelectValue placeholder="Select default departure port" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {referenceData.ports.map((port) => (
                        <SelectItem key={port._id} value={port._id}>
                          {port.name?.en} ({port.portCode}) -{" "}
                          {port.internationalPortCode}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>The default departure port</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="rules.ports.defaultPortTo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Default Port To</FormLabel>
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
                        <SelectValue placeholder="Select default arrival port" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {referenceData.ports.map((port) => (
                        <SelectItem key={port._id} value={port._id}>
                          {port.name?.en} ({port.portCode}) -{" "}
                          {port.internationalPortCode}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>The default arrival port</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-4">
            <label className="text-sm font-medium">
              Available Departure Ports
            </label>
            <div className="grid gap-3 md:grid-cols-2">
              {referenceData.ports.map((port) => (
                <FormField
                  key={`from-${port._id}`}
                  control={form.control}
                  name="rules.ports.availablePortsFrom"
                  render={({ field }) => {
                    const isChecked =
                      field.value?.some((ref) => ref._ref === port._id) ||
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
                                    _ref: port._id,
                                    _type: "reference" as const,
                                    _key: `from-${port._id}-${Date.now()}`,
                                  },
                                ]);
                              } else {
                                field.onChange(
                                  field.value?.filter(
                                    (ref) => ref._ref !== port._id
                                  ) || []
                                );
                              }
                            }}
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-normal">
                          {port.name?.en} ({port.portCode}) -{" "}
                          {port.internationalPortCode}
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-sm font-medium">
              Available Arrival Ports
            </label>
            <div className="grid gap-3 md:grid-cols-2">
              {referenceData.ports.map((port) => (
                <FormField
                  key={`to-${port._id}`}
                  control={form.control}
                  name="rules.ports.availablePortsTo"
                  render={({ field }) => {
                    const isChecked =
                      field.value?.some((ref) => ref._ref === port._id) ||
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
                                    _ref: port._id,
                                    _type: "reference" as const,
                                    _key: `to-${port._id}-${Date.now()}`,
                                  },
                                ]);
                              } else {
                                field.onChange(
                                  field.value?.filter(
                                    (ref) => ref._ref !== port._id
                                  ) || []
                                );
                              }
                            }}
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-normal">
                          {port.name?.en} ({port.portCode}) -{" "}
                          {port.internationalPortCode}
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

      {/* Return Journey Configuration */}
      <Card>
        <CardHeader>
          <CardTitle>Return Journey Configuration</CardTitle>
          <CardDescription>
            Configure return journey port options
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <FormField
            control={form.control}
            name="rules.ports.allowDifferentReturn"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">
                    Allow Different Return Ports
                  </FormLabel>
                  <FormDescription>
                    Allow return from different ports than outbound journey
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

          {watchAllowDifferentReturn && (
            <div className="space-y-4 border-l-2 border-muted pl-4">
              <label className="text-sm font-medium">
                Return Port Configuration
              </label>

              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="rules.ports.returnPorts.defaultPortFrom"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Default Return Port From</FormLabel>
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
                            <SelectValue placeholder="Select default return departure port" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {referenceData.ports.map((port) => (
                            <SelectItem key={port._id} value={port._id}>
                              {port.name?.en} ({port.portCode}) -{" "}
                              {port.internationalPortCode}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Default port for return departure
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="rules.ports.returnPorts.defaultPortTo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Default Return Port To</FormLabel>
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
                            <SelectValue placeholder="Select default return arrival port" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {referenceData.ports.map((port) => (
                            <SelectItem key={port._id} value={port._id}>
                              {port.name?.en} ({port.portCode}) -{" "}
                              {port.internationalPortCode}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Default port for return arrival
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Vessel Restrictions */}
      <Card>
        <CardHeader>
          <CardTitle>Vessel Restrictions</CardTitle>
          <CardDescription>
            Limit this package to specific vessels for departure
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <label className="text-sm font-medium">
              Allowed Vessels for Departure
            </label>
            <p className="text-sm text-muted-foreground">
              If no vessels are selected, all vessels are allowed. Select
              specific vessels to restrict availability.
            </p>
            <div className="grid gap-3 md:grid-cols-2">
              {referenceData.ships.map((ship) => (
                <FormField
                  key={`vessel-${ship._id}`}
                  control={form.control}
                  name="rules.allowedVesselsForDeparture"
                  render={({ field }) => {
                    const isChecked =
                      field.value?.some((ref) => ref._ref === ship._id) ||
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
                                    _ref: ship._id,
                                    _type: "reference" as const,
                                    _key: `vessel-${ship._id}-${Date.now()}`,
                                  },
                                ]);
                              } else {
                                field.onChange(
                                  field.value?.filter(
                                    (ref) => ref._ref !== ship._id
                                  ) || []
                                );
                              }
                            }}
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-normal">
                          {ship.shipName?.en} ({ship.shipCode})
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
    </div>
  );
}
