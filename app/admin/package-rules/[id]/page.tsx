import { notFound } from "next/navigation";
import { PackageRuleForm } from "@/components/admin/package-rule-form";
import { getPackageRule } from "@/app/actions/packageRules/getPackageRule";
import { getVehicleCategories } from "@/app/actions/references/getVehicleCategories";
import { getAccommodations } from "@/app/actions/references/getAccommodations";
import { getShipCabins } from "@/app/actions/references/getShipCabins";
import { getPorts } from "@/app/actions/references/getPorts";
import { getShips } from "@/app/actions/references/getShips";
import { getShipProductCodes } from "@/app/actions/references/getShipProductCode";

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
