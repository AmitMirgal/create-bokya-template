#!/usr/bin/env node

const fs = require("fs-extra");
const path = require("path");
const prompts = require("prompts");
const { execSync } = require("child_process");

(async () => {
  const response = await prompts([
    {
      type: "text",
      name: "app",
      message: `What's your App name should be?`,
    },
    {
      type: "select",
      name: "template",
      message: "Pick template",
      choices: [
        { title: "Nextjs", value: "nextjs-co" },
        { title: "Reactjs", value: "reactjs-co" },
      ],
    },
  ]);

  if (!fs.existsSync(response.app)) {
    fs.mkdirSync(response.app);
  }

  execSync("git clone https://github.com/AmitMirgal/bokya.git", {
    stdio: [0, 1, 2], // we need this so node will print the command output
    cwd: path.resolve(response.app), // path to where you want to save the file
  });

  /* fs.copy(
    path.resolve(__dirname, `../../${response.template}`),
    path.resolve(response.app),
    { overwrite: true }
  )
    .then(() => {
      console.log("success!");
    })
    .catch((err) => {
      console.error(err);
    }); */
})();
