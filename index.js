const express = require("express");
const app = express();
const cors =require("cors");


//middlewares
app.use(express.json());
app.use(cors());

app.use("/auth", require("./routes/Auth"));


app.listen(8000,()=>{
    console.log("server is running in the port 8000 ");
});
