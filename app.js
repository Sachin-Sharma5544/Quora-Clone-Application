const path = require("path");

const express = require("express");
const app = express();

//Important variables declarations
const PORT = 5000;
const dirname = __dirname;
const staticFolder = "static";

const welcomePage = "welcomePage.hbs";
const viewsFolder = "views";

app.use(express.static(path.join(dirname, staticFolder)));

//Setting view engine
app.set("view engine", "hbs");

app.get("/", (req, res) => {
    res.render(path.join(dirname, viewsFolder, welcomePage), {
        title: "Quora",
    });
});

app.listen(PORT, "localhost", () => {
    console.log(`Server started at port ${PORT}`);
});
