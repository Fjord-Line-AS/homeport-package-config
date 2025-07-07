import { notFound } from "next/navigation";
import { PackageRuleForm } from "@/components/admin/package-rule-form";
import {
  Accommodation_v2,
  AllowedVehicleCategory,
  PackageRule_v2,
  Port,
  Ship,
  ShipCabin,
  ShipProductCode,
} from "@fjordline/sanity-types";
import { sanityFetch } from "@/lib/sanity/live";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function getShipProductCodes(): Promise<ShipProductCode[]> {
  const sanityFetchConfig = {
    query: `*[_type == "shipProductCode"]`,
  };
  const res = await sanityFetch(sanityFetchConfig);
  if (!res || !Array.isArray(res.data)) {
    throw new Error("Failed to fetch ship product codes");
  }
  return res.data;
}

export async function getPackageRule(
  id: string
): Promise<PackageRule_v2 | null> {
  const sanityFetchConfig = {
    query: `*[_type == "packageRule_v2" && _id == $id][0]`,
    params: { id },
  };
  const res = await sanityFetch(sanityFetchConfig);
  if (!res || !res.data) {
    return null;
  }
  return res.data;
}

export async function getVehicleCategories(): Promise<
  AllowedVehicleCategory[]
> {
  const sanityFetchConfig = {
    query: `*[_type == "allowedVehicleCategory"]`,
  };
  const res = await sanityFetch(sanityFetchConfig);
  if (!res || !Array.isArray(res.data)) {
    throw new Error("Failed to fetch vehicle categories");
  }
  return res.data;
}

export async function getAccommodations(): Promise<Accommodation_v2[]> {
  const sanityFetchConfig = {
    query: `*[_type == "accommodation_v2"]`,
  };
  const res = await sanityFetch(sanityFetchConfig);
  if (!res || !Array.isArray(res.data)) {
    throw new Error("Failed to fetch accommodations");
  }
  return res.data;
}

export async function getShipCabins(): Promise<ShipCabin[]> {
  const sanityFetchConfig = {
    query: `*[_type == "shipCabin"]`,
  };
  const res = await sanityFetch(sanityFetchConfig);
  if (!res || !Array.isArray(res.data)) {
    throw new Error("Failed to fetch ship cabins");
  }
  return res.data;
}

export async function getPorts(): Promise<Port[]> {
  const sanityFetchConfig = {
    query: `*[_type == "port"]`,
  };
  const res = await sanityFetch(sanityFetchConfig);
  if (!res || !Array.isArray(res.data)) {
    throw new Error("Failed to fetch ports");
  }
  return res.data;
}

export async function getShips(): Promise<Ship[]> {
  const sanityFetchConfig = {
    query: `*[_type == "ship"]`,
  };
  const res = await sanityFetch(sanityFetchConfig);
  if (!res || !Array.isArray(res.data)) {
    throw new Error("Failed to fetch ships");
  }
  return res.data;
}

export default async function EditPackageRulePage({ params }: PageProps) {
  const { id } = await params;

  if (id === "new") {
    const [
      ports,
      shipProductCodes,
      ships,
      shipCabins,
      vehicleCategories,
      accommodations,
    ] = await Promise.all([
      getPorts(),
      getShipProductCodes(),
      getShips(),
      getShipCabins(),
      getVehicleCategories(),
      getAccommodations(),
    ]);

    return (
      <div className="space-y-6">
        <PackageRuleForm
          referenceData={{
            ports,
            shipProductCodes,
            ships,
            shipCabins,
            vehicleCategories,
            accommodations,
          }}
        />
      </div>
    );
  }

  const [
    rule,
    ports,
    shipProductCodes,
    ships,
    shipCabins,
    vehicleCategories,
    accommodations,
  ] = await Promise.all([
    getPackageRule(id),
    getPorts(),
    getShipProductCodes(),
    getShips(),
    getShipCabins(),
    getVehicleCategories(),
    getAccommodations(),
  ]);

  if (!rule) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <PackageRuleForm
        rule={rule}
        referenceData={{
          ports,
          shipProductCodes,
          ships,
          shipCabins,
          vehicleCategories,
          accommodations,
        }}
      />
    </div>
  );
}
