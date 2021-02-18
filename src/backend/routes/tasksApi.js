const express = require("express");
const fs = require("fs");
const taskRouter = express.Router();

taskRouter.use(express.json());

//
app = express();
const PORT = 5000;
app.use('/', taskRouter)
//


// get all tasks
taskRouter.get("/:id", (req, res) => {
    const id = req.params.id;
    const data = readFileSync('../tasks/task'+id+'.JSON', 
            {encoding:'utf8', flag:'r'});
            res.send(data);
});
    


//
app.listen(PORT);
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