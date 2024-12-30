const express = require("express")
const app = express()
const db = require("./config/db")
const cors = require("cors")

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

const port = 5000

app.get("/",(req,res)=>{
    res.json("hello")
})

app.post("/api/v1/register/user",require("./src/routes/registerUserRoutes"))
app.post("/api/v1/login",require("./src/routes/loginRoutes"))
app.post("/api/v1/create/content",require("./src/routes/addContentRoutes"))
app.get("/api/v1/show/content",require("./src/routes/showContentRoutes"))
app.delete("/api/v1/delete/content/:id",require("./src/routes/deleteContentRoutes"))
app.put("/api/v1/update/content/:id",require("./src/routes/updateContentRoutes"))
app.get("/api/v1/get/content/:id",require("./src/routes/getContentRoutes"))
app.listen(port,()=>{
    console.log(`http://localhost:${port}`);
})