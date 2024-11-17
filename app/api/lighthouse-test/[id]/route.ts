import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import prisma from "@/lib/prisma";
import path from "path";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const tests = await prisma.test.findMany({
      where: { name: (id as string).replace("+", " ") },
      orderBy: {
        createdAt: "desc",
      },
    });

    const promises = tests.map(async (tests) => {
      const file = await fs.readFile(
        path.join(process.cwd(), tests?.file_path as string),
        "utf8"
      );
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
    });

    const result = await Promise.all(promises);

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch test records" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const tests = await prisma.test.findMany({
      where: { name: (id as string).replace("+", " ") },
    });

    await prisma.test.deleteMany({
      where: { name: (id as string).replace("+", " ") },
    });

    tests.forEach((test) => {
      fs.unlink(test.file_path);
    });

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Failed to fetch test records" },
      { status: 500 }
    );
  }
}
