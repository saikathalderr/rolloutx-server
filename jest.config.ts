import type { Config } from "jest";

const config: Config = {
    preset: "ts-jest",
  verbose: true,
  testEnvironment: "node",
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.ts"],
  coverageDirectory: "coverage",
  testMatch: ["**/*.test.ts"],
  moduleNameMapper: {
    "@src/(.*)": "<rootDir>/src/$1",
  },
  transform: {
    "^.+\\.ts$": "ts-jest",
    "^.+\\.js$": "babel-jest",
  }
};

export default config;
