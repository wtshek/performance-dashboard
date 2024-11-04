"use client";

import { Dashboard } from "@/components/Dashboard";
import { MultiSelect } from "@/components/MultiSelect";
import { useState } from "react";

export default function PerformanceDashboardPage() {
  const [options, setOptions] = useState([]);
  const onSelectChange = () => {};

  return (
    <div className="bg-black min-w-screen min-h-screen flex justify-center py-16">
      <div className="max-w-[1200px]">
        <MultiSelect options={options} onValueChange={onSelectChange} />
        <Dashboard />
      </div>
    </div>
  );
}
