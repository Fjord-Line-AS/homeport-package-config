import { BundlePackageRules } from "@fjordline/sanity-types";
// Base reference type for Sanity
interface SanityReference {
  _ref: string;
  _type: "reference";
  _weak?: boolean;
}

// Weekdays type
export interface Weekdays {
  monday?: boolean;
  tuesday?: boolean;
  wednesday?: boolean;
  thursday?: boolean;
  friday?: boolean;
  saturday?: boolean;
  sunday?: boolean;
}

// Reference data types
export interface Port {
  _id: string;
  name: string;
  code: string;
  country: string;
}

export interface ShipProductCode {
  _id: string;
  code: string;
  name: string;
  description?: string;
}

export interface Ship {
  _id: string;
  name: string;
  code: string;
}

export interface ShipCabin {
  _id: string;
  cabinName: {
    nb: string;
    en?: string;
  };
  code: string;
  category: string;
}

export interface AllowedVehicleCategory {
  _id: string;
  name: string;
  code: string;
  type: "VEHICLE" | "MC";
}

export interface Accommodation_v2 {
  _id: string;
  title: string;
  language: string;
  location: {
    place: {
      area: {
        country: SanityReference;
      };
    };
  };
}

// Main bundle package rules type matching Sanity schema
// export interface BundlePackageRules {
//   _type: "bundlePackageRules";
//   packageCode?: string;
//   journeyType?: "ONEWAY" | "RETURN" | "ONEWAY_RETURN" | "CRUISE" | "PACKAGE";
//   ports?: {
//     defaultPortFrom?: SanityReference;
//     defaultPortTo?: SanityReference;
//     availablePortsFrom?: Array<SanityReference & { _key: string }>;
//     availablePortsTo?: Array<SanityReference & { _key: string }>;
//     allowDifferentReturn?: boolean;
//     returnPorts?: {
//       defaultPortFrom?: SanityReference;
//       defaultPortTo?: SanityReference;
//       availablePortsFrom?: Array<SanityReference & { _key: string }>;
//       availablePortsTo?: Array<SanityReference & { _key: string }>;
//     };
//   };
//   productCode?: SanityReference;
//   dates?: {
//     outbound?: {
//       date?: string;
//       locked?: boolean;
//     };
//     inbound?: {
//       date?: string;
//       locked?: boolean;
//     };
//   };
//   weekdays?: Weekdays;
//   journeyDuration?: number;
//   daysAshore?: number;
//   personConfiguration?: {
//     maxTotalTravelers?: number;
//     minTotalTravelers?: number;
//     roomQuantity?: {
//       maxQuantity?: number;
//       minQuantity?: number;
//       locked?: boolean;
//     };
//     adults?: {
//       maxQuantity?: number;
//       minQuantity?: number;
//       preSelectedValue?: number;
//       locked?: boolean;
//     };
//     children?: {
//       maxAge?: number;
//       minAge?: number;
//       maxQuantity?: number;
//       minQuantity?: number;
//       preSelectedValue?: number;
//       locked?: boolean;
//     };
//   };
//   vehicles?: {
//     car?: {
//       vehicleCategories?: Array<SanityReference & { _key: string }>;
//       value?: number;
//       locked?: boolean;
//     };
//     motorcycle?: {
//       vehicleCategories?: Array<SanityReference & { _key: string }>;
//       value?: number;
//       locked?: boolean;
//     };
//     bikes?: {
//       value?: number;
//       locked?: boolean;
//     };
//   };
//   allowedVesselsForDeparture?: Array<SanityReference & { _key: string }>;
//   cabinInfo?: {
//     outbound?: {
//       cabinSuggestGroups?:
//         | "EXTERIOR_CABINS"
//         | "INTERIOR_CABINS"
//         | "SEATS"
//         | "LOUNGES";
//       cabins?: Array<SanityReference & { _key: string }>;
//     };
//     inbound?: {
//       cabinSuggestGroups?:
//         | "EXTERIOR_CABINS"
//         | "INTERIOR_CABINS"
//         | "SEATS"
//         | "LOUNGES";
//       cabins?: Array<SanityReference & { _key: string }>;
//     };
//     cabins?: Array<{
//       isIncluded?: boolean;
//       additonalCost?: number;
//       cabinType?: SanityReference;
//       _type: "cabin";
//       _key: string;
//     }>;
//   };
//   accommodationInfo?: {
//     accommodations?: Array<{
//       additonalCost?: number;
//       accommodationType?: SanityReference;
//       roomDetails?: {
//         value?: number;
//         locked?: boolean;
//       };
//       _type: "accommodation";
//       _key: string;
//     }>;
//   };
// }

export interface PackageRule_v2 {
  _id: string;
  name: string;
  description?: string;
  bundlePackageRules: BundlePackageRules;
  _createdAt: string;
  _updatedAt: string;
}
