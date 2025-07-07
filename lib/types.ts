import { PackageRule_v2 } from "@fjordline/sanity-types";
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
