"use client";

import React, { useEffect } from "react";

// import { PerformanceChart } from "@/components/PerformanceChart";
// import { CreateTestForm } from "@/components/CreateTestForm";
// const numberOfFiles = 10;

// const getReportFilePath = (fileName: string, number: number) => {
//   const reportsPath = `/reports`;
//   return `${reportsPath}/${fileName}${number + 1}.json`;
// };

// const getFilePaths = (fileName: string, numberOfFiles: number) => {
//   const arr = [];
//   for (let i = 0; i < numberOfFiles; i++) {
//     arr.push(getReportFilePath(fileName, i));
//   }

//   return arr;
// };

// function calculateAverages(data) {
//   const totals = data.reduce(
//     (
//       sum: {
//         lcp: number;
//         cls: number;
//         tbt: number;
//       },
//       entry: {
//         lcp: {
//           numericValue: number;
//         };
//         tbt: {
//           numericValue: number;
//         };
//         cls: {
//           numericValue: number;
//         };
//       }
//     ) => {
//       sum.lcp += entry.lcp.numericValue;
//       sum.tbt += entry.tbt.numericValue;
//       sum.cls += entry.cls.numericValue;
//       return sum;
//     },
//     { lcp: 0, tbt: 0, cls: 0 }
//   );

//   const count = data.length;
//   return {
//     averageLCP: (totals.lcp / count).toFixed(2),
//     averageTBT: (totals.tbt / count).toFixed(2),
//     averageCLS: (totals.cls / count).toFixed(2),
//   };
// }

export const Dashboard = () => {
  //   const baselineFiles = getFilePaths("withResize", numberOfFiles);
  //   const normalTemplateFiles = getFilePaths("withoutResize", numberOfFiles);
  //   const baseLinePromises = baselineFiles.map(readingFile);
  //   const baselineData = await Promise.all(baseLinePromises);
  //   const baselineAverages = calculateAverages(baselineData);
  //   const normalTemplatePromises = normalTemplateFiles.map(readingFile);
  //   const normalTemplateData = await Promise.all(normalTemplatePromises);
  //   const normalAverages = calculateAverages(normalTemplateData);

  //   const onTestComplete = (isFinished: boolean, testName?: string) => {
  //     if (isFinished) return;

  //     // TODO: handle error
  //   };

  useEffect(() => {}, []);

  return <div></div>;

  //   return (
  //     <div className="flex flex-col justify-center items-center min-h-screen">
  //       <div className="space-y-2">
  //         <div>With Preload</div>
  //         <div>
  //           <div>Average LCP: {baselineAverages.averageLCP}ms</div>
  //           <div>Average TBT: {baselineAverages.averageTBT}ms</div>
  //           <div>Average CLS: {baselineAverages.averageCLS}ms</div>
  //         </div>
  //       </div>
  //       <div className="space-y-2">
  //         <div>Without Preload</div>
  //         <div>
  //           <div>Average LCP: {normalAverages.averageLCP}ms</div>
  //           <div>Average TBT: {normalAverages.averageTBT}ms</div>
  //           <div>Average CLS: {normalAverages.averageCLS}ms</div>
  //         </div>
  //       </div>
  //       <PerformanceChart
  //         data={[baselineData, normalTemplateData]}
  //         name="lcp"
  //         dotColor="#00ff00"
  //       />
  //       <PerformanceChart
  //         data={[baselineData, normalTemplateData]}
  //         name="tbt"
  //         dotColor="#FFFF00"
  //       />
  //       <PerformanceChart
  //         data={[baselineData, normalTemplateData]}
  //         name="cls"
  //         dotColor="#FF0000"
  //       />
  //       <CreateTestForm />
  //     </div>
  //   );
};
