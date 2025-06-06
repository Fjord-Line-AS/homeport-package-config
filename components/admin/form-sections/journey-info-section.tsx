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
import type {
  Port,
  ShipProductCode,
  Ship,
  ShipCabin,
  AllowedVehicleCategory,
  Accommodation_v2,
} from "@/lib/types";

interface ReferenceData {
  ports: Port[];
  shipProductCodes: ShipProductCode[];
  ships: Ship[];
  shipCabins: ShipCabin[];
  vehicleCategories: AllowedVehicleCategory[];
  accommodations: Accommodation_v2[];
}

interface JourneyInfoSectionProps {
  form: UseFormReturn<PackageRuleFormData>;
  referenceData: ReferenceData;
}

export function JourneyInfoSection({
  form,
  referenceData,
}: JourneyInfoSectionProps) {
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
          name="bundlePackageRules.packageCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Package Code</FormLabel>
              <FormControl>
                <Input placeholder="e.g., STD-UK-FR-RET" {...field} />
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
          name="bundlePackageRules.journeyType"
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
          name="bundlePackageRules.productCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Code</FormLabel>
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
                    <SelectValue placeholder="Select product code" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {referenceData.shipProductCodes.map((product) => (
                    <SelectItem key={product._id} value={product._id}>
                      {product.code} - {product.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                The product code this rule is associated with
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

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
  );
}
