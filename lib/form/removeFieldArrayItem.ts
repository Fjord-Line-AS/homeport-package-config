// lib/form/removeFieldArrayItem.ts
import { UseFormReturn, FieldValues, Path } from "react-hook-form";

export function removeFieldArrayItem<T extends FieldValues>(
  form: UseFormReturn<T>,
  name: Path<T>,
  index: number
) {
  const current = form.getValues(name);
  const updated = current ? [...current] : [];

  if (Array.isArray(updated)) {
    updated.splice(index, 1);
    form.setValue(name, updated as typeof current, {
      shouldValidate: true,
      shouldDirty: true,
    });
  } else {
    console.warn(
      `[removeFieldArrayItem] Expected array at ${name}, got:`,
      updated
    );
  }
}
