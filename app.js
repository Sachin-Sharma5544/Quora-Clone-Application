const path = require("path");

const methodOverride = require("method-override");
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

let num;

app.use(express.static(path.join(dirname, staticFolder)));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

//Setting view engine
app.set("view engine", "hbs");

hbs.registerPartials(__dirname + "/views/partials");

let articles = [
    {
        id: 1,
        author: "Sachin Kumar Sharma",
        authorInterest: "Observer of Indian politics",
        question: "What do you think of India's economic growth in 2023?",
        answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt harum eum repudiandae, nobis rerum laboriosam rem vitae corporis maxime atque porro error voluptatum dolorem quam ducimus culpa aliquam at. Iste debitis dicta consequuntur quos, dolorem consequatur, explicabo minus excepturi eveniet optio repellendus. Explicabo reprehenderit accusantium eius. Quasi nihil quas a doloribus soluta fuga dicta impedit fugiat! Consectetur esse aliquam dolores at laboriosam iusto vel ipsa dolorem, optio modi aperiam! Distinctio nobis hic natus atque ea ipsam. Asperiores nihil ducimus ipsum praesentium aut quaerat atque id at vel accusantium dolores, nobis, rem necessitatibus, quo sunt quae impedit animi est nulla laboriosam. Quod fuga cum veritatis itaque voluptatibus odio magnam perferendis fugit quam adipisci dignissimos ex quo, sint natus dolorem impedit a ullam optio pariatur voluptate quasi ipsum debitis, distinctio doloremque. Quo quis eius non. Rem impedit totam quidem veniam qui esse iusto provident est obcaecati ratione. Error voluptatum aliquam alias facilis.",
    },
    {
        id: 2,
        author: "Aman Gupta",
        authorInterest: "Science & Technology",
        question: "Do you have any knowledge to share about Jupiter Rings?",
        answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt harum eum repudiandae, nobis rerum laboriosam rem vitae corporis maxime atque porro error voluptatum dolorem quam ducimus culpa aliquam at. Iste debitis dicta consequuntur quos, dolorem consequatur, explicabo minus excepturi eveniet optio repellendus. Explicabo reprehenderit accusantium eius. Quasi nihil quas a doloribus soluta fuga dicta impedit fugiat! Consectetur esse aliquam dolores at laboriosam iusto vel ipsa dolorem, optio modi aperiam! Distinctio nobis hic natus atque ea ipsam. Asperiores nihil ducimus ipsum praesentium aut quaerat atque id at vel accusantium dolores, nobis, rem necessitatibus, quo sunt quae impedit animi est nulla laboriosam. Quod fuga cum veritatis itaque voluptatibus odio magnam perferendis fugit quam adipisci dignissimos ex quo, sint natus dolorem impedit a ullam optio pariatur voluptate quasi ipsum debitis, distinctio doloremque. Quo quis eius non. Rem impedit totam quidem veniam qui esse iusto provident est obcaecati ratione. Error voluptatum aliquam alias facilis.",
    },
];

num = articles.length + 1;

//This is for rendering landing Page
app.get("/", (req, res) => {
    res.render(path.join(dirname, viewsFolder, welcomePage), {
        title: "Jawaab Paao",
    });
});

// for rendering all articles
app.get("/articles", (req, res) => {
    res.render(path.join(dirname, viewsFolder, articlesPage), {
        title: "Jawaab Paao ",
        articles: articles,
        hasArticles: articles.length > 0,
    });
});

// adding article
app.post("/articles", (req, res) => {
    const { authorName, authorInterest, authorQuestion, authorAnswer } =
        req.body;
    articles.push({
        id: num,
        author: authorName,
        authorInterest: authorInterest,
        question: authorQuestion,
        answer: authorAnswer,
    });
    console.log(articles);
    num++;
    res.redirect("/articles");
});

//Rendering Create new page
app.get("/article/new", (req, res) => {
    res.render("createArticle");
});

// render single article
app.get("/articles/:id", (req, res) => {
    const { id } = req.params;
    const myFilteredArt = articles.filter(
        (article) => article.id === parseInt(id)
    );
    res.render("showArticle", {
        articles: myFilteredArt,
        hasArticles: myFilteredArt.length > 0,
    });
});

//rendering Edit page
app.get("/articles/:id/edit", (req, res) => {
    const { id } = req.params;
    const myFilteredArt = articles.filter(
        (article) => article.id === parseInt(id)
    );
    console.log(myFilteredArt[0]);
    res.render("editArticle", { articles: myFilteredArt[0] });
});

//Updating the article
app.put("/articles/:id", (req, res) => {
    const { id } = req.params;
    let myIndex = -1;
    articles.forEach((article, index) => {
        if (article.id === parseInt(id)) {
            myIndex = index;
        }
    });

    const { authorName, authorInterest, authorQuestion, authorAnswer } =
        req.body;
    articles[myIndex].author = authorName;
    articles[myIndex].authorInterest = authorInterest;
    articles[myIndex].question = authorQuestion;
    articles[myIndex].answer = authorAnswer;
    res.redirect("/articles");
});

// Deleting the article
app.delete("/articles/:id", (req, res) => {
    const { id } = req.params;
    articles = articles.filter((article) => article.id !== parseInt(id));
    res.redirect("/articles");
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server started at port ${PORT}`);
});
