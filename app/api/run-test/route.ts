import { exec } from "child_process";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { url, testName } = await request.json();

    return new Promise((resolve) => {
      exec(
        `${process.cwd()}/scripts/lighthouse_script.sh "${url}" "${testName}"`,
        (error, stdout, stderr) => {
          if (error) {
            console.error(`Error: ${error}`);
            resolve(
              NextResponse.json({ error: error.message }, { status: 500 })
            );
            return;
          }

          resolve(
            NextResponse.json({
              message: "Script executed successfully",
              output: stdout,
            })
          );
        }
      );
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to run script" },
      { status: 500 }
    );
  }
}
