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
import type { PackageRuleFormData } from "@/lib/validation";

interface DatesSectionProps {
  form: UseFormReturn<PackageRuleFormData>;
}

const weekdays = [
  { key: "monday", label: "Monday" },
  { key: "tuesday", label: "Tuesday" },
  { key: "wednesday", label: "Wednesday" },
  { key: "thursday", label: "Thursday" },
  { key: "friday", label: "Friday" },
  { key: "saturday", label: "Saturday" },
  { key: "sunday", label: "Sunday" },
] as const;

export function DatesSection({ form }: DatesSectionProps) {
  return (
    <div className="grid gap-6">
      {/* Journey Duration */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Journey Duration</h3>

        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="bundlePackageRules.journeyDuration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Journey Duration (hours)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="0"
                    step="0.5"
                    placeholder="6"
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
                  Duration of the journey in hours
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bundlePackageRules.daysAshore"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Days Ashore</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="0"
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
                <FormDescription>Number of days spent ashore</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      {/* Weekday Settings */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Available Weekdays</h3>
        <p className="text-sm text-muted-foreground">
          Select which days of the week this rule applies to
        </p>

        <div className="grid gap-3 md:grid-cols-4">
          {weekdays.map((day) => (
            <FormField
              key={day.key}
              control={form.control}
              name={`bundlePackageRules.weekdays.${day.key}`}
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="text-sm font-normal">
                    {day.label}
                  </FormLabel>
                </FormItem>
              )}
            />
          ))}
        </div>
      </div>

      {/* Date Configuration */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Date Configuration</h3>

        <FormField
          control={form.control}
          name="bundlePackageRules.dates.outbound.date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Outbound Date (Optional)</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormDescription>Specific outbound date if fixed</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bundlePackageRules.dates.outbound.locked"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Lock Outbound Date</FormLabel>
                <FormDescription>
                  Prevent changes to outbound date
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

        <FormField
          control={form.control}
          name="bundlePackageRules.dates.inbound.date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Inbound Date (Optional)</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormDescription>Specific inbound date if fixed</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bundlePackageRules.dates.inbound.locked"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Lock Inbound Date</FormLabel>
                <FormDescription>
                  Prevent changes to inbound date
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
    </div>
  );
}
