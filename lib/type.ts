export type Test = {
  id: string;
  fetched: boolean;
  testResult: TestResult[];
  chartColor: string;
};

export type TestResult = {
  fetchTime: string;
  [TestResultKey.cls]: { score: number; numericValue: number };
  [TestResultKey.tbt]: { score: number; numericValue: number };
  [TestResultKey.lcp]: { score: number; numericValue: number };
};

export enum TestResultKey {
  cls = "cls",
  tbt = "tbt",
  lcp = "lcp",
}

// Define the AverageMetrics type
type AverageMetrics = {
  lcp: number;
  tbt: number;
  cls: number;
};

// Define the main type that includes the properties
export type TableData = {
  count: number;
  filePaths: string[];
  description: string;
  average: AverageMetrics;
};
