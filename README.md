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

- **Framework**: Next.js 14 (App Router)
- **CMS**: Sanity.io
- **Validation**: Zod
- **UI**: Tailwind CSS + custom components

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

---

### 5. **Sanity Integration**

- Server actions:

  - `createPackageRule()`
  - `updatePackageRule()`
  - `deletePackageRule()`

- Server components handle Sanity reference data fetching
- Real-time updates are optionally supported using Sanity’s hooks

---

### 6. **Client vs Server**

- Data fetching always occurs server-side using `sanityFetch()`
- Client components only handle UI, interaction, and local state
- Sanity references are resolved on the server for performance & security

---

### 7. **Draft System**

- LocalStorage stores in-progress rules as JSON
- `usePackageRuleDraftWatcher` listens for unsaved changes
- Utilities:

  - `getPackageRuleDraft(id)`
  - `clearPackageRuleDraft(id)`

---

### 8. **Validation & Progress Tracking**

- `validatePackageRule()` validates entire rule object
- Each tab has granular validation logic
- Progress is calculated based on number of valid sections vs total
- Errors are displayed as badges and sidebar messages

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
  - Draft stored in localStorage
  - Save triggers `createPackageRule()`

- **Edit**:

  - Loads server data into form
  - Auto-merges with draft if present

- **Delete**:

  - Confirmation modal → `deletePackageRule()`

---

### 11. **Known Issues / Gotchas**

- After updating, the watcher may fire due to state mismatch, causing false drafts
- Weekdays checkboxes sometimes don't reflect correct state on first render
- Validation messages may mismatch display badges (especially for accommodation tab)

---
