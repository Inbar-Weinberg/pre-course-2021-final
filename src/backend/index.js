const express = require('express');
const app = express();
const PORT = 5000;
const tasks = require("./b");

// get all tasks
app.get("/b", (req, res) => {
    res.json(tasks);
});

// get single task by ID
app.get("/b/:id", (req, res) => {
    let compareId = tasks => tasks.id === parseInt(req.params.id);
    const foundId = tasks.some(compareId);
    if (foundId)
        res.json(tasks.filter(compareId));
    else
        res.status(400).json({ msg: `No tasks with the ID of ${req.params.id}` });
});
// create and add a new task
app.post("/b", (req, res) => {
    res.send(red.body);
});




app.listen(PORT);