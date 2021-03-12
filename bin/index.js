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
        { title: "Redwoodjs", value: "redwoodjs-co" },
      ],
    },
  ]);

  await pipeline(
    got.stream("https://codeload.github.com/AmitMirgal/bokya/tar.gz/master"),
    tar.extract([`bokya-master/${response.template}`])
  );

  try {
    fs.moveSync(
      path.resolve(`bokya-master/${response.template}`),
      path.resolve(`${response.app}`)
    );
    console.log(
      `${chalk.cyanBright(`Hang on template creation is in process...`)}`
    );
  } catch (error) {
    console.error(err);
  }

  try {
    fs.removeSync(path.resolve(`bokya-master`));
    console.log(
      `${chalk.magentaBright(`
    #####   ####  #    # #   #   ##   
    #    # #    # #   #   # #   #  #  
    #####  #    # ####     #   #    # 
    #    # #    # #  #     #   ###### 
    #    # #    # #   #    #   #    # 
    #####   ####  #    #   #   #    # 
    `)}
    ${chalk.blue(`${chalk.underline(`Template is ready to use.`)}`)}

    ${chalk.yellow(`🚀 Happy coding hours 🚀`)}`
    );
  } catch (error) {
    console.error(err);
  }
})();
