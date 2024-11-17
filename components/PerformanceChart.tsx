"use client";

import { Test, TestResultKey } from "@/lib/type";
import {
  ScatterChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Scatter,
} from "recharts";

type PerformanceChartProps = {
  data?: Test[];
  dataKey: TestResultKey;
};

export function PerformanceChart({ data, dataKey }: PerformanceChartProps) {
  return (
    <div className="flex flex-col justify-center items-center gap-8">
      <ScatterChart
        width={800}
        height={400}
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20,
        }}
      >
        <CartesianGrid />
        <XAxis
          type="number"
          dataKey="x"
          name="Time"
          domain={["auto", "auto"]}
          tickFormatter={(unixTime) => new Date(unixTime).toLocaleTimeString()}
        />
        <YAxis type="number" name="Value" unit="ms" />
        <Tooltip
          cursor={{ strokeDasharray: "3 3" }}
          formatter={(value: number) => [`${value.toFixed(2)}ms`]}
          labelFormatter={(label) => new Date(label).toLocaleString()}
        />
        <Legend />
        {data?.map((item) => (
          <Scatter
            name={item.id as string}
            data={item.testResult.map((point) => ({
              x: new Date(point.fetchTime).getTime(),
              [dataKey]: point[dataKey].numericValue,
            }))}
            fill={item.chartColor}
            key={item.id}
            dataKey={dataKey}
          />
        ))}
      </ScatterChart>
    </div>
  );
}
