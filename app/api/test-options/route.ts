import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const tests = await prisma.test.groupBy({
      by: "name",
    });

    const mapped = tests.map((test) => ({
      label: test.name,
      value: test.name,
    }));

    return NextResponse.json(
      {
        data: mapped,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch test records" },
      { status: 500 }
    );
  }
}
