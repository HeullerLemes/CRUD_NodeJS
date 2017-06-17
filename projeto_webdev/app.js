const express = require('express')  
var mysql = require('mysql'); 
const bodyParser = require('body-parser')
const app = express()  
const port = 3001

app.use(bodyParser.urlencoded({ extended: false }))

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "23105200",
  database: "NTIER"
});

app.get('/', (request, response) => {  
  response.sendFile(__dirname+'/home.html')
})

app.get('/listarAlbuns', (request, response) => {  
    con.query("SELECT * FROM ALBUM", function (err, result) {
        if (err) throw err;
        response.send(result)

        });
})

app.post('/inserirAlbum', function (req, res) {
    var sql = `INSERT INTO ALBUM (nome, artista, ano) VALUES ('${req.body.Nome}', '${req.body.Artista}', '${req.body.Ano}')`;
    con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
    });
})

app.post('/alterarAlbum', function (req, res) {
      var sql = `UPDATE ALBUM SET NOME = '${req.body.Nome}', ARTISTA = '${req.body.Artista}', ANO = '${req.body.Ano}' WHERE ALBUM_ID = '${req.body.Id}'`;
      con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record updated");
        });
})

app.post('/excluirAlbum', function (req, res) {
    var sql = `DELETE FROM ALBUM WHERE ALBUM_ID = '${req.body.Id}'`;
    con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record deleted");
    });
})

app.listen(port, (err) => {  
  if (err) {
    return console.log('something bad happened', err)
  }  console.log(`server is listening on ${port}`)
})