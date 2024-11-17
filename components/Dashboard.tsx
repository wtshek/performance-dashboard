"use client";

import React from "react";
import { PerformanceChart } from "@/components/PerformanceChart";
import { Test, TestResult, TestResultKey } from "@/lib/type";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

type DashboardProp = {
  data?: Test[];
};

export const Dashboard = ({ data }: DashboardProp) => {
  return (
    <>
      <Collapsible>
        <CollapsibleTrigger>Show Charts</CollapsibleTrigger>
        <CollapsibleContent>
          <div className="flex flex-col justify-center items-center min-h-screen">
            <div className="flex justify-center items-center flex-col mt-10">
              <div>LCP</div>
              <PerformanceChart data={data} dataKey={TestResultKey.lcp} />
            </div>
            <div className="flex justify-center items-center flex-col">
              <div>TBT</div>
              <PerformanceChart data={data} dataKey={TestResultKey.tbt} />
            </div>
            <div className="flex justify-center items-center flex-col">
              <div>CLS</div>
              <PerformanceChart data={data} dataKey={TestResultKey.cls} />
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </>
  );
};
