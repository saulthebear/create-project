const meow = require("meow")
const meowHelp = require("cli-meow-help")

const flags = {
  clear: {
    type: `boolean`,
    default: false,
    alias: `c`,
    desc: `Clear the console`,
  },
  noClear: {
    type: `boolean`,
    default: true,
    desc: `Don't clear the console`,
  },
  debug: {
    type: `boolean`,
    default: false,
    alias: `d`,
    desc: `Print debug info`,
  },
  version: {
    type: `boolean`,
    alias: `v`,
    desc: `Print CLI version`,
  },
  name: {
    type: "string",
    alias: "n",
    desc: "Project name",
  },
  git: {
    type: "boolean",
    alias: "g",
    desc: "Initialize project as a new git repo",
  },
  install: {
    type: "boolean",
    alias: "i",
    desc: "Install project dependencies",
  },
  yes: {
    type: "boolean",
    alias: "y",
    desc: "Skip prompts and use defaults",
  },
}

const commands = {
  help: { desc: `Print help info` },
}

const helpText = meowHelp({
  name: `create-project`,
  flags,
  commands,
})

const options = {
  inferType: true,
  description: false,
  hardRejection: false,
  flags,
}

module.exports = meow(helpText, options)
