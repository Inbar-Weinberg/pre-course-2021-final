const express = require('express');

const app = express();
const POST=5000;

app.get("/b.json", (req, res) => {
    res.send('Hello');    
    
});


app.listen(POST, () => console.log('hello'));