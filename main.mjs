import chalk from "chalk"
import fs from "fs"
import ncp from "ncp"
import path from "path"
import { promisify } from "util"

// const chalk = require("chalk")
// const fs = require("fs")
// const ncp = require("ncp")
// const path = require("path")
// const { promisify } = require("util")

const access = promisify(fs.access)
const copy = promisify(ncp)

async function copyTemplateFiles(options) {
  return copy(options.templateDirectory, options.targetDirectory, {
    clobber: false, // Don't overwrite
  })
}

export async function createProject(options) {
  // Set destination (target) if there is none
  if (!options.targetDirectory) {
    options.targetDirectory = `${process.cwd()}/${options.projectName}`
  }

  const currentFileUrl = import.meta.url
  const templateDir = path.resolve(
    new URL(currentFileUrl).pathname,
    "../templates",
    options.template.toLowerCase()
  )

  options.templateDirectory = templateDir

  // Check if template is available in templates/<Template Name>
  try {
    await access(templateDir, fs.constants.R_OK)
  } catch (err) {
    console.error("%s Invalid template name", chalk.red.bold("ERROR"))
    process.exit(1)
  }

  console.log("Copy project files")
  await copyTemplateFiles(options)

  console.log("%s Project ready", chalk.green.bold("DONE"))
  return true
}
