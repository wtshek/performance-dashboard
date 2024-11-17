import { NextResponse } from "next/server";
import { exec } from "child_process";
import prisma from "@/lib/prisma";
import { REPORT_FILEPATH } from "@/lib/CONST";
import { promises as fs } from "fs";
import path from "path";

export async function POST(request: Request) {
  try {
    const { url, testName, testNumber, description } = await request.json();

    const tests = [];

    for (let i = 1; i < testNumber + 1; i++) {
      const promise = new Promise((resolve) => {
        exec(
          `${process.cwd()}/scripts/lighthouse_script.sh "${url}" "${testName}_${i}"`,
          (err) => {
            if (err) {
              resolve(
                NextResponse.json(
                  { error: "Failed to run script" },
                  { status: 500 }
                )
              );
            }
            console.log("resolved");
            resolve(true);
          }
        );
      });

      tests.push(promise);

      await prisma.test.create({
        data: {
          name: testName,
          file_path: `${REPORT_FILEPATH}/${testName}_${i}.json`,
          description,
        },
      });
    }

    await Promise.all(tests);

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to run script" },
      { status: 500 }
    );
  }
}

const getMetricsAverage = async (
  filePaths: string[]
): Promise<{ lcp: number; cls: number; tbt: number }> => {
  const lcps: number[] = [];
  const tbts: number[] = [];
  const clss: number[] = [];

  for (const filePath of filePaths) {
    const file = await fs.readFile(
      path.join(process.cwd(), filePath as string),
      "utf8"
    );

    const json = JSON.parse(file);
    const { audits } = json;

    const lcp = audits["largest-contentful-paint"].numericValue;
    const tbt = audits["total-blocking-time"].numericValue;
    const cls = audits["cumulative-layout-shift"].numericValue;

    lcps.push(lcp);
    tbts.push(tbt);
    clss.push(cls);
  }

  return {
    lcp:
      lcps.reduce(
        (partialSum: number, a: number): number => partialSum + a,
        0
      ) / lcps.length,
    tbt:
      tbts.reduce((partialSum: number, a: number) => partialSum + a, 0) /
      tbts.length,
    cls:
      clss.reduce((partialSum: number, a: number) => partialSum + a, 0) /
      clss.length,
  };
};

export async function GET(request: Request) {
  try {
    const tests = await prisma.test.findMany();

    const mappedTests = tests.reduce((acc, cur) => {
      if (acc[cur.name]) {
        acc[cur.name].count += 1;
        acc[cur.name].filePaths.push(cur.file_path);

        return acc;
      }
      acc[cur.name] = {
        count: 0,
        filePaths: [cur.file_path],
        description: cur.description,
        average: {
          lcp: 0,
          cls: 0,
          tbt: 0,
        },
      };

      return acc;
    }, {} as { [key: string]: any });

    for (const [key, value] of Object.entries(mappedTests)) {
      const { filePaths } = value;
      const { lcp, cls, tbt } = await getMetricsAverage(filePaths);

      mappedTests[key].average = {
        lcp,
        tbt,
        cls,
      };
    }

    return NextResponse.json(mappedTests);
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { error: "Failed to run script" },
      { status: 500 }
    );
  }
}
