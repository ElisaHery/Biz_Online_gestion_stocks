var mysql = require("mysql");
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'biz_online',
  port: 8888,
  socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock'
});

connection.connect(function(err) {
  console.error(err);
  console.log('connected as id ' + connection.threadId);
});

const end = () => {
  connection.end();
};

const test = () => {
  connection.query('SELECT 1 + 1 AS solution', function(error, results) {
    if (error) throw error;
    // console.log('The solution is: ', results[0].solution);
  });
};


// INDEX PAGE 1 -----------------------------------------------------

const getProducts = (id, clbk) => {
  var q;
  if (id) {
    q = "SELECT * FROM produits WHERE id = ? "; //escape
  } else {
    // q = "SELECT * FROM produits"
    q = "SELECT p.id, p.nom , m.nom AS nom_marque, p.prix, p.description FROM produits p INNER JOIN marques m ON p.id_marque=m.id ORDER BY p.id";
  }

  connection.query(q, [id], function(error, results) { //connection défini ligne 2
    if (error) throw error;
    // console.log(results); // dans le terminal
    clbk(results); //affiche dans la console
  })
};


const createProduct = (clbk, data) => {

  const q = "INSERT INTO produits(id_marque, nom, prix, description) VALUES (?, ?, ?, ?) ";
  const payload = [data.id_marque, data.nom, data.prix, data.description];
  connection.query(q, payload, function(error, results, cols) {
    if (error) return clbk(error, null);
    return clbk(null, results);
  });
};

const deleteProduct = function(clbk, data) {
  const q = "DELETE FROM produits WHERE id = ? ";
  const payload2 = [data.id];
  console.log("DELETE bien arrivé dans database");
  connection.query(q, payload2, function(error, results) {
    if (error) return clbk(error, null);
    return clbk(null, results);
  });
};

const editProduct = function editProduct(clbk, data) {
  console.log("edit bien arrivé dans database");
  const q = "UPDATE produits SET nom = ?, prix = ?, description = ? WHERE id = ?";
  const payload3 = [data.nom, data.prix, data.description, data.id];
  // console.log(payload);
  connection.query(q, payload3, function(err, res, fields) {
    console.log(this.sql); // affiche la dernière requête SQL, pratique pour deboguer
    if (err) return clbk(err, null);
    return clbk(null, res);
  });
};

// MARQUES PAGE 2 -----------------------------------------------------


const getBrands = (id, clbk) => {
  var q;
  if (id) {
    q = "SELECT * FROM marques WHERE id = ? "; //escape
  } else {
    q = "SELECT * FROM marques"
  }

  // console.log(q);

  connection.query(q, [id], function(error, results) { //connection défini ligne 2
    if (error) throw error;
    // console.log(results); // dans le terminal
    clbk(results); //affiche dans la console
  })
};

const createBrand = (clbk, data) => {
  console.log("post bien arrivé dans database");
  const q = "INSERT INTO marques(nom) VALUES (?) ";
  const payload = [data.nom];
  // console.log(payload);
  connection.query(q, payload, function(error, results, cols) {
    if (error) return clbk(error, null);
    return clbk(null, results);
  });
};

const deleteBrand = function(clbk, data) {
  const q = "DELETE FROM marques WHERE id = ? ";
  const payload2 = [data.id];
  console.log("DELETE bien arrivé dans database");
  connection.query(q, payload2, function(error, results) {
    if (error) return clbk(error, null);
    return clbk(null, results);
  });
};

const editBrand = function editProduct(clbk, data) {
  console.log("edit bien arrivé dans database");
  const q = "UPDATE marques SET nom = ? WHERE id = ?";
  const payload = [data.nom, data.id];
  // console.log(payload);
  connection.query(q, payload, function(err, res, fields) {
    console.log(this.sql); // affiche la dernière requête SQL, pratique pour deboguer
    if (err) return clbk(err, null);
    return clbk(null, res);
  });
};

module.exports = {
  getProducts,
  createProduct,
  deleteProduct,
  editProduct,
  getBrands,
  createBrand,
  deleteBrand,
  editBrand,
  test,
  end,
};