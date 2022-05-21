const express = require("express")
const ejsLayout = require("express-ejs-layouts")

const app = express()

const PORT = 3000

// Use ejs for templates
app.set("view engine", "ejs")

// MIDDLEWARE
app.use(express.static("public"))
app.use(ejsLayout)

// <-- Routes

// Start server
app.listen(PORT, () => console.log(`👂 Listening on localhost:${PORT}`))
