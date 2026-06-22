const express = require("express");
const User = require("./model/user");
const bcrypt = require("bcryptjs")
const app = express();

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

    res.send("Login successful");
   }

 catch (error) {
        console.log(error);
        res.send("Something went wrong");
    }
});

app.listen(3000,()=>{
    console.log("Server is running")
})