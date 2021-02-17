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
    let compareId = task => task.id === parseInt(req.params.id);
    const foundId = tasks.some(compareId);
    if (foundId)
        res.json(tasks.filter(compareId));
    else
        res.status(400).json({ msg: `No tasks with the ID of ${req.params.id}` });
});
// create and add a new task
app.use(express.json());

app.post("/b", (req, res) => {
    tasks.push(req.body);
    res.json(tasks);
});

// update task
app.put("/b/:id", (req, res) => {
    const reqId = parseInt(req.params.id);
    const compareId = task => task.id === reqId;
    const foundId = tasks.some(compareId);
    if (foundId) {
        tasks.forEach(task => {
            if (compareId(task)) {
                task.text = req.body.text;
                task.priority = req.body.priority;
            }
        });
        res.json(tasks);
    }
    else
        res.status(400).json({ msg: `No tasks with the ID of ${req.params.id}` });
});
// delete task
app.delete("/b/:id", (req, res) => {
    const reqId = parseInt(req.params.id);
    const compareId = task => task.id === reqId;
    const foundId = tasks.some(compareId);
    if (foundId) {
        res.json({
            msg: 'task deleted',
            tasks: tasks.filter(task => task.id !== reqId)
        });
    }
    res.status(400).json({ msg: `No tasks with the ID of ${req.params.id}` });
});


// delete task





app.listen(PORT);