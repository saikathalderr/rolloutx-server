import type { Config } from "jest";

const config: Config = {
  clearMocks: true,
  preset: "ts-jest",
  verbose: true,
  testEnvironment: "node",
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.ts"],
  coverageDirectory: "coverage",
  testMatch: ["**/*.test.ts"],
  moduleNameMapper: {
    "@src/(.*)": "<rootDir>/src/$1",
    "@domains/(.*)": "<rootDir>/src/domains/$1",
    "@db": "<rootDir>/src/db.ts",
    "@role": "<rootDir>/src/domains/authentication/role.ts",
    "@messages": "<rootDir>/src/constants/messages/const.messages.ts",
  },
  transform: {
    "^.+\\.ts$": "ts-jest",
    "^.+\\.js$": "babel-jest",
  }
};

export default config;
