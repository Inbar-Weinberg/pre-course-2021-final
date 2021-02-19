const express = require("express");
const fs = require("fs");
const taskRouter = express.Router();
taskRouter.use(express.json());
/** note to self: express.json()
 * express.json() turns the req.body into JSON format
 * not to be confused with JSON.parse that takes a JSON and formats it into a JS object
 */

 const DB_ADDRESS = "../tasksDB"

// get task list by Id
taskRouter.get("/:id", getTaskListWithId);
function getTaskListWithId(req, res) {
    const id = req.params.id;
    if (!fs.existsSync(`${DB_ADDRESS}/${id}.json`)) {
        const errMsg = { message: "Invalid Bin Id provided" };
        res.status(400).send(errMsg);
    } else {
        fs.readFile(`${DB_ADDRESS}/${id}.json`, (err, data) => {
            if (err) {
                res.status(500).send("error: " + err);
            } else {
                res.status(200).send(JSON.parse(data)['my-todo']);
            }
        });
    }
}
module.exports = taskRouter;




/**
 * --- Callback vs Sync vs Promises
 * Sync does not return a error message, must use "try-catch-finally".
 * Promises must be accessed via 'fs = require("fs/promises");' or similar.
 *
 *
 * ---read---
 * fs.readdir - read directory
 * fs.readFile - reads file, default is "read as buffer"
 * fs.readFileSync - returns the content of the path
 *
 *
 * ---write---
 * fs.writeFile - override written file
 * fs.appendFile - add to the end of an all ready written file
 *
 * 
 * ---delete---
 * fs.unlink
 *
 *
 * --- getting info---
 * fs.existsSync - don"t use fs.exists
 * fs.stat
 *
 * ---streams---
 * fs.createReadStream(path[, options]) - creates readStream object
 * fs.createWriteStream(path[, options])- creates writeStream object
 *
 *
 */