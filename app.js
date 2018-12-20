const express = require('express');
const app = express();
const path = require('path');

app.use('/', express.static(__dirname + '/'));

app.get('/home', (req,res)=>{
    res.sendFile(path.join(__dirname+'/ui/index.html'))
;});


app.listen(3000);

console.log("Running at Port 3000");