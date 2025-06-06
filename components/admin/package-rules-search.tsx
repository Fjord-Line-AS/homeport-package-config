"use client";

import { useState } from "react";
import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function PackageRulesSearch() {
  const [search, setSearch] = useState("");
  const [journeyType, setJourneyType] = useState<string>("");

  return (
    <div className="flex gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search rules by name or description..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>
      <Select value={journeyType} onValueChange={setJourneyType}>
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Journey Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Types</SelectItem>
          <SelectItem value="one-way">One Way</SelectItem>
          <SelectItem value="return">Return</SelectItem>
          <SelectItem value="multi-leg">Multi Leg</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
