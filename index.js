var conciertoPorDefecto = [[" ", " ", " ", "url(Multimedia/prox.jpg)",0]]
// Array bidimensional que guarda información de cada cartel
var conciertos = [
  ["JCReyes", "Es Gremi", "28/12/2025", "url(Multimedia/jcreyes.jpg)",149,150],
  ["Melendi", "Es Gremi", "29/10/2025", "url(Multimedia/melendi.jpg)",0,150],
  ["El Drogas", "Es Gremi", "30/07/2025", "url(Multimedia/eldrogas.jpg)",0,150],
  ["Alvama Ice", "Es Gremi", "31/09/2025", "url(Multimedia/alvamaice.jpg)",0,150],
];

// Numero de fila para acceder a ellas
var fil = 0;
// Numero de columnas para acceder a ellas
var col = 0;
// Numero de elemento para acceder a ellos
var indice = 1;
// Contador de elementos card
var countElem = 0;

function adminMenu() {
  let user = prompt("Introduce el usuario:");
  let pass = prompt("Introduce la contraseña:");
  let elementos = document.getElementsByClassName("adm");
  if (user == "admin" && pass == 1234) {
    for (let i = 0; i < elementos.length; i++) {
      console.log(elementos)
      elementos[i].style.display = "inline";
    }

  }
}

// Funcion para contar los carteles de la página
contarElementos();
function contarElementos() {
  let elementos = document.getElementsByTagName("h1");

  for (let i = 0; i < elementos.length; i++) {
    if (elementos[i].id.startsWith("art")) {
      countElem++;
    }
  }
  return countElem;
}

// Condicional para llamar a una funcion o otra
reload();
function reload() {
  if (conciertos.length > 1) {
    loadArtistas();
  } else if (conciertos.length < countElem) {
    comingSoon();
  }
}

function comingSoon() {
  let artistas = "art" + indice;
  let salas = "sal" + indice;
  let fechas = "fch" + indice;
  let post = "c" + indice;
  let temp = "tmp" + indice;
  fil = 0;
  document.getElementById(artistas).innerHTML = " ";

  document.getElementById(salas).innerHTML = " ";

  document.getElementById(fechas).innerHTML = " ";

  document.getElementById(temp).innerHTML = " ";

  document.getElementById(post).style.backgroundImage =
    "url(Multimedia/prox.jpg)";
  if (indice < countElem) {
    fil = 0;
    indice++;
    comingSoon();
  }

}

loadOptions();
function loadOptions(){
  document.getElementById("optionArtista").innerHTML = "";
  for(let i = 0; i < conciertos.length; i++){
      document.getElementById("optionArtista").innerHTML += "<option id='op'>" +conciertos[i][0]+" " +conciertos[i][2]+"</option>"
  }
}

function loadArtistas() {
  let artistas = "art" + indice;
  let salas = "sal" + indice;
  let fechas = "fch" + indice;
  let temporada = "tmp" + indice;
  let post = "c" + indice;

  document.getElementById(artistas).innerHTML = conciertos[col][fil++];

  document.getElementById(salas).innerHTML = conciertos[col][fil++];

  if(conciertos[col].ident == undefined){
    conciertos[col].ident = indice;
    
  }
  fechasStr(conciertos[col][fil++], fechas, temporada,col); // --> Date
  

  document.getElementById(post).style.backgroundImage = conciertos[col][fil++];



  col++;
  if (col < conciertos.length) {
    fil = 0;
    indice++;
    loadArtistas();
  }
  loadOptions();
  indice = 1;
}

// Añadir Artista
function addConcierto() {
  let name = prompt("Introduce el nombre del artista");
  let sala = prompt("Introduce la sala");
  let fecha = prompt("Introduce la fecha");
  let tickets = parseInt(prompt("Introduce el numero de tickets"));
  let foto =
    "url(Multimedia/" + prompt("Introduce el nombre de la imagen:") + ".jpg)";
  // let tickets = prompt("")
  if (elementosVacios()) {
    conciertos.push([name, sala, fecha,  foto, 0, tickets]); // Añadir al final si no se eliminó ningún elemento
  }
  fil = 0;
  col = 0;
  indice = 1;
  loadArtistas();
  loadOptions();
}

