const concurrently = require("concurrently");

concurrently(
  [
    {
      command:
        process.platform === "win32"
          ? "set BROWSER=none && set NODE_ENV=dev && set PORT=3000 && react-scripts start"
          : "BROWSER=none NODE_ENV=dev PORT=3000 react-scripts start",
      name: "renderer",
      prefixColor: "blue",
    },
    {
      command:
        process.platform === "win32"
          ? "wait-on -l -d 2000 tcp:3000 && electron ."
          : "wait-on -l -d 2000 tcp:3000 && electron .",
      name: "main",
      prefixColor: "green",
    },
  ],
  {
    prefix: "name",
    killOthers: ["failure", "success"],
    restartTries: 3,
    restartDelay: 1000,
  }
);
