const express = require('express');
const exphbs=require('express-handlebars');
const bodyparser=require('body-parser');
const mysql=require('mysql');

require('dotenv').config();

const app=express();
const port=process.env.PORT || 3000;

//parsing middleware
//parse application/x-form-urlencoded
app.use(bodyparser.urlencoded({extended:false}));

//parse application/json
app.use(bodyparser.json());

app.use(express.static('public'));

//template engine
const handlebars = exphbs.create({extname:'.hbs'});
app.engine('hbs',handlebars.engine);
app.set('view engine','hbs');

//connection pool
const pool = mysql.createPool({
    connectionlimit : 100,
    host            : process.env.DB_HOST,
    user            : process.env.DB_USER,
    password        : process.env.DB_PASS,
    database        : process.env.DB_NAME
});
// connect to DB
pool.getConnection((err,connection) => {
    if(err)throw err;
    console.log('connected as ID' + connection.threadId);

});


const routes = require('./server/routes/user');
app.use('/',routes);



 //listen port
app.listen(port, () => console.log('listening on port ${port}'));