const express = require("express");
const app = express();
const path = require("node:path");
const HOST = process.env.PORT || '0.0.0.0';
const PORT = process.env.PORT || 8080;
const rootRoute = require("./routes/index");

app.use('/', express.static(path.join(__dirname, "build")));
app.use('/static', express.static(path.join(__dirname, "build", "static")));
app.use('/', rootRoute);
app.all('*', (req, res) => {
  res.status(404);

  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) { 
    res.json({message: "404 Not Found"});
  } else {
    res.type("txt").send("404 Not Found");
  }
});

app.listen(PORT, () => {
  console.log(`Server is listening on http://${HOST}:${PORT}`);
});