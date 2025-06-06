import type {
  PackageRule_v2,
  Port,
  ShipProductCode,
  Ship,
  ShipCabin,
  AllowedVehicleCategory,
  Accommodation_v2,
} from "./types";

// Mock reference data
export const mockPorts: Port[] = [
  { _id: "port1", name: "Portsmouth", code: "POR", country: "UK" },
  { _id: "port2", name: "Le Havre", code: "LEH", country: "France" },
  { _id: "port3", name: "Caen", code: "CAE", country: "France" },
  { _id: "port4", name: "Cherbourg", code: "CHE", country: "France" },
];

export const mockShipProductCodes: ShipProductCode[] = [
  {
    _id: "prod1",
    code: "FERRY-STD",
    name: "Standard Ferry Crossing",
    description: "Standard ferry service",
  },
  {
    _id: "prod2",
    code: "FERRY-PREM",
    name: "Premium Ferry Crossing",
    description: "Premium ferry service",
  },
  {
    _id: "prod3",
    code: "FERRY-FLEX",
    name: "Flexible Ferry Crossing",
    description: "Flexible ferry service",
  },
];

export const mockShips: Ship[] = [
  { _id: "ship1", name: "Normandie Express", code: "NE" },
  { _id: "ship2", name: "Brittany Ferries", code: "BF" },
  { _id: "ship3", name: "P&O Pioneer", code: "PP" },
];

export const mockShipCabins: ShipCabin[] = [
  {
    _id: "cabin1",
    cabinName: { nb: "Standard Innvendig", en: "Standard Inside" },
    code: "STD-IN",
    category: "INTERIOR_CABINS",
  },
  {
    _id: "cabin2",
    cabinName: { nb: "Standard Utvendig", en: "Standard Outside" },
    code: "STD-OUT",
    category: "EXTERIOR_CABINS",
  },
  {
    _id: "cabin3",
    cabinName: { nb: "Premium Suite", en: "Premium Suite" },
    code: "PREM-STE",
    category: "EXTERIOR_CABINS",
  },
  {
    _id: "cabin4",
    cabinName: { nb: "Sete", en: "Seat" },
    code: "SEAT",
    category: "SEATS",
  },
];

export const mockVehicleCategories: AllowedVehicleCategory[] = [
  { _id: "veh1", name: "Standard Car", code: "STD_VEHICLE", type: "VEHICLE" },
  { _id: "veh2", name: "Large Car", code: "LRG_VEHICLE", type: "VEHICLE" },
  { _id: "veh3", name: "Motorcycle", code: "STD_MC", type: "MC" },
  { _id: "veh4", name: "Large Motorcycle", code: "LRG_MC", type: "MC" },
];

export const mockAccommodations: Accommodation_v2[] = [
  {
    _id: "acc1",
    title: "Hotel Standard",
    language: "nb",
    location: {
      place: {
        area: {
          country: { _ref: "country1", _type: "reference" },
        },
      },
    },
  },
  {
    _id: "acc2",
    title: "Hotel Premium",
    language: "nb",
    location: {
      place: {
        area: {
          country: { _ref: "country1", _type: "reference" },
        },
      },
    },
  },
];

export const mockPackageRules: PackageRule_v2[] = [
  {
    _id: "rule1",
    name: "Standard Bergen - Hirtshals Return",
    description:
      "Standard return ferry crossing between Bergen and Hirtshals ports",
    _createdAt: "2024-01-15T10:00:00Z",
    _updatedAt: "2024-01-20T14:30:00Z",
    bundlePackageRules: {
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
      weekdays: {
        monday: true,
        tuesday: true,
        wednesday: true,
        thursday: true,
        friday: true,
        saturday: true,
        sunday: false,
      },
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

// Reference data getters
export async function getPorts(): Promise<Port[]> {
  return mockPorts;
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