// Borrar Artista
function rmConcierto() {
  let identificador = parseInt(prompt("ID:"));
  for (let j = 0; j < conciertos.length; j++) {
    if (conciertos[j].ident == identificador) {
      conciertos.splice(j, 1);
      if (elementosVacios()) {
        comingSoon();
      }
      fil = 0;
      col = 0;
      indice = 1;
      loadArtistas();
      loadOptions();
      return; // Salir de la función después de eliminar la fila
    }
  }
}


function elementosVacios() {
  let elementos = document.getElementsByTagName("h1");
  for (let i = 0; i < elementos.length; i++) {
    if (elementos[i].id.startsWith("art") && elementos[i].textContent.trim() === '') {

      return true;
    }
  }
  return false;
}


//DATE
function fechasStr(fechaArray, indiceFecha, indicetemp,columna) {

  let fecha = construirFecha(fechaArray); //retorna la fecha  para trabajar con date
  document.getElementById(indicetemp).innerText = temporada(fecha);
  document.getElementById(indiceFecha).innerText = frase(fecha);
  
}


//Constructor de la fecha

function construirFecha(date) {
  let dia = parseInt((date.split("/"))[0]);
  let mes = parseInt((date.split("/"))[1]);
  let año = parseInt((date.split("/"))[2]);

  mes -= 1;

  let concierto = new Date(año, mes, dia);

  return concierto;
  
}

//toString

function frase(concierto) {

  let mes = concierto.getMonth();

  const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

  return concierto.getDate() + " " + meses[mes] + " " + concierto.getFullYear();
}

//Temporada del concierto

function temporada(concierto) {
  let mes = concierto.getMonth();
  let dia = concierto.getDate();
  if (mes + 1 == 12 && dia >= 21 || mes + 1 == 1 || mes + 1 == 2 || mes + 1 == 3 && dia <= 20) {
    return "Invierno";
  } else if (mes + 1 == 3 && dia >= 21 || mes + 1 == 4 || mes + 1 == 5 || mes + 1 == 6 && dia <= 20) {
    return "Primavera";
  } else if (mes + 1 == 6 && dia >= 21 || mes + 1 == 7 || mes + 1 == 8 || mes + 1 == 9 && dia <= 22) {
    return "Verano";
  } else {
    return "Otoño";
  }
}


function contarTickets(){
  event.preventDefault(); // Previene la recarga de la página
  // Captar numero de tickets
  let numtickets = parseInt(document.getElementById("tic").value);
  // Captar la información del select HTML
  let nombreArtista = document.getElementById("optionArtista").value;
  // Separar el nombre del artista y la fecha para guardarla en un array
  let splitter = nombreArtista.split(/(\d{2}\/\d{2}\/\d{4})/);
  // Guardar nombre artista sin espacios en una variable
  let artistaSplit = splitter[0].trim();
  // Guardar fecha en una variable
  let fechaSplit = splitter[1];
 
  let soldout = document.getElementById("full");
  let nticks = document.getElementById("nticks");
  if(numtickets <= 5){
  // For para recorrer todos los elementos del array
  for (let i = 0; i < conciertos.length; i++) {
    // Condicional para comprobar que el nombre sea igual que el del array y la fecha
    if (artistaSplit == conciertos[i][0] && fechaSplit == conciertos[i][2] && ((conciertos[i][4]+numtickets) <= 150)) {
      // Suma de los tickets a la posicion donde se encuentran
      conciertos[i][4] += parseInt(numtickets);
    }else if(conciertos[i][4] >= 150){
      soldout.style.display= "block";
     }else{
      let suma = conciertos[i][4] + numtickets;
      console.log("Solo puedes comprar: " + parseInt(suma - 150));
     }
  }
}else if (numtickets > 5){
  nticks.style.display = "block";
}
console.log(conciertos);
}


console.log(conciertos);