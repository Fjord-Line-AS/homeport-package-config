"use server";

import { v4 as uuidv4 } from "uuid";
import { sanityApiClient } from "@/lib/sanity/client";
import { PackageRule_v2 } from "@fjordline/sanity-types";

const client = sanityApiClient;

export async function createNewPackageRuleDraft(): Promise<string> {
  const id = `drafts.${uuidv4()}`;

  const defaultValues: Omit<PackageRule_v2, "_rev"> = {
    _id: id,
    _type: "packageRule_v2",
    _createdAt: new Date().toISOString(),
    _updatedAt: new Date().toISOString(),
    name: "Untitled Rule",
    description: "Get started by configuring your package rule",
    rules: {
      _type: "bundlePackageRules",
      journeyType: "RETURN",
      ports: {
        availablePortsFrom: [],
        availablePortsTo: [],
        allowDifferentReturn: false,
      },
      dates: {
        outbound: { locked: false },
        inbound: { locked: false },
      },
      weekdays: ["monday", "tuesday", "wednesday", "thursday", "friday"],
      personConfiguration: {
        minTotalTravelers: 1,
        maxTotalTravelers: 10,
        roomQuantity: { minQuantity: 1, locked: false },
        adults: { minQuantity: 1, locked: false },
        children: { minQuantity: 0, maxAge: 16, locked: false },
      },
      vehicles: {
        car: { vehicleCategories: [], value: 0, locked: false },
        motorcycle: { vehicleCategories: [], value: 0, locked: false },
        bikes: { value: 0, locked: false },
      },
      allowedVesselsForDeparture: [],
      cabinInfo: {
        outbound: { cabins: [] },
        inbound: { cabins: [] },
        cabins: [],
      },
      accommodationInfo: {
        accommodations: [],
      },
    },
  };

  await client.createIfNotExists(defaultValues, {
    autoGenerateArrayKeys: true,
  });

  return id;
}
