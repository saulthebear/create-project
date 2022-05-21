const express = require("express")
const ejsLayout = require("express-ejs-layouts")
const browserSync = require("browser-sync")

const app = express()
const PORT = 3000

// You can conditionally add routes and behavior based on environment
const isProduction = "production" === process.env.NODE_ENV

app.set("etag", isProduction)

// Use ejs for templates
app.set("view engine", "ejs")

// MIDDLEWARE
app.use((req, res, next) => {
  res.removeHeader("X-Powered-By")
  next()
})
app.use(express.static("public"))
app.use(ejsLayout)

// <-- Routes

// Start demo server
app.listen(PORT, () => console.log(`👂 Listening on localhost:${PORT}`))
app.listen(PORT, listening)

function listening() {
  console.log(`👂 Listening on http://localhost:${PORT}`)
  if (!isProduction) {
    // https://ponyfoo.com/articles/a-browsersync-primer#inside-a-node-application
    browserSync({
      files: [".{html,js,css}"],
      online: false,
      open: false,
      port: PORT + 1,
      proxy: "localhost:" + PORT,
      ui: false,
    })
  }
}
