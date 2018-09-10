var container = (function container() {



  const url = "http://localhost:5000/";
  var tbody, newTr, edit_icon, suppr_icon, Td_parent, Tr_parent, icon_edit, icon_valid;

  /** REALISE L'APPEL AJAX */
  const doAjax = function doAjax(url, method, callback, data) {
    try {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url);
      xhr.setRequestHeader('Content-Type', 'application/json');
      data = data ? JSON.stringify(data) : null; //if data truthy prends ça et colle la dans cette partie là

      if (method.toLowerCase() === "post") {
        if (!data) throw new Error("bad call");
      }
      xhr.onload = evt => callback(evt.target.response || evt.srcElement.response);
      xhr.send(data); //le data c'est le body
    } catch (err) {
      console.error(err);
    }
  };

  /** Crée et remplit les cellules (TD) avec le contenu adéquat */
  const fillinTable = function fillinTable(column) {
    var td = document.createElement("td");
    var textNode = document.createTextNode(column);
    td.appendChild(textNode);
    newTr.appendChild(td);
    tbody.appendChild(newTr);
  };

  /** Crée les lignes (TR) du tableau */
  const makeTable = function makeTable(text) {
    tbody = document.getElementById("tbody_cible");
    tbody.innerHTML = "";
    text.forEach(function(e) {
      newTr = document.createElement("tr");
      fillinTable(e.id);
      fillinTable(e.nom);

      var td = document.createElement("td");
      td.id = e.id;
      td.innerHTML = '<i class="far fa-edit table_icon edit_icon"></i>';
      td.innerHTML += '<i class="far fa-check-square table_icon is-hidden"></i>';
      td.innerHTML += '<i class="far fa-trash-alt table_icon suppr_icon"></i>';
      newTr.appendChild(td);
    });
    selectIcon();
  };

  /** Récupère la liste des produits au chargement de la page */
  const getProducts = function getProducts() {
    const url = "http://localhost:5000/get-brands";
    doAjax(url, "GET", res => { //pour afficher dans la console
      makeTable(JSON.parse(res)); //pour afficher dans la console

    });
  };

  /** Lance l'appel ajax pour créer un nouveau produit */
  const createProduct = function createProduct(e) {
    e.preventDefault();
    const url = "http://localhost:5000/create-brand";
    doAjax(url, "POST", function(res) {
      console.log("les resultats sont arrivés");
      console.log(JSON.parse(res));
    }, {
      nom: document.getElementById("nom").value,

    })
    getProducts();
  };

  /** Lance l'appel ajax pour supprimer un produit */
  const deleteProduct = function deleteProduct(id_parent) {
    const url = "http://localhost:5000/delete-brand";
    console.log(id_parent);
    doAjax(url, "DELETE", function(res) {
      console.log("delete functionnel!");
      console.log(JSON.parse(res));
    }, {
      id: id_parent
    });
    getProducts();
  };

  /** sélectionne les icônes "edit" et "suppr" cliquées et lance l'édition ou la suppression d'une ligne */
  const selectIcon = function selectIcon() {
    suppr_icons = document.getElementsByClassName("suppr_icon");
    var suppr_icons_table = Array.from(suppr_icons);
    edit_icons = document.getElementsByClassName("edit_icon");
    var edit_icons_table = Array.from(edit_icons);

    suppr_icons_table.forEach(function(e) {
      e.addEventListener("click", function() {
        IDparentNode = this.parentNode.id;
        deleteProduct(IDparentNode);
      })
    });

    edit_icons_table.forEach(function(e) {
      e.addEventListener("click", function() {
        IDparentNode = this.parentNode.id;
        SetEditMode(IDparentNode);
      })
    });
  }

  /** Met en place le mode "édition" au clic sur l'icône "éditer" */
  const SetEditMode = function(id_parent) {
    Td_parent = document.getElementById(id_parent);
    icon_edit = Td_parent.firstChild;
    icon_edit.classList.add("is-hidden");
    icon_valid = icon_edit.nextSibling;
    icon_valid.classList.remove("is-hidden");
    Tr_parent = document.getElementById(id_parent).parentNode;
    Tr_parent.setAttribute("contenteditable", "true");
    Tr_parent.style.background = "#b1a27c";
    icon_valid.onclick = function() {
      getEditedValues(id_parent);
      editDatabase();
    };
  };

  /** Retourne les infos modifiées */
  const getEditedValues = function() {
    var id = Tr_parent.children[0];
    var nom_marque = Tr_parent.children[1];
    return {
      id: id.innerText,
      nom: nom_marque.innerText,
    };
  };

  /** Lance l'appel ajax pour modifier un produit */
  const editDatabase = function editDatabase(id) {
    doAjax("http://localhost:5000/edit-brand", "PATCH", function(res) {
      // RETOUR DE L APPEL AJAX
      getProducts(); // récupère la liste d'users mise à jour

    }, getEditedValues()); // récupérer les valeurs éditées
  };

  var start = function() {
    var submit = document.getElementById("submit").onclick = createProduct;
    getProducts();
  }


  window.addEventListener("DOMContentLoaded", start)


}());