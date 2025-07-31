## 🧱 Project Documentation Structure

### 1. **Overview**

This project is a rules-based configuration tool for travel packages. It enables admins to create, edit, and manage complex rule sets for customizing offers based on multiple criteria such as dates, ports, persons, accommodation, and more.

**Main features**:

- Tabbed form-based UI for rule creation
- Live draft and validation system
- Admin-only access via a protected interface
- Server-side Sanity integration for real-time persistence

**Target users**: Internal Fjord Line staff managing travel packages.

**Tech stack**:

- **Framework**: Next.js 15 (App Router)
- **CMS**: Sanity.io
- **Validation**: Zod
- **UI**: Tailwind CSS + custom components
- **Form Management**: React Hook Form

---

### 2. **Folder Structure**

```text
/app/actions/              # Server actions for CRUD operations
/components/admin/         # Admin-only UI components like PackageRuleForm
/lib/sanity/               # Sanity client, query helpers, fetch utilities
/lib/validation/           # Zod schemas and validation functions
/app/admin/package-rules/  # Admin page and routing logic for package rules
```

---

### 3. **Data Model**

The `PackageRule_v2` Sanity type defines the schema for all rule data:

- **Top-level fields**: `title`, `status`, `validFrom`, `validTo`, etc.
- **Nested structures**:

  - **Ports**: `fromPorts`, `toPorts`
  - **Persons**: age groups, counts
  - **Dates**: weekdays, date ranges
  - **Accommodation**: cabins, hotel codes, restrictions

---

### 4. **Form System**

- Core UI lives in `PackageRuleForm` component
- Uses a tabbed layout for categories like journey, persons, dates, accommodation, etc.
- Zod schema (`packageRuleSchema`) validates data per tab
- Uses localStorage to persist drafts with automatic recovery
- Drafts are synced to Sanity in real time using `useSanityDraftSync`

---

### 5. **Sanity Integration**

- Server actions:

  - `createPackageRule()`
  - `updatePackageRule()` (also deletes draft copy)
  - `deletePackageRule()`
  - `savePackageRuleDraft()` (uses `createOrReplace` with `drafts.` prefix)

- Server components handle Sanity reference data fetching
- Real-time updates are optionally supported using Sanity’s hooks

---

### 6. **Client vs Server**

- Data fetching always occurs server-side using `sanityFetch()`
- Client components only handle UI, interaction, and local state
- Sanity references are resolved on the server for performance & security

---

### 7. **Draft System**

- Drafts are written to Sanity under `drafts.` prefix with `createOrReplace`
- LocalStorage stores in-progress rules as JSON
- `useSanityDraftSync` ensures updates are pushed to Sanity during editing
- Utilities:

  - `getPackageRuleDraft(id)`
  - `clearPackageRuleDraft(id)`

---

### 8. **Validation & Progress Tracking**

- `validatePackageRule()` validates entire rule object
- Each tab has granular validation logic
- Progress is calculated based on number of valid sections vs total
- Errors are displayed as badges and sidebar messages
- Validation is triggered by watching the form and calling `getValues()` on mount

---

### 9. **UI/UX Components**

- Visual components:

  - Rule cards, pill badges, list views
  - Icon system for section states

- Form features:

  - Tabbed nav with validation state
  - Sidebar with section tips and links

---

### 10. **CRUD Flow**

- **Create**:

  - New rule button → `PackageRuleForm`
  - Draft stored in localStorage and synced to Sanity
  - Save triggers `createPackageRule()`

- **Edit**:

  - Loads server data into form
  - Auto-merges with local draft if present
  - Syncs changes to Sanity draft in real time

- **Delete**:

  - Confirmation modal → `deletePackageRule()`

- **Publish**:

  - `updatePackageRule()` writes to published doc and deletes draft

---

### 11. **Known Issues / Gotchas**

- Validation didn't initially trigger without `getValues()` on mount
- Weekdays checkboxes may not reflect correct state on first render
- Removing accommodations or nested items sometimes didn't trigger revalidation
- Form submission can get blocked if button types are incorrectly set
- Validation state may fall out of sync if external state mutates the form

---

### 12. **🐛 RHF Gotcha: Avoid `remove()` with `useFieldArray` When Sync Matters**

React Hook Form’s `useFieldArray().remove()` _seems_ like the right way to delete array items — until it isn’t.

If you're syncing form state live (like to Sanity or localStorage), **using `remove()` can screw you** in ways that are invisible at first:

#### ❌ The Problem

- `remove(index)` updates the internal RHF state.
- But if you're using `.watch()` or `form.getValues()` to sync or validate — they may not reflect the removed item correctly **immediately**.
- Some items may reappear due to a mismatch between internal field refs and `getValues()` output.
- Validation will report errors for fields that appear deleted in the UI but _still exist_ in RHF's internal state.

#### ✅ The Fix: Use `setValue()` Instead of `remove()`

You can remove items _manually_ with full control:

```tsx
<Button
  type="button"
  onClick={() => {
    const current = form.getValues(
      "rules.accommodationInfo.accommodations"
    );
    const updated = current ? [...current] : [];
    if (updated) {
      updated.splice(index, 1);
    }

    form.setValue(
      "rules.accommodationInfo.accommodations",
      updated,
      {
        shouldValidate: true,
        shouldDirty: true,
      }
    );
  }}
  variant="ghost"
  size="sm"
  className="text-destructive hover:text-destructive"
>
```

This avoids the RHF internal mutation race condition and guarantees that:

- 🧼 Draft sync stays correct
- 🧪 Validation sees the updated array
- 🧠 `watch()` and `getValues()` return the same result

#### 🔥 TL;DR

> If you're syncing or validating on change, don't trust `remove()`. Use `getValues` + `setValue`.
> Your future self (and every poor bastard reading this file) will thank you.

---
