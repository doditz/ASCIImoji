var fs = require("fs");
const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

// @@dictionary

var content = "";

for ([key, values] of Object.entries(dictionary)) {
  if (typeof values.ascii === "function") {
    continue; // we need to skip functions as this is a static list
  }
  content += `${[...new Set([key, ...values.words])]} ${values.ascii}\n`;
}

fs.writeFileSync("./dist/text-file/asciimoji.txt", content);
