let titulo = document.getElementById('nameNote');
let agregar = document.getElementById('addNote');
let buttonSave = document.getElementById('buttonSave');
let buttonDelete = document.getElementById('buttonDelete');
let nota = document.getElementById('misNotas');

let notas = []

function Main() {
    LeerNota()
    Bug();
}
function CrearNota() {
    if (nameNote.value != "" && addNote.value != "") {
        notas.push({
            name: nameNote.value,
            notes: addNote.value,
        })
        localStorage.setItem("notas", JSON.stringify(notas));
        nameNote.value = "";
        addNote.value = "";
    } else {
        swal("Algo salio mal!", "No escribiste nada!", "error");
    }
    LeerNota()
}
function LeerNota() {
    let arrayNotas = [];


    let verNota = JSON.parse(localStorage.getItem("notas"));


    for (let index = 0; index < verNota.length; index++) {
        arrayNotas.push(`
        <div class="notes-text">
        <div class="notes">
            <div>
                <b>${verNota[index].name}</b>
                <p>${verNota[index].notes}</p>
            </div>
            <div>
                  <button type="button" onclick="ViewNotes('${index}')" class="btn btn-dark w-100" data-bs-toggle="modal" data-bs-target="#exampleModal">
                  Actualizar
                 </button>
                <button class="btn btn-danger mt-2 w-100" onclick="EliminarNota('${index}')">Eliminar</button>
            </div>
        </div>
</div>`)
    }
    misNotas.innerHTML = arrayNotas.join("");
   
}
function EliminarNota(id) {
    notas.splice(id, 1);
    localStorage.setItem("notas", JSON.stringify(notas));
    LeerNota()
    swal({
        title: "Estas seguro?",
        text: "Estas por eliminar esta nota!",
        icon: "warning",
        buttons: null,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                swal("Bien! esta nota ah sido eliminada!", {
                    icon: "success",
                });
            }
        });
}
function Bug() {
    if (localStorage.getItem("notas") == null) {
        notas = [];
    } else {
        notas = JSON.parse(localStorage.getItem("notas"))
    }
}


let newNote = document.getElementById('newNote');
let newAdd = document.getElementById('newAdd');
let identificador;

function ViewNotes(id) {
    identificador = id;

    newNote.value = notas[id].name;
    newAdd.value = notas[id].notes;
}

function ActualizarNota() {
    notas.splice(identificador, 1, {
    name: newNote.value,
    notes: newAdd.value,   
    });
    localStorage.setItem("notas", JSON.stringify(notas));
    LeerNota()
    swal("Listo!", "Su nota ha sido actualizada!", "success")
}


Main()

