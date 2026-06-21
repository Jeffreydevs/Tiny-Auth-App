const express = require("express");
const app = express();
const {email,password} = req.body

app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Hello Jeffrey")
})

app.post("/register",(req,res)=>{
   const {email,password} = req.body 
    if(email===""||password === ""){
        return res.send("Please fill all fields")
    }
    console.log("User can register")
    res.send("Register route working");
})

app.listen(3000,()=>{
    console.log("Server is running")
})