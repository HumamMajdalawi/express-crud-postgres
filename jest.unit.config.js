module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/*.unit.test.ts"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.json",
    },
  },
};
