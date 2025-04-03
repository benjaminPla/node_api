module.exports = {
  maxWorkers: "50%",
  preset: "ts-jest",
  setupFiles: ["dotenv/config"],
  silent: true,
  testEnvironment: "node",
  transform: {
    "^.+\\.[tj]sx?$": [
      "ts-jest",
      {
        useESM: true,
      },
    ],
  },
};
