const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const Question = require("./database/Question");
const Answer = require("./database/Answer");

// database
connection
    .authenticate()
    .then(() => {
        console.log("Database connected");
    })
    .catch((errorMsg) => {
        console.log(errorMsg);
    });

// set to use ejs
app.set('view engine', 'ejs');
app.use(express.static('public'));

// body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// routes
app.get("/", (req, res) => {
    
    Question.findAll({
        raw: true, 
        attributes: ['id', 'title', 'description'], 
        order:[
            ['updatedAt','DESC']
        ]
    }).then(questions => {
        res.render("index", {
            questions: questions
        });
    });
});

app.get("/ask", (req, res) => {
    res.render("ask");
});

app.post("/savequestion", (req, res) => {
    
    var title = req.body.title;
    var desc = req.body.description;

    Question.create({
        title: title,
        description: desc
    }).then(() => {
        res.redirect("/")
    }).catch(error => {
        console.log(error);
    });
});

app.get("/question/:id", (req, res) => {
    var id = req.params.id;
    Question.findByPk(id, { raw: true, attributes: ['id', 'title', 'description']})
        .then(question => {
            if(question) {

                Answer.findAll({
                    raw: true, 
                    attributes: ['body'], 
                    order:[
                        ['updatedAt','DESC']
                    ],
                    where: {questionId: id}
                }).then(answers => {
                    res.render("question", {
                        question: question,
                        answers: answers
                    });
                });
            } else {
                res.redirect("/");
            }
        });
});

app.post("/answer", (req, res) => {
    var body = req.body.body;
    var questionId = req.body.questionId;

    Answer.create({
        body: body,
        questionId: questionId
    }).then(() => {
        res.redirect("/question/"+questionId);
    }).catch(error => {
        console.log(error);
    });
});

app.listen(8080, () => {console.log("App is running.")});