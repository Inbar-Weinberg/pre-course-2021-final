const express = require('express');
const app = express();
const PORT=5000;
const tasks = require("./b");

app.get("/", (req, res) => {
    res.json(tasks);      
});


app.listen(PORT);