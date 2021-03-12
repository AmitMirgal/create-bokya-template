#!/usr/bin/env node

const fs = require("fs-extra");
const path = require("path");
const prompts = require("prompts");
const got = require("got");
const tar = require("tar");
const { Stream } = require("stream");
const { promisify } = require("util");
const chalk = require("chalk");

const pipeline = promisify(Stream.pipeline);

(async () => {
  const response = await prompts([
    {
      type: "text",
      name: "app",
      message: `What is your project named?`,
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

  await pipeline(
    got.stream("https://codeload.github.com/AmitMirgal/bokya/tar.gz/master"),
    tar.extract([`bokya-master/${response.template}`])
  );

  await fs.move(
    path.resolve(`bokya-master/${response.template}`),
    path.resolve(`${response.app}`),
    (err) => {
      if (err) return console.error(err);
      console.log(`${chalk.cyanBright(`Successfully installed...`)}`);
    }
  );

  await fs.remove(path.resolve(`bokya-master`), (err) => {
    if (err) return console.error(err);
    console.log("success!");
  });
})();
