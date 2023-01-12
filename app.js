const path = require("path");

const hbs = require("hbs");
const express = require("express");
const app = express();

//Important variables declarations
const PORT = 5001;
const dirname = __dirname;
const staticFolder = "static";

const welcomePage = "welcomePage.hbs";
const articlesPage = "articlesPage.hbs";
const viewsFolder = "views";

app.use(express.static(path.join(dirname, staticFolder)));

//Setting view engine
app.set("view engine", "hbs");

hbs.registerPartials(__dirname + "/views/partials");

app.get("/", (req, res) => {
    res.render(path.join(dirname, viewsFolder, welcomePage), {
        title: "Jawaab Paao",
    });
});

app.get("/articles", (req, res) => {
    res.render(path.join(dirname, viewsFolder, articlesPage), {
        title: "Jawaab Paao ",
    });
});

app.listen(PORT, "localhost", () => {
    console.log(`Server started at port ${PORT}`);
});
