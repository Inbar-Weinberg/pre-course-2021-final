const express = require("express");
const fs = require("fs");
const taskRouter = express.Router();
taskRouter.use(express.json());




// get tasks 
taskRouter.get("/:id", (req, res) => {
    const id = req.params.id;
    //   const data = fs.readFileSync('../tasks/task' + id + '.json',
    //       { encoding: 'utf8', flag: 'r' });
    res.send(id);
});
module.exports = taskRouter;


//
/**
 *
 try {
        fs.readdir("../tasks", (err, files) => {
            files.forEach(file => {
                console.log(file);
                res.send('hello');
                });
            });

    } catch (err) {
        console.log('there was an error:', err.message);
    }
})
*/