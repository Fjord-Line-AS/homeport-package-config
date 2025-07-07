import type {
  Port,
  ShipProductCode,
  Ship,
  ShipCabin,
  AllowedVehicleCategory,
  Accommodation_v2,
  PackageRule_v2,
} from "@fjordline/sanity-types";

// Mock reference data
export const mockPorts: Port[] = [
  {
    _id: "port1",
    name: { nb: "test", _type: "localeString" },
    portCode: "POR",
    _type: "port",
    _createdAt: "2024-01-01T00:00:00Z",
    _rev: "12",
    _updatedAt: "2024-01-02T00:00:00Z",
  },
  {
    _id: "port2",
    name: { nb: "test", _type: "localeString" },
    portCode: "LEH",
    _type: "port",
    _createdAt: "2024-01-01T00:00:00Z",
    _rev: "12",
    _updatedAt: "2024-01-02T00:00:00Z",
  },
  {
    _id: "port3",
    name: { nb: "test", _type: "localeString" },
    portCode: "CAE",
    _type: "port",
    _createdAt: "2024-01-01T00:00:00Z",
    _rev: "12",
    _updatedAt: "2024-01-02T00:00:00Z",
  },
  {
    _id: "port4",
    name: { nb: "test", _type: "localeString" },
    portCode: "CHE",
    _type: "port",
    _createdAt: "2024-01-01T00:00:00Z",
    _rev: "12",
    _updatedAt: "2024-01-02T00:00:00Z",
  },
];

export const mockShipProductCodes: ShipProductCode[] = [
  {
    _id: "prod1",
    productCode: "FERRY-STD",
    productName: { _type: "localeString", nb: "Standard Ferry Crossing" },
    _createdAt: "2024-01-01T00:00:00Z",
    _updatedAt: "2024-01-02T00:00:00Z",
    _rev: "1",
    _type: "shipProductCode",
  },
  {
    _id: "prod2",
    productName: { _type: "localeString", nb: "Standard Ferry Crossing" },
    _createdAt: "2024-01-01T00:00:00Z",
    _updatedAt: "2024-01-02T00:00:00Z",
    _rev: "1",
    _type: "shipProductCode",
  },
  {
    _id: "prod3",
    productName: { _type: "localeString", nb: "Standard Ferry Crossing" },
    _createdAt: "2024-01-01T00:00:00Z",
    _updatedAt: "2024-01-02T00:00:00Z",
    _rev: "1",
    _type: "shipProductCode",
  },
];

export const mockShips: Ship[] = [
  {
    _id: "ship1",
    shipName: { _type: "localeString", nb: "MS Stavangerfjord" },
    _rev: "12",
    _createdAt: "12-12-12",
    shipCode: "NB87",
    _updatedAt: "2024-01-02T00:00:00Z",
    _type: "ship",
  },
  {
    _id: "ship2",
    shipName: { _type: "localeString", nb: "MS Bergensfjord" },
    _rev: "12",
    _createdAt: "12-12-12",
    shipCode: "NB87",
    _updatedAt: "2024-01-02T00:00:00Z",
    _type: "ship",
  },
  {
    _id: "ship3",
    shipName: { _type: "localeString", nb: "Fjord FSTR" },
    _rev: "12",
    _createdAt: "12-12-12",
    shipCode: "NB87",
    _updatedAt: "2024-01-02T00:00:00Z",
    _type: "ship",
  },
];

export const mockShipCabins: ShipCabin[] = [
  {
    _id: "cabin1",
    cabinName: {
      nb: "Standard Innvendig",
      en: "Standard Inside",
      _type: "localeString",
    },
    cabinType: "B1",
    _createdAt: "2024-01-01T00:00:00Z",
    _updatedAt: "2024-01-02T00:00:00Z",
    _rev: "1",
    _type: "shipCabin",
  },
  {
    _id: "cabin2",
    cabinName: {
      nb: "Standard Utvendig",
      en: "Standard Outside",
      _type: "localeString",
    },
    cabinType: "STD-OUT",
    _createdAt: "2024-01-01T00:00:00Z",
    _updatedAt: "2024-01-02T00:00:00Z",
    _rev: "1",
    _type: "shipCabin",
  },
  {
    _id: "cabin3",
    cabinName: {
      nb: "Premium Suite",
      en: "Premium Suite",
      _type: "localeString",
    },
    cabinType: "PREM-STE",
    _createdAt: "2024-01-01T00:00:00Z",
    _updatedAt: "2024-01-02T00:00:00Z",
    _rev: "1",
    _type: "shipCabin",
  },
  {
    _id: "cabin4",
    cabinName: {
      nb: "Premium Suite",
      en: "Premium Suite",
      _type: "localeString",
    },
    cabinType: "SEAT",
    _createdAt: "2024-01-01T00:00:00Z",
    _updatedAt: "2024-01-02T00:00:00Z",
    _rev: "1",
    _type: "shipCabin",
  },
];

export const mockVehicleCategories: AllowedVehicleCategory[] = [
  {
    _id: "veh1",
    name: {
      nb: "Test",
      da: "test",
      en: "TEST",
      de: "TesT",
      _type: "localeString",
    },
    code: "STD_VEHICLE",
    _type: "allowedVehicleCategory",
    _createdAt: "2024-01-01T00:00:00Z",
    _updatedAt: "2024-01-02T00:00:00Z",
    _rev: "1",
  },
  {
    _id: "veh2",
    name: {
      nb: "Test",
      da: "test",
      en: "TEST",
      de: "TesT",
      _type: "localeString",
    },
    code: "LRG_VEHICLE",
    _type: "allowedVehicleCategory",
    _createdAt: "2024-01-01T00:00:00Z",
    _updatedAt: "2024-01-02T00:00:00Z",
    _rev: "1",
  },
  {
    _id: "veh3",
    name: {
      nb: "Test",
      da: "test",
      en: "TEST",
      de: "TesT",
      _type: "localeString",
    },
    code: "STD_MC",
    _type: "allowedVehicleCategory",
    _createdAt: "2024-01-01T00:00:00Z",
    _updatedAt: "2024-01-02T00:00:00Z",
    _rev: "1",
  },
  {
    _id: "veh4",
    name: {
      nb: "Test",
      da: "test",
      en: "TEST",
      de: "TesT",
      _type: "localeString",
    },
    code: "LRG_MC",
    _type: "allowedVehicleCategory",
    _createdAt: "2024-01-01T00:00:00Z",
    _updatedAt: "2024-01-02T00:00:00Z",
    _rev: "1",
  },
];

export const mockAccommodations: Accommodation_v2[] = [
  {
    _id: "acc1",
    _type: "accommodation_v2",
    _createdAt: "2025-01-01T00:00:00Z",
    _updatedAt: "2025-01-01T00:00:00Z",
    _rev: "rev-acc1",
    title: "Hotel Standard",
    language: "nb",
    location: {
      _type: "location_v2",
      place: { _ref: "place1", _type: "reference" }, // 💥 FIXED HERE
    },
    bookableOnWeb: true,
    metaTitle: { nb: "Hotel Standard" },
    metaDescription: { nb: "Et standard hotell" },
    slug: { _type: "slug", current: "hotel-standard" },
    description: [],
  },
  {
    _id: "acc2",
    _type: "accommodation_v2",
    _createdAt: "2025-01-01T00:00:00Z",
    _updatedAt: "2025-01-01T00:00:00Z",
    _rev: "rev-acc2",
    title: "Hotel Premium",
    language: "nb",
    location: {
      _type: "location_v2",
      place: { _ref: "place2", _type: "reference" }, // 💥 FIXED HERE
    },
    bookableOnWeb: true,
    metaTitle: { nb: "Hotel Premium" },
    metaDescription: { nb: "Et premium hotell" },
    slug: { _type: "slug", current: "hotel-premium" },
    description: [],
  },
];

