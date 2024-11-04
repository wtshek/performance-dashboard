import { NextResponse } from "next/server";
import { promises as fs } from "fs";

export async function GET(request: Request) {
  try {
    const { filePath } = await request.json();

    const file = await fs.readFile(process.cwd() + filePath, "utf8");
    const json = JSON.parse(file);
    const { fetchTime, audits } = json;

    return {
      fetchTime,
      lcp: {
        score: audits["largest-contentful-paint"].score,
        numericValue: audits["largest-contentful-paint"].numericValue,
      },
      tbt: {
        score: audits["total-blocking-time"].score,
        numericValue: audits["total-blocking-time"].numericValue,
      },
      cls: {
        score: audits["cumulative-layout-shift"].score,
        numericValue: audits["cumulative-layout-shift"].numericValue,
      },
    };
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to run script" },
      { status: 500 }
    );
  }
}
