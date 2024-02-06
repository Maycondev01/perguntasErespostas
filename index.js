const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const Pergunta = require("./database/Pergunta");
const Resposta = require("./database/Resposta");
const { where } = require("sequelize");
//Database

connection
    .authenticate()
    .then(() => {
        console.log("Conexão feita com o banco de dados!");
    })
    .catch((msgErro) => {
        console.log(msgErro);
    })

// Estou informando ao Express usar a EJS como View Engine.
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
    Pergunta.findAll({
        raw: true, order: [
            ['id', 'DESC'] // ASC = Crescente || DESC = Decrescente.
        ]
    }).then(perguntas => {
        res.render("index", {
            perguntas: perguntas
        });
    });
});

app.get("/perguntar", (req, res) => {
    res.render("perguntar", {

    });
})

app.post("/salvarpergunta", (req, res) => {
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    Pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(() => {
        res.redirect("/");
    });
});

app.get("/pergunta/:id", (req, res) => {
    var id = req.params.id;
    Pergunta.findOne({
        where: { id: id }
    }).then(pergunta => {
        if (pergunta != undefined) { // Pergunta encontrada.
            Resposta.findAll({
                where: {perguntaId: pergunta.id},
                order: [['id','DESC']]
            }).then((respostas) => {
                res.render("pergunta", {
                    pergunta: pergunta,
                    respostas: respostas
                });
            });
        } else { // Encontrada
            res.render("notfound")
        }
    });
});

app.post("/responder", (req, res) => {
    var corpo = req.body.corpo;
    var perguntaId = req.body.pergunta;
    Resposta.create({
        corpo: corpo,
        perguntaId: perguntaId
    }).then(() => {
        res.redirect("/pergunta/" + perguntaId);
    });
});

app.post("/pergunta/delete", (req,res) => {
    var id = req.body.id;
    if(id != undefined) {
        if(!isNaN(id)) {
            Pergunta.destroy({
                where: {
                    id: id
                }
            }).then(() => {
                res.redirect("/")
            })
        }
    } else {
        res.render("notfound");
    }
});

app.post("/resposta/delete", (req,res) => {
    var id = req.body.id;
    var perguntaId;

    if(id != undefined) {
        if(!isNaN(id)) {
            Resposta.findOne({
                where: {
                    id:id
                }
            }).then((resposta => {
                perguntaId = resposta.perguntaId;

                Resposta.destroy({
                    where: {
                        id: id
                    }
                }).then(() => {
                    res.redirect("/pergunta/" + perguntaId);
                }).catch((err) => {
                    console.log(err);
                    res.status(500).send("Erro ao excluir resposta")
                });
            })).catch(() => {
                res.render("notfound")
            })
        }
    } else {
        res.render("notfound");
    }
});

app.listen(3000, () => {
    console.log("Servidor Online!");
});