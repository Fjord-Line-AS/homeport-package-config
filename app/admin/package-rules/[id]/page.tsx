import { notFound } from "next/navigation";
import {
  getPackageRule,
  getPorts,
  getShipProductCodes,
  getShips,
  getShipCabins,
  getVehicleCategories,
  getAccommodations,
} from "@/lib/sanity-mock";
import { PackageRuleForm } from "@/components/admin/package-rule-form";

interface PageProps {
  params: Promise<{ id: string }>;
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
