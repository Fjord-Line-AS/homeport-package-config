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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { SearchableSelect } from "@/components/ui/searchable-select";

interface ReferenceData {
  ports: Port[];
  shipProductCodes: ShipProductCode[];
  ships: Ship[];
  shipCabins: ShipCabin[];
  vehicleCategories: AllowedVehicleCategory[];
  accommodations: ACCOMMODATION_WITH_TRANSLATIONS_Result[];
}

interface JourneyInfoSectionProps {
  form: UseFormReturn<PackageRuleFormData>;
  referenceData: ReferenceData;
}

export function JourneyInfoSection({
  form,
  referenceData,
}: JourneyInfoSectionProps) {
  const productCodeOptions = referenceData.shipProductCodes.map((code) => ({
    value: code._id,
    label: code.productName?.en || code.productName?.nb || "Unknown Product",
    description: `• Code: ${code.productCode}`,
    code: code.productCode, // Added code field for product code
  }));
  return (
    <div className="grid gap-6">
      <div className="grid gap-4 md:grid-cols-2">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rule Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g., Standard UK-France Return"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                A descriptive name for this package rule
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="rules.packageCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Package Code</FormLabel>
              <FormControl>
                <Input placeholder="e.g., STD-B-HH-RET" {...field} />
              </FormControl>
              <FormDescription>Unique package identifier code</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Optional description or notes about this rule..."
                className="resize-none"
                {...field}
              />
            </FormControl>
            <FormDescription>
              Optional notes about when and how this rule should be used
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid gap-4 md:grid-cols-2">
        <FormField
          control={form.control}
          name="rules.journeyType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Journey Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select journey type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="ONEWAY">One Way</SelectItem>
                  <SelectItem value="RETURN">Return</SelectItem>
                  <SelectItem value="ONEWAY_RETURN">
                    One Way / Return
                  </SelectItem>
                  <SelectItem value="CRUISE">Cruise</SelectItem>
                  <SelectItem value="PACKAGE">Package</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Type of journey this rule applies to
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="rules.productCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Code</FormLabel>
              <FormControl>
                <SearchableSelect
                  options={productCodeOptions}
                  value={field.value?._ref}
                  onChange={(value) => {
                    field.onChange({
                      _ref: value,
                      _type: "reference",
                    });
                  }}
                  placeholder="Search and select product code..."
                  searchPlaceholder="Search product codes..."
                  emptyText="No product codes found."
                />
              </FormControl>
              <FormDescription>
                Select the cabin type for pricing
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <FormField
          control={form.control}
          name="rules.journeyDuration"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Journey Duration (hours)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min="0"
                  step="0.5"
                  placeholder="6"
                  defaultValue={6}
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
          name="rules.daysAshore"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Days Ashore</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  defaultValue={1}
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
  );
}
