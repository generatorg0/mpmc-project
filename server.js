const express = require("express");
const { exec } = require("child_process");
const path = require("path");
const ngrok = require("ngrok");

const app = express();
const port = 3000;

let url;
(async () => {
  url = await ngrok.connect(port);
  console.log("url: ", url);
})();

// Serve static files from the 'public' directory
app.use(express.static(__dirname + "/public"));

// Serve index.html for the root route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Serve style.css with the correct MIME type
app.get("/style.css", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "style.css"));
});

app.post("/run_script", (req, res) => {
  // Add code here to execute your Python script
  // For example, using child_process.exec:
  exec("python helloworld.py", (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      res.status(500).send("Error executing script");
      return;
    }
    console.log(`Script output: ${stdout}`);
    res.status(200).send("Script executed successfully");
  });
});

app.get("/runcmd", (req, res) => {
  const command = req.query.command || "ls";

  exec(command, (error, stdout, stderr) => {
    if (error) {
      res.status(500).send(`Error: ${error.message}`);
      return;
    }

    res.send(`<pre>${stdout || stderr}</pre>`);
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

function recievedImage(image) {
  console.log("Recived image called: ", image);
  if (!url) console.log("url not set");

  console.log(`${url}/${image}/`);
  app.get(`/${image}/`, (req, res) => {
    res.sendFile(__dirname + `/images/${image}`);
  });
}
setTimeout(() => recievedImage("znmdpic2.png"), 5000);
