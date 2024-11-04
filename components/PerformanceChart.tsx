"use client";

import { useEffect, useState } from "react";
import {
  ScatterChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Scatter,
} from "recharts";

type PerformanceData = {
  fetchTime: string;
  lcp: { score: number; numericValue: number };
  tbt: { score: number; numericValue: number };
  cls: { score: number; numericValue: number };
};

type PerformanceChartProps = {
  data: PerformanceData[][];
  name: string;
  dotColor?: string;
};

export function PerformanceChart({
  data,
  name,
  dotColor,
}: PerformanceChartProps) {
  const [isClient, setIsClient] = useState(false);
  const chartData1 = data[0].map((item) => ({
    x: new Date(item.fetchTime).getTime(),
    lcp: item.lcp.numericValue,
    tbt: item.tbt.numericValue,
    cls: item.cls.numericValue * 1000,
  }));
  const chartData2 = data[1].map((item) => ({
    x: new Date(item.fetchTime).getTime(),
    lcp: item.lcp.numericValue,
    tbt: item.tbt.numericValue,
    cls: item.cls.numericValue * 1000,
  }));

  useEffect(() => setIsClient(true), []);

  if (!isClient) return;

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
        <Scatter
          name={"withResize"}
          data={chartData1}
          fill={dotColor || "#8884d8"}
          dataKey={name}
        />
        <Scatter
          name={"withoutResize"}
          data={chartData2}
          fill={"#8884d8"}
          dataKey={name}
        />
      </ScatterChart>
    </div>
  );
}
