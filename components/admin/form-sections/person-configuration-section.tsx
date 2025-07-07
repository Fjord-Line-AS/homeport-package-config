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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { PackageRuleFormData } from "@/lib/validation";

interface PersonConfigurationSectionProps {
  form: UseFormReturn<PackageRuleFormData>;
}

export function PersonConfigurationSection({
  form,
}: PersonConfigurationSectionProps) {
  const watchRoomLocked = form.watch(
    "rules.personConfiguration.roomQuantity.locked"
  );
  const watchAdultsLocked = form.watch(
    "rules.personConfiguration.adults.locked"
  );
  const watchChildrenLocked = form.watch(
    "rules.personConfiguration.children.locked"
  );

  return (
    <div className="grid gap-6">
      {/* General Traveler Limits */}
      <Card>
        <CardHeader>
          <CardTitle>General Traveler Limits</CardTitle>
          <CardDescription>
            Overall limits for total number of travelers
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="rules.personConfiguration.minTotalTravelers"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Minimum Total Travelers</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="1"
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
                    Minimum total number of travelers
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="rules.personConfiguration.maxTotalTravelers"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Maximum Total Travelers</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="1"
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
                    Maximum total number of travelers
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </CardContent>
      </Card>

      {/* Room Configuration */}
      <Card>
        <CardHeader>
          <CardTitle>Room Configuration</CardTitle>
          <CardDescription>Configure room quantity settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <FormField
            control={form.control}
            name="rules.personConfiguration.roomQuantity.locked"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">
                    Lock Room Quantity
                  </FormLabel>
                  <FormDescription>
                    Prevent changes to room quantity settings
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

          {!watchRoomLocked && (
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="rules.personConfiguration.roomQuantity.minQuantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Minimum Rooms</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="1"
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
                      Minimum number of rooms required
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="rules.personConfiguration.roomQuantity.maxQuantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Maximum Rooms</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="1"
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
                      Maximum number of rooms allowed
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Adult Configuration */}
      <Card>
        <CardHeader>
          <CardTitle>Adult Traveler Configuration</CardTitle>
          <CardDescription>Configure adult traveler settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <FormField
            control={form.control}
            name="rules.personConfiguration.adults.locked"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">
                    Lock Adult Settings
                  </FormLabel>
                  <FormDescription>
                    Prevent changes to adult traveler configuration
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

          {!watchAdultsLocked && (
            <div className="grid gap-4 md:grid-cols-3">
              <FormField
                control={form.control}
                name="rules.personConfiguration.adults.minQuantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Minimum Adults</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="0"
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
                    <FormDescription>Minimum number of adults</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="rules.personConfiguration.adults.maxQuantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Maximum Adults</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="0"
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
                    <FormDescription>Maximum number of adults</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="rules.personConfiguration.adults.preSelectedValue"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pre-selected Value</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="0"
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
                    <FormDescription>Default number of adults</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Children Configuration */}
      <Card>
        <CardHeader>
          <CardTitle>Children Traveler Configuration</CardTitle>
          <CardDescription>
            Configure children traveler settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <FormField
            control={form.control}
            name="rules.personConfiguration.children.locked"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">
                    Lock Children Settings
                  </FormLabel>
                  <FormDescription>
                    Prevent changes to children traveler configuration
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

          {!watchChildrenLocked && (
            <div className="grid gap-4 md:grid-cols-2">
              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="rules.personConfiguration.children.minAge"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Minimum Age</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          max="18"
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
                        Minimum age for children
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="rules.personConfiguration.children.maxAge"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Maximum Age</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          max="18"
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
                        Maximum age for children
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <FormField
                  control={form.control}
                  name="rules.personConfiguration.children.minQuantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Minimum Children</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
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
                        Minimum number of children
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="rules.personConfiguration.children.maxQuantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Maximum Children</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
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
                        Maximum number of children
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="rules.personConfiguration.children.preSelectedValue"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pre-selected Value</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
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
                        Default number of children
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
    </div>
  );
}
