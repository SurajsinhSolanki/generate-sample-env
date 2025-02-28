#!/usr/bin/env node

import * as fs from "fs";
import * as path from "path";

const args: string[] = process.argv.slice(2);
const envFilePath: string = args[0] || ".env";
const sampleEnvFilePath: string = args[1] || "env.sample";

export function generateSampleEnv(
  sourceFilePath: string,
  outputFilePath: string
): void {
  const resolvedEnvPath: string = path.resolve(process.cwd(), sourceFilePath);
  const resolvedSampleEnvPath: string = path.resolve(
    process.cwd(),
    outputFilePath
  );

  if (!fs.existsSync(resolvedEnvPath)) {
    console.error(`Error: The file ${resolvedEnvPath} does not exist.`);
    return;
  }

  fs.readFile(resolvedEnvPath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading .env file:", err);
      return;
    }

    const sampleEnv = data
      .split("\n")
      .filter((line: string) => {
        if (line && !line.startsWith("#")) {
          const [key] = line.split("=");
          return key && key.trim() !== "";
        }
        return false;
      })
      .map((line: string) => {
        const [key] = line.split("=").map((str) => str.trim());
        return `${key}=VALUE_HERE`;
      })
      .join("\n");

    fs.writeFile(
      resolvedSampleEnvPath,
      sampleEnv,
      "utf8",
      (writeErr: NodeJS.ErrnoException | null) => {
        if (writeErr) {
          console.error("Error writing .env.sample file:", writeErr);
        } else {
          console.log(`Sample .env file created at: ${resolvedSampleEnvPath}`);
        }
      }
    );
  });
}

if (require.main === module) {
  generateSampleEnv(envFilePath, sampleEnvFilePath);
}

