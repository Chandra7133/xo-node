require("./app/utils/config")
require("./app/utils/constants")
const express = require("express")
const cors = require("cors")
const app = express()
const routes = require("./app/routes")

app.use(cors())
app.use(express.json())
app.use(routes)
app.listen(PORT,()=>{
    console.log("listening on " + PORT)
})
