const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');
var cors = require('cors');


// parse application/json
app.use(cors());
app.use(bodyParser.json());


//create database connection
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'restful_db'
});

//connect to database
conn.connect((err) =>{
    if(err) throw err;
    console.log('Mysql Connected...');
});

//show all products
app.get('/api/products',(req, res) => {
    let sql = "SELECT * FROM product";
    let query = conn.query(sql, (err, results) => {
        if(err) throw err;
        res.send(JSON.stringify(results));
    });
});

//show single product
app.get('/api/products/:id',(req, res) => {
    let sql = "SELECT * FROM product WHERE product_id="+req.params.id;
    let query = conn.query(sql, (err, results) => {
        if(err) throw err;
        res.send(JSON.stringify(results));
    });
});

//add new product
app.post('/api/products',(req, res) => {
    let data = {product_name: req.body.product_name, product_price: req.body.product_price};
    let sql = "INSERT INTO product SET ?";
    let query = conn.query(sql, data,(err, results) => {
        if(err) throw err;
        res.send(JSON.stringify(results));
    });
});

//update product
app.put('/api/products/:id',(req, res) => {
    let sql = "UPDATE product SET product_name='"+req.body.product_name+"', product_price='"+req.body.product_price+"' WHERE product_id="+req.params.id;
    let query = conn.query(sql, (err, results) => {
        if(err) throw err;
        res.send(JSON.stringify(results));
    });
});

//Delete product
app.delete('/api/products/:id',(req, res) => {
    let sql = "DELETE FROM product WHERE product_id="+req.params.id+"";
    let query = conn.query(sql, (err, results) => {
        if(err) throw err;
        res.send(JSON.stringify(results));
    });
});



//User dummy Login
//add new product
app.post('/api/canMakeDummyLogin',(req, res) => {
    let data = {username: req.body.username, password: req.body.password};
    let sql = "SELECT COUNT(username) as exist FROM user WHERE username='"+req.body.username+"' AND password='"+req.body.password+"'" ;
    let query = conn.query(sql, data,(err, results) => {
        // console.log(results);
        if(err)
            res.send(JSON.stringify(false));
        res.send(JSON.stringify(results));
    });
});

//Server listening
app.listen(3000,() =>{
    console.log('Server started on port 3000...');
});