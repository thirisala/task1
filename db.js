const Pool = require("pg").Pool

const pool =new Pool({
    user:"postgres",
    password:"root",
    host:"localhost",
    database:"practice",
    port:5432,
});

module.exports=pool;
