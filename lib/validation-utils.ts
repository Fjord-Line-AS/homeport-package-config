import type { PackageRuleFormData } from "./validation";

export type ValidationSection = {
  id: string;
  name: string;
  status: "complete" | "partial" | "incomplete" | "error";
  requiredFields: string[];
  completedFields: string[];
  errors: string[];
};

export type ValidationSummary = {
  overallProgress: number;
  sections: ValidationSection[];
  isValid: boolean;
  totalRequiredFields: number;
  totalCompletedFields: number;
};

export function validatePackageRule(
  formData: PackageRuleFormData | undefined
): ValidationSummary {
  if (!formData) {
    return {
      overallProgress: 0,
      sections: [],
      isValid: false,
      totalRequiredFields: 0,
      totalCompletedFields: 0,
    };
  }

  const sections: ValidationSection[] = [
    validateBasicInfo(formData),
    validatePortConfiguration(formData),
    validateDates(formData),
    validatePersonConfiguration(formData),
    validateVehicles(formData),
    validateCabins(formData),
    validateAccommodation(formData),
  ];

  const totalRequiredFields = sections.reduce(
    (sum, section) => sum + section.requiredFields.length,
    0
  );
  const totalCompletedFields = sections.reduce(
    (sum, section) => sum + section.completedFields.length,
    0
  );
  const overallProgress =
    totalRequiredFields > 0
      ? (totalCompletedFields / totalRequiredFields) * 100
      : 100;

  return {
    overallProgress,
    sections,
    isValid: sections.every((section) => section.status !== "error"),
    totalRequiredFields,
    totalCompletedFields,
  };
}

function validateBasicInfo(formData: PackageRuleFormData): ValidationSection {
  const requiredFields = ["name", "rules.journeyType", "rules.packageCode"];
  const completedFields = [];
  const errors = [];

  if (formData.name && formData.name.trim()) completedFields.push("name");
  else errors.push("Rule name is required");

  if (formData.rules?.journeyType) completedFields.push("rules.journeyType");
  else errors.push("Journey type is required");

  if (formData.rules?.packageCode && formData.rules.packageCode.trim())
    completedFields.push("rules.packageCode");
  else errors.push("Package code is required");

  let status: ValidationSection["status"] = "incomplete";
  if (completedFields.length === requiredFields.length) status = "complete";
  else if (completedFields.length > 0) status = "partial";
  if (errors.length > 0) status = "error";

  return {
    id: "journey",
    name: "Journey Info",
    status,
    requiredFields,
    completedFields,
    errors,
  };
}

function validatePortConfiguration(
  formData: PackageRuleFormData
): ValidationSection {
  const requiredFields = [
    "rules.ports.defaultPortFrom",
    "rules.ports.defaultPortTo",
  ];
  const completedFields = [];
  const errors = [];

  if (formData.rules?.ports?.defaultPortFrom?._ref)
    completedFields.push("rules.ports.defaultPortFrom");
  else errors.push("Default departure port is required");

  if (formData.rules?.ports?.defaultPortTo?._ref)
    completedFields.push("rules.ports.defaultPortTo");
  else errors.push("Default arrival port is required");

  // Check if available ports are configured
  if (formData.rules?.ports?.availablePortsFrom?.length) {
    completedFields.push("rules.ports.availablePortsFrom");
  }

  if (formData.rules?.ports?.availablePortsTo?.length) {
    completedFields.push("rules.ports.availablePortsTo");
  }

  let status: ValidationSection["status"] = "incomplete";
  if (completedFields.length >= requiredFields.length) status = "complete";
  else if (completedFields.length > 0) status = "partial";
  if (errors.length > 0) status = "error";

  return {
    id: "ports",
    name: "Port Configuration",
    status,
    requiredFields,
    completedFields,
    errors,
  };
}

function validateDates(formData: PackageRuleFormData): ValidationSection {
  const requiredFields = ["rules.weekdays"];
  const completedFields = [];
  const errors = [];

  // Check if at least one weekday is selected
  const weekdays = formData.rules?.weekdays;
  if (weekdays && weekdays.length > 0) {
    completedFields.push("rules.weekdays");
  } else {
    errors.push("At least one weekday must be selected");
  }

  // Journey duration is recommended
  if (formData.rules?.journeyDuration) {
    completedFields.push("rules.journeyDuration");
  }

  let status: ValidationSection["status"] = "incomplete";
  if (completedFields.length === requiredFields.length) status = "complete";
  else if (completedFields.length > 0) status = "partial";
  if (errors.length > 0) status = "error";

  return {
    id: "dates",
    name: "Dates & Duration",
    status,
    requiredFields,
    completedFields,
    errors,
  };
}

