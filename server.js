const express = require("express");
const User = require("./model/user");
const app = express();

app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Hello Jeffrey")
})

app.post("/register", async (req,res)=>{

    const {email,password} = req.body;

    if(email===""||password === ""){
        return res.send("Please fill all fields")
    }

    const existingUser = await User.findOne({email});

    if (existingUser){
        return res.send("Email already exists")
    }

    const user = {
        email,
        password
    }
    console.log(user)

    try{
     await User.create(user)
    }
    catch{
      res.send("Something went wrong")  
    }

    res.send("Register route working");
})

app.listen(3000,()=>{
    console.log("Server is running")
})