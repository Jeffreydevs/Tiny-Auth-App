require("dotenv").config();
const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const express = require("express");
const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const app = express();
const jwt = require("jsonwebtoken")

const User = require("./models/User");

app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Hello Jeffrey")
})

app.post("/register", async (req,res)=>{

  try{
        const {email,password} = req.body;

        if(email===""||password === ""){
            return res.send("Please fill all fields")
        }

        const existingUser = await User.findOne({email});

        if (existingUser){
            return res.send("Email already exists")
        };

        const hashedPassword = await bcrypt.hash(password,10)

        const user = {
            email,
            password: hashedPassword
        }
        console.log(user)

        await User.create(user)
        res.send("User registered successfully")
    }

  catch(error){
      console.log(error)
      res.send("Something went wrong")  
    }
})

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email === "" || password === "") {
        return res.send("Please fill all fields");
    }

    const user = await User.findOne({ email });

    if (!user) {
        return res.send("User not found");
    }

    const isPasswordCorrect = await bcrypt.compare(
        password,
        user.password
    );

    if (!isPasswordCorrect) {
        return res.send("Wrong password");
    }

    const token = jwt.sign({ id: user._id }, "secretkey");
    res.send(token);
   } 

  catch (error) {
    console.log(error);
    res.send("Something went wrong");
    }
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");

    app.listen(3000, () => {
      console.log("Server is running");
    });
  })
  .catch((error) => {
    console.log(error);
});