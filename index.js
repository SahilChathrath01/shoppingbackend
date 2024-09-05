const express = require('express')
const app = express()
const db = require('./server/config/db')
const seed = require("./server/config/seed")
const cors = require("cors")
app.use(cors())
app.use(express.static("./server/public"))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


app.get("/", (req, res) => {
    res.send("welcome to server")
})
// ? Admin Routes
const adminRoutes = require('./server/routes/adminRoutes')
app.use("/admin", adminRoutes)

// *Customer Routes
const customerRoutes = require("./server/routes/customerRoutes")
app.use("/customer", customerRoutes)

app.listen(5000, (err) => {
    if (err) {
        console.log("error");
    }
    else {
        console.log("server is running");
    }
})
