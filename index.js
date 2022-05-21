#!/usr/bin/env node

/**
 * create-project
 * Bootstrap your next project from custom templates
 *
 * @author Stefan Vosloo <https://github.com/saulthebear>
 */

const init = require("./utils/init")
const cli = require("./utils/cli")
const log = require("./utils/log")
const inquirer = require("inquirer")

const input = cli.input
const flags = cli.flags
const { clear, debug } = flags

async function promptForMissingOptions(options) {
  const templates = ["express", "express-sync"]
  const defaultProjectName = "new-project"
  const defaultTemplate = templates[0]

  // Accept all defaults
  if (options.skipPrompts) {
    if (!options.projectName) options.projectName = defaultProjectName
    if (!options.template) options.template = defaultTemplate
    return options
  }

  const questions = []

  if (!options.projectName) {
    questions.push({
      type: "input",
      name: "projectName",
      message: "Project directory name:",
      default: defaultProjectName,
    })
  }

  if (!options.template) {
    questions.push({
      type: "list",
      name: "template",
      message: "Which project template would you like to use?",
      choices: templates,
      default: defaultTemplate,
    })
  }

  if (!options.git) {
    questions.push({
      type: "confirm",
      name: "git",
      message: "Initialize a git repository?",
      default: false,
    })
  }

  const answers = await inquirer.prompt(questions)

  return {
    ...options,
    projectName: options.projectName || answers.projectName,
    template: options.template || answers.template,
    git: options.git || answers.git,
  }
}

;(async () => {
  init({ clear })
  input.includes(`help`) && cli.showHelp(0)

  debug && log(flags)

  let options = {
    template: input[0],
    projectName: flags.name,
    skipPrompts: flags.yes,
    initializeGit: flags.git,
    install: flags.install,
  }

  options = await promptForMissingOptions(options)
  console.log("Options>>", options)

  const { createProject } = await import("./main.mjs")

  createProject(options)
})()