export const mockPackageRules: PackageRule_v2[] = [
  {
    _id: "rule1",
    _type: "packageRule_v2",
    _rev: "rev1",
    name: "Standard Bergen - Hirtshals Return",
    description:
      "Standard return ferry crossing between Bergen and Hirtshals ports",
    _createdAt: "2024-01-15T10:00:00Z",
    _updatedAt: "2024-01-20T14:30:00Z",
    rules: {
      _type: "bundlePackageRules",
      packageCode: "STD-UK-FR-RET",
      journeyType: "RETURN",
      ports: {
        defaultPortFrom: { _ref: "port1", _type: "reference" },
        defaultPortTo: { _ref: "port2", _type: "reference" },
        availablePortsFrom: [
          { _ref: "port1", _type: "reference", _key: "key1" },
          { _ref: "port2", _type: "reference", _key: "key2" },
        ],
        availablePortsTo: [
          { _ref: "port2", _type: "reference", _key: "key3" },
          { _ref: "port3", _type: "reference", _key: "key4" },
        ],
        allowDifferentReturn: false,
      },
      productCode: { _ref: "prod1", _type: "reference" },
      dates: {
        outbound: {
          locked: false,
        },
        inbound: {
          locked: false,
        },
      },
      weekdays: [
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
        "sunday",
      ],
      journeyDuration: 6,
      daysAshore: 1,
      personConfiguration: {
        maxTotalTravelers: 8,
        minTotalTravelers: 1,
        roomQuantity: {
          maxQuantity: 4,
          minQuantity: 1,
          locked: false,
        },
        adults: {
          maxQuantity: 6,
          minQuantity: 1,
          preSelectedValue: 2,
          locked: false,
        },
        children: {
          maxAge: 16,
          minAge: 0,
          maxQuantity: 4,
          minQuantity: 0,
          preSelectedValue: 0,
          locked: false,
        },
      },
      vehicles: {
        car: {
          vehicleCategories: [
            { _ref: "veh1", _type: "reference", _key: "vkey1" },
            { _ref: "veh2", _type: "reference", _key: "vkey2" },
          ],
          value: 1,
          locked: false,
        },
        motorcycle: {
          vehicleCategories: [
            { _ref: "veh3", _type: "reference", _key: "vkey3" },
          ],
          value: 0,
          locked: false,
        },
        bikes: {
          value: 0,
          locked: false,
        },
      },
      cabinInfo: {
        outbound: {
          cabinSuggestGroups: "EXTERIOR_CABINS",
          cabins: [
            { _ref: "cabin1", _type: "reference", _key: "ckey1" },
            { _ref: "cabin2", _type: "reference", _key: "ckey2" },
          ],
        },
        cabins: [
          {
            isIncluded: false,
            additonalCost: 50,
            cabinType: { _ref: "cabin1", _type: "reference" },
            _type: "cabin",
            _key: "cabin_key1",
          },
          {
            isIncluded: false,
            additonalCost: 80,
            cabinType: { _ref: "cabin2", _type: "reference" },
            _type: "cabin",
            _key: "cabin_key2",
          },
        ],
      },
      accommodationInfo: {
        accommodations: [
          {
            additonalCost: 100,
            accommodationType: { _ref: "acc1", _type: "reference" },
            roomDetails: {
              value: 1,
              locked: false,
            },
            _type: "accommodation",
            _key: "acc_key1",
          },
        ],
      },
    },
  },
];

// Mock API functions
export async function getPackageRules(): Promise<PackageRule_v2[]> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return mockPackageRules;
}

export async function getPackageRule(
  id: string
): Promise<PackageRule_v2 | null> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return mockPackageRules.find((rule) => rule._id === id) || null;
}

export async function updatePackageRule(
  id: string,
  data: Partial<PackageRule_v2>
): Promise<PackageRule_v2> {
  await new Promise((resolve) => setTimeout(resolve, 800));
  const existingRule = mockPackageRules.find((rule) => rule._id === id);
  if (!existingRule) {
    throw new Error("Rule not found");
  }

  const updatedRule = {
    ...existingRule,
    ...data,
    _updatedAt: new Date().toISOString(),
  };

  const index = mockPackageRules.findIndex((rule) => rule._id === id);
  mockPackageRules[index] = updatedRule;

  return updatedRule;
}

export async function createPackageRule(
  data: Omit<PackageRule_v2, "_id" | "_createdAt" | "_updatedAt">
): Promise<PackageRule_v2> {
  await new Promise((resolve) => setTimeout(resolve, 800));

  const newRule: PackageRule_v2 = {
    ...data,
    _id: `rule${Date.now()}`,
    _createdAt: new Date().toISOString(),
    _updatedAt: new Date().toISOString(),
  };

  mockPackageRules.push(newRule);
  return newRule;
}

export async function getShipProductCodes(): Promise<ShipProductCode[]> {
  return mockShipProductCodes;
}

export async function getShips(): Promise<Ship[]> {
  return mockShips;
}

export async function getShipCabins(): Promise<ShipCabin[]> {
  return mockShipCabins;
}

export async function getVehicleCategories(): Promise<
  AllowedVehicleCategory[]
> {
  return mockVehicleCategories;
}

export async function getAccommodations(): Promise<Accommodation_v2[]> {
  return mockAccommodations;
}
