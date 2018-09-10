const express = require("express");
const app = express();
const database = require("./database");
const path = require("path");
const port = 5000;

database.test();

app.use(express.json({
  extended: false
}));

app.use(express.static(__dirname + '/public', { //sait qu'il faut aller chercher dans public
  extensions: ['html']
}));

// INDEX PAGE 1 --------------------------------------------------

app.get('/', function(req, res) { // renvoie la page index
  res.sendFile(path.join(__dirname + '/index.html'));
}); // si notre url c'est /, sert nous index.html

app.get('/get-products', function(req, res) { //requete, reponse
  database.getProducts(null, function(result) {
    res.send(result)
  });
});

app.post('/create-product', function(req, res) {
  console.log(req.body);
  database.createProduct(function(err, dataset) {
    res.send(dataset);
  }, req.body);
});

app.delete('/delete-product', function(req, res) {
  console.log(req.body);

  database.deleteProduct(function(err, dataset) {
    res.send(dataset);
  }, req.body);
})

app.patch('/edit-product', (req, res) => {
  console.log("edit bien arrivé dans index.js");
  database.editProduct((err, dataset) => {
    if (err) return res.status(500).send(err);
    else return res.status(200).send(dataset);
  }, req.body);
});


// MARQUES PAGE 2 --------------------------------------------------

app.get('/marques', function(req, res) { // renvoie la page index
  res.sendFile(path.join(__dirname + '/marques.html'));
}); // si notre url c'est /, sert nous index.html

app.get('/get-brands', function(req, res) { //requete, reponse
  console.log("get effectué");
  database.getBrands(null, function(result) {
    res.send(result)
  });
});


app.post('/create-brand', function(req, res) {
  // console.log(req.body);
  console.log("POST bien arrivé dans index.js");
  database.createBrand(function(err, dataset) {
    res.send(dataset);
  }, req.body);
});


app.delete('/delete-brand', function(req, res) {
  console.log(req.body);
  console.log("DELETE bien arrivé dans index.js");
  database.deleteBrand(function(err, dataset) {
    res.send(dataset);
  }, req.body);
})

app.patch('/edit-brand', (req, res) => {
  console.log("edit bien arrivé dans index.js");
  database.editBrand((err, dataset) => {
    if (err) return res.status(500).send(err);
    else return res.status(200).send(dataset);
  }, req.body);
});


app.listen(port, function() { //ecoute les connexions
  console.log(`server waiting => http://localhost:${port}`);
})