#!/usr/bin/env node
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateSampleEnv = generateSampleEnv;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const args = process.argv.slice(2);
const envFilePath = args[0] || ".env";
const sampleEnvFilePath = args[1] || "env.sample";
function generateSampleEnv(sourceFilePath, outputFilePath) {
    const resolvedEnvPath = path.resolve(process.cwd(), sourceFilePath);
    const resolvedSampleEnvPath = path.resolve(process.cwd(), outputFilePath);
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
            .filter((line) => {
            if (line && !line.startsWith("#")) {
                const [key] = line.split("=");
                return key && key.trim() !== "";
            }
            return false;
        })
            .map((line) => {
            const [key] = line.split("=").map((str) => str.trim());
            return `${key}=VALUE_HERE`;
        })
            .join("\n");
        fs.writeFile(resolvedSampleEnvPath, sampleEnv, "utf8", (writeErr) => {
            if (writeErr) {
                console.error("Error writing .env.sample file:", writeErr);
            }
            else {
                console.log(`Sample .env file created at: ${resolvedSampleEnvPath}`);
            }
        });
    });
}
if (require.main === module) {
    generateSampleEnv(envFilePath, sampleEnvFilePath);
}
