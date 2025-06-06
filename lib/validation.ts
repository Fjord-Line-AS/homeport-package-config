import { z } from "zod";

const sanityReferenceSchema = z.object({
  _ref: z.string(),
  _type: z.literal("reference"),
  _weak: z.boolean().optional(),
});

const sanityReferenceWithKeySchema = sanityReferenceSchema.extend({
  _key: z.string(),
});

export const packageRuleSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name too long"),
  description: z.string().optional(),
  bundlePackageRules: z.object({
    packageCode: z.string().optional(),
    journeyType: z
      .enum(["ONEWAY", "RETURN", "ONEWAY_RETURN", "CRUISE", "PACKAGE"])
      .optional(),
    ports: z
      .object({
        defaultPortFrom: sanityReferenceSchema.optional(),
        defaultPortTo: sanityReferenceSchema.optional(),
        availablePortsFrom: z.array(sanityReferenceWithKeySchema).optional(),
        availablePortsTo: z.array(sanityReferenceWithKeySchema).optional(),
        allowDifferentReturn: z.boolean().optional(),
        returnPorts: z
          .object({
            defaultPortFrom: sanityReferenceSchema.optional(),
            defaultPortTo: sanityReferenceSchema.optional(),
            availablePortsFrom: z
              .array(sanityReferenceWithKeySchema)
              .optional(),
            availablePortsTo: z.array(sanityReferenceWithKeySchema).optional(),
          })
          .optional(),
      })
      .optional(),
    productCode: sanityReferenceSchema.optional(),
    dates: z
      .object({
        outbound: z
          .object({
            date: z.string().optional(),
            locked: z.boolean().optional(),
          })
          .optional(),
        inbound: z
          .object({
            date: z.string().optional(),
            locked: z.boolean().optional(),
          })
          .optional(),
      })
      .optional(),
    weekdays: z
      .object({
        monday: z.boolean().optional(),
        tuesday: z.boolean().optional(),
        wednesday: z.boolean().optional(),
        thursday: z.boolean().optional(),
        friday: z.boolean().optional(),
        saturday: z.boolean().optional(),
        sunday: z.boolean().optional(),
      })
      .optional(),
    journeyDuration: z.number().min(0).optional(),
    daysAshore: z.number().min(0).optional(),
    personConfiguration: z
      .object({
        maxTotalTravelers: z.number().min(0).optional(),
        minTotalTravelers: z.number().min(1).optional(),
        roomQuantity: z
          .object({
            maxQuantity: z.number().optional(),
            minQuantity: z.number().optional(),
            locked: z.boolean().optional(),
          })
          .optional(),
        adults: z
          .object({
            maxQuantity: z.number().optional(),
            minQuantity: z.number().optional(),
            preSelectedValue: z.number().optional(),
            locked: z.boolean().optional(),
          })
          .optional(),
        children: z
          .object({
            maxAge: z.number().optional(),
            minAge: z.number().optional(),
            maxQuantity: z.number().optional(),
            minQuantity: z.number().optional(),
            preSelectedValue: z.number().optional(),
            locked: z.boolean().optional(),
          })
          .optional(),
      })
      .optional(),
    vehicles: z
      .object({
        car: z
          .object({
            vehicleCategories: z.array(sanityReferenceWithKeySchema).optional(),
            value: z.number().min(0).optional(),
            locked: z.boolean().optional(),
          })
          .optional(),
        motorcycle: z
          .object({
            vehicleCategories: z.array(sanityReferenceWithKeySchema).optional(),
            value: z.number().min(0).optional(),
            locked: z.boolean().optional(),
          })
          .optional(),
        bikes: z
          .object({
            value: z.number().min(0).optional(),
            locked: z.boolean().optional(),
          })
          .optional(),
      })
      .optional(),
    allowedVesselsForDeparture: z
      .array(sanityReferenceWithKeySchema)
      .optional(),
    cabinInfo: z
      .object({
        outbound: z
          .object({
            cabinSuggestGroups: z
              .enum(["EXTERIOR_CABINS", "INTERIOR_CABINS", "SEATS", "LOUNGES"])
              .optional(),
            cabins: z.array(sanityReferenceWithKeySchema).optional(),
          })
          .optional(),
        inbound: z
          .object({
            cabinSuggestGroups: z
              .enum(["EXTERIOR_CABINS", "INTERIOR_CABINS", "SEATS", "LOUNGES"])
              .optional(),
            cabins: z.array(sanityReferenceWithKeySchema).optional(),
          })
          .optional(),
        cabins: z
          .array(
            z.object({
              isIncluded: z.boolean().optional(),
              additonalCost: z.number().min(0).optional(),
              cabinType: sanityReferenceSchema.optional(),
              _type: z.literal("cabin"),
              _key: z.string(),
            })
          )
          .optional(),
      })
      .optional(),
    accommodationInfo: z
      .object({
        accommodations: z
          .array(
            z.object({
              additonalCost: z.number().min(0).optional(),
              accommodationType: sanityReferenceSchema.optional(),
              roomDetails: z
                .object({
                  value: z.number().min(0).optional(),
                  locked: z.boolean().optional(),
                })
                .optional(),
              _type: z.literal("accommodation"),
              _key: z.string(),
            })
          )
          .optional(),
      })
      .optional(),
  }),
});

export type PackageRuleFormData = z.infer<typeof packageRuleSchema>;
