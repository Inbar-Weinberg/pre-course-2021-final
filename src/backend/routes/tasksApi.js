const { response } = require("express");
const express = require("express");
const fs = require("fs");
const fsPromises = require("fs/promises");
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

taskRouter.get("/", getAllTaskLists);
function getAllTaskLists(req, res) {
    const dirPromise = fsPromises.readdir(DB_ADDRESS);
    dirPromise.then((allDbItems) => {
        if (allDbItems.length === 0) {
            res.status(404).send("you have no objects");
        } else {
            const arr = [];
            const promiseArr = [];
            for (const dbItem of allDbItems) {
                promiseArr.push(fsPromises.readFile(`${DB_ADDRESS}/${dbItem}`));
            }
            /**
             * this is a learning attempt to use  promise.all and fs/promise.
             */
            Promise.all(promiseArr)
                .then(responses => responses.forEach(
                    response => arr.push(JSON.parse(response))))
                .then(() => res.status(200).send(arr))
                .catch(error => res.status(500).send("error" + error))
                }
            });
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