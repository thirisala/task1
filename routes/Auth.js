const router= require("express").Router()
const pool = require("../db");
const bcrypt= require("bcrypt");



router.post("/register",async(req,res)=>{
    try {
        //get  name , email, password
        const {name, email,password}=req.body;

        //check if user exists
        const user=await pool.query("select * from register where user_email=$1", [email]);
        if(user.rows.length!=0){
            return res.status(401).send("user already exists");
        }

        //bcrypt the password
        const saltRound=10;
        const salt = await bcrypt.genSalt(saltRound);
        const bcryptPassword = await bcrypt.hash(password,salt);

        //enter the new user inside the database
        const newUser= await pool.query("Insert into register(user_name,user_email,user_password)values($1, $2,$3) RETURNING *",[name, email, bcryptPassword]);
        res.json(newUser.rows[0]);


        
    } catch (err) {
        console.log(err.message);
        res.status(500).send("server Error"); 
    }

});


//login


router.post("/login",async (req,res)=>{
    try {
        //get  email, password
        const { email,password}=req.body;


        //check if user doesn't exists
        const user=await pool.query("select * from register where user_email=$1", [email]);
        if(user.rows.length === 0){
            return res.status(401).send("password or email is incorrect");
        }

        // check if the incomming password is same or not
         const validPassword = await bcrypt.compare(password, user.rows[0].user_password);
        if(!validPassword){
            return res.status(401).send("password or Email is incorrect");
            
        }
        res.json('user exists');


        
    } catch (err) {
        console.log(err.message);
        res.status(500).send("server Error"); 
        
    }

});

module.exports = router;