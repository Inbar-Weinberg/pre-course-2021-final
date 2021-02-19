const express = require("express");
const app = express();
const PORT = 3000;
const taskRouter = require("./tasksApi");
const delayRouter = require("./delayApi");

app.use('/', delayRouter);
app.use('/', taskRouter);

app.listen(PORT, () => {
    console.log(`app listening on port: ${PORT}`);
  });