function validatePersonConfiguration(
  formData: PackageRuleFormData
): ValidationSection {
  const requiredFields = [
    "rules.personConfiguration.minTotalTravelers",
    "rules.personConfiguration.adults.minQuantity",
  ];
  const completedFields = [];
  const errors = [];

  if (formData.rules?.personConfiguration?.minTotalTravelers) {
    completedFields.push("rules.personConfiguration.minTotalTravelers");
  } else {
    errors.push("Minimum total travelers is required");
  }

  if (formData.rules?.personConfiguration?.adults?.minQuantity !== undefined) {
    completedFields.push("rules.personConfiguration.adults.minQuantity");
  } else {
    errors.push("Minimum number of adults is required");
  }

  // Check for logical errors
  if (
    formData.rules?.personConfiguration?.minTotalTravelers &&
    formData.rules?.personConfiguration?.maxTotalTravelers &&
    formData.rules.personConfiguration.minTotalTravelers >
      formData.rules.personConfiguration.maxTotalTravelers
  ) {
    errors.push("Minimum travelers cannot be greater than maximum travelers");
  }

  let status: ValidationSection["status"] = "incomplete";
  if (completedFields.length === requiredFields.length) status = "complete";
  else if (completedFields.length > 0) status = "partial";
  if (errors.length > 0) status = "error";

  return {
    id: "persons",
    name: "Person Configuration",
    status,
    requiredFields,
    completedFields,
    errors,
  };
}

function validateVehicles(formData: PackageRuleFormData): ValidationSection {
  // Vehicles are optional, but if configured, they should be valid
  const requiredFields: string[] = [];
  const completedFields = [];
  const errors = [];

  // Check if car configuration is complete
  if (formData.rules?.vehicles?.car?.value !== undefined) {
    completedFields.push("rules.vehicles.car.value");
  }

  // Check if car categories are selected when needed
  if (
    formData.rules?.vehicles?.car?.value &&
    formData.rules.vehicles.car.value > 0 &&
    (!formData.rules.vehicles.car.vehicleCategories ||
      formData.rules.vehicles.car.vehicleCategories.length === 0)
  ) {
    errors.push("Vehicle categories must be selected when cars are enabled");
  }

  let status: ValidationSection["status"] = "complete"; // Default to complete since vehicles are optional
  if (errors.length > 0) status = "error";

  return {
    id: "vehicles",
    name: "Vehicles",
    status,
    requiredFields,
    completedFields,
    errors,
  };
}

function validateCabins(formData: PackageRuleFormData): ValidationSection {
  // Cabins are optional, but if configured, they should be valid
  const requiredFields: string[] = [];
  const completedFields = [];
  const errors = [];

  // Check if cabin configurations exist
  if (
    formData.rules?.cabinInfo?.cabins &&
    formData.rules.cabinInfo.cabins.length > 0
  ) {
    completedFields.push("rules.cabinInfo.cabins");

    // Check if all cabin configurations have a cabin type
    const invalidCabins = formData.rules.cabinInfo.cabins.filter(
      (cabin) => !cabin.cabinType || !cabin.cabinType._ref
    );
    if (invalidCabins.length > 0) {
      errors.push(`${invalidCabins.length} cabin(s) are missing a cabin type`);
    }
  }

  let status: ValidationSection["status"] = "complete"; // Default to complete since cabins are optional
  if (errors.length > 0) status = "error";

  return {
    id: "cabins",
    name: "Cabins",
    status,
    requiredFields,
    completedFields,
    errors,
  };
}

function validateAccommodation(
  formData: PackageRuleFormData
): ValidationSection {
  // Accommodation is optional, but if configured, it should be valid
  const requiredFields: string[] = [];
  const completedFields = [];
  const errors = [];

  // Check if accommodation configurations exist
  if (
    formData.rules?.accommodationInfo?.accommodations &&
    formData.rules.accommodationInfo.accommodations.length > 0
  ) {
    completedFields.push("rules.accommodationInfo.accommodations");

    // Check if all accommodation configurations have an accommodation type
    const invalidAccommodations =
      formData.rules.accommodationInfo.accommodations.filter(
        (acc) => !acc.accommodationType || !acc.accommodationType._ref
      );
    if (invalidAccommodations.length > 0) {
      errors.push(
        `${invalidAccommodations.length} accommodation(s) are missing an accommodation type`
      );
    }
  }

  let status: ValidationSection["status"] = "complete"; // Default to complete since accommodation is optional
  if (errors.length > 0) status = "error";

  return {
    id: "accommodation",
    name: "Accommodation",
    status,
    requiredFields,
    completedFields,
    errors,
  };
}
