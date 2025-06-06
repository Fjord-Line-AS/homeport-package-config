"use client"

import type { UseFormReturn } from "react-hook-form"
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import type { PackageRuleFormData } from "@/lib/validation"

interface TravelersSectionProps {
  form: UseFormReturn<PackageRuleFormData>
}

export function TravelersSection({ form }: TravelersSectionProps) {
  const watchLocked = form.watch("rules.travelers.locked")
  const watchAdultRequired = form.watch("rules.travelers.adultSettings.required")

  return (
    <div className="grid gap-6">
      {/* General Traveler Settings */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">General Traveler Limits</h3>

        <FormField
          control={form.control}
          name="rules.travelers.locked"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Lock Traveler Settings</FormLabel>
                <FormDescription>Prevent changes to traveler configuration</FormDescription>
              </div>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />

        {!watchLocked && (
          <div className="grid gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="rules.travelers.min"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Minimum Travelers</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="1"
                      {...field}
                      onChange={(e) => field.onChange(Number.parseInt(e.target.value))}
                    />
                  </FormControl>
                  <FormDescription>Minimum total number of travelers</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="rules.travelers.max"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Maximum Travelers</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="1"
                      {...field}
                      onChange={(e) => field.onChange(Number.parseInt(e.target.value))}
                    />
                  </FormControl>
                  <FormDescription>Maximum total number of travelers</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}
      </div>

      {/* Adult Settings */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Adult Traveler Settings</h3>

        <FormField
          control={form.control}
          name="rules.travelers.adultSettings.required"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Adult Required</FormLabel>
                <FormDescription>At least one adult must be present</FormDescription>
              </div>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="rules.travelers.adultSettings.min"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Minimum Adults</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="0"
                    {...field}
                    onChange={(e) => field.onChange(Number.parseInt(e.target.value))}
                  />
                </FormControl>
                <FormDescription>Minimum number of adult travelers</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="rules.travelers.adultSettings.max"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Maximum Adults</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="0"
                    {...field}
                    onChange={(e) => field.onChange(Number.parseInt(e.target.value))}
                  />
                </FormControl>
                <FormDescription>Maximum number of adult travelers</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      {/* Child Settings */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Child Traveler Settings</h3>

        <div className="grid gap-4 md:grid-cols-3">
          <FormField
            control={form.control}
            name="rules.travelers.childSettings.min"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Minimum Children</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="0"
                    {...field}
                    onChange={(e) => field.onChange(Number.parseInt(e.target.value))}
                  />
                </FormControl>
                <FormDescription>Minimum number of child travelers</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="rules.travelers.childSettings.max"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Maximum Children</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="0"
                    {...field}
                    onChange={(e) => field.onChange(Number.parseInt(e.target.value))}
                  />
                </FormControl>
                <FormDescription>Maximum number of child travelers</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="rules.travelers.childSettings.ageLimit"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Child Age Limit</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="1"
                    max="18"
                    {...field}
                    onChange={(e) => field.onChange(Number.parseInt(e.target.value))}
                  />
                </FormControl>
                <FormDescription>Maximum age to be considered a child</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  )
}
