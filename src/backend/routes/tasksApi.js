//const { response } = require("express");
const express = require("express");
const fs = require("fs");
const fsPromises = require("fs/promises");
const taskRouter = express.Router();
taskRouter.use(express.json());
/** note to self: what is express.json()?
 * express.json() turns the req.body into JSON format
 * not to be confused with JSON.parse that takes a JSON and formats it into a JS object
 */

const DB_ADDRESS = "./backend/tasksDB";
// address must be in relevance to package.json
const DATA_FORMAT = ".json";

// get task list by Id
taskRouter.get("/:id", getTaskListWithId);

function getTaskListWithId(req, res) {
  let id = req.params.id;
  let address = `${DB_ADDRESS}/${id}${DATA_FORMAT}`;

  if (!fs.existsSync(address)) {
    const errMsg = { message: "Invalid Bin Id provided" };
    res.status(400).send(errMsg);
  } else {
    fs.readFile(address, (err, data) => {
      if (err) {
        res.status(500).send("error: " + err);
      } else {
        res.status(200).send(JSON.parse(data)["my-todo"]);
      }
    });
  }
}

// get all TaskList and return an array containing all of them.
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
        .then((responses) =>
          responses.forEach((response) => arr.push(JSON.parse(response)))
        )
        .then(() => res.status(200).send(arr))
        .catch((error) => res.status(500).send("error" + error));
    }
  });
}

// Delete an item using a give ID
taskRouter.delete("/:id", (req, res) => {
  let id = req.params.id;
  let address = `${DB_ADDRESS}/${id}${DATA_FORMAT}`;

  if (!fs.existsSync(address)) {
    const errMsg = {
      message: "Bin not found or it doesn't belong to your account",
    };
    res.status(400).send(errMsg);
  } else {
    fsPromises
      .unlink(address)
      .then(() => res.status(200).send("success!"))
      .catch((err) => res.status(500).send("error" + err));
  }
});

// Update task by its ID
taskRouter.put("/:id", (req, res) => {
  const { body } = req;
  const id = req.params.id;
  const address = `${DB_ADDRESS}/${id}${DATA_FORMAT}`;
  if (!fs.existsSync(address)) {
    const errMsg = {
      message: "Bin not found.",
    };
    res.status(404).send(errMsg);
  } else {
    fs.writeFile(address, JSON.stringify(body, null, 4), (err) => {
      if (err) res.status(500).send("error" + err);
      else res.status(200).send(body);
    });
  }
});

// add a file list file
taskRouter.post("/", async (req, res) => {
  const { body } = req;
  const id = "task" + (1 + (await fsPromises.readdir(DB_ADDRESS)).length);

  const address = `${DB_ADDRESS}/${id}${DATA_FORMAT}`;

  if (Object.keys(body).length === 0) {
    res.status(400).send(`{
          "message": "Bin cannot be blank"
        }`);
  } else {
    fsPromises
      .writeFile(address, JSON.stringify(body, null, 4))
      .then(() => res.status(200).send(body))
      .catch((err) => res.status(500).send("error " + err));
  }
});

module.exports = taskRouter;

/**
 * --- Callback vs Sync vs Promises
 * Sync does not return a error message, must use "try-catch-finally".
 * Promises must be accessed via 'fs = require("fs/promises");' or similar.
 *
 * ---File path---
 * must be relative to process.cwd() find it using:
 * const process = require('process');
 * console.log(`Current directory: ${process.cwd()}`)
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
 * fs.existsSync -use this, don"t use fs.exists
 * fs.stat
 *
 * ---streams---
 * fs.createReadStream(path[, options]) - creates readStream object
 * fs.createWriteStream(path[, options])- creates writeStream object
 *
 */

/**
 * --- res.send()
 *
 * --- res.json()
 *
 */
