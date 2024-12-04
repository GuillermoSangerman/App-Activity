import { baseDeDatos } from "./data.js";
import { fechaActual, getDate } from "./fechaActual.js";
import { categorias } from "./data.js";
fechaActual()
const listaTotal = document.querySelector('#lista_total')
const actividadesLista = document.querySelector('#actividad_list')
const addButton = document.querySelector('#add')
const modal = document.querySelector('#modal')
const agregarForm = document.querySelector('#agregar_form')
const editarModal = document.querySelector('#editar_modal')
const editForm = document.querySelector('#edit_form')
const cancelButton = document.querySelector('#edit_form button[type="button"]')
const actividadList = document.querySelector('#actividad_list')
const modalClose = document.querySelector('#close')
const modalCloseEdit = document.querySelector('#close_edit')
let actividadEditada = {}
function organizacionesLista() {
    listaTotal.innerHTML = ""
    categorias.forEach(element => {
        const template_organizaciones = `<li class="list-group text-dark" id="${element.id}">${element.organizacion}</li>`
        listaTotal.innerHTML += template_organizaciones
    });
}
organizacionesLista()

function cargarContedido(organizaciones) {
    actividadesLista.innerHTML = ""
    organizaciones.forEach(element => {
        //let numeroDeTelefono = `https://wa.me/${element.numero}`
        let template_contenido = `<div">
                        <div id="${element.id}" class="d-flex justify-content-around align-items-md-center flex-grow-1 info flex-row flex-md-row">
                            <h3 class="fs-6 encabezados">${element.organizacion}</h3>
                            <h3 class="fs-6 encabezados">${element.titulo}</h3>
                            <h3 class="fs-6 encabezados">${element.responsable}</h3>
                            <h6 class="fs-6 encabezados">${element.fecha}</h6>
                        </div>
                        <div id="${element.id}" class="action d-flex justify-content-end gap-3 flex-grow-1">
                            <button  id="edit" class="btn editar_button btn-sm">
                                Editar
                            </button>
                            <button id="eliminar" class="btn eliminar_button btn-sm rounded-5">
                                Eliminar
                            </button>
                        </div>
                    </div>
                    <hr>`
        actividadesLista.innerHTML += template_contenido
    });
}
function activarFormulario() {

    modal.classList.toggle('d-none')
}
function activarEditForm() {
    editarModal.classList.toggle('d-none')
}
export function findElement(id) {
    for (let i = 0; i < baseDeDatos.length; i++) {
        const element = baseDeDatos[i];
        if (element.id === id) {
            return element
        }
    }
}
export function cancelEdicion() {
    editForm.reset()
    actividadEditada = {}
    activarEditForm()
}
export function salvarEdition(event) {
    event.preventDefault()
    const formData = new FormData(editForm)

    actividadEditada.content = formData.get('contenido')
    actividadEditada.titulo = formData.get('titulo')
    actividadEditada.organizacion = formData.get('organizacion')
    actividadEditada.responsable = formData.get('responsable')
    actividadEditada.numero = formData.get('numero')



    cargarContedido(baseDeDatos)
    editForm.reset()
    activarEditForm()
    actividadEditada = {}

}
export function nuevaActividad(event) {
    event.preventDefault()

    const formData = new FormData(agregarForm)
    const titulo = formData.get('titulo')
    const organizacion = formData.get('organizacion')
    const responsable = formData.get('responsable')
    const numero = formData.get('numero')
    const contenido = formData.get('contenido')
    const fecha = getDate()
    const nuevo = {
        id: baseDeDatos[baseDeDatos.length - 1]?.id + 1 || 1,
        titulo: titulo,
        organizacion: organizacion,
        responsable: responsable,
        numero: numero,
        fecha: fecha,
        contenido: contenido
    }
    baseDeDatos.push(nuevo)
    agregarForm.reset()
    cargarContedido(baseDeDatos)
    activarFormulario()
}
function editActividad(id) {
    actividadEditada = findElement(id)
    editForm.elements.titulo.value = actividadEditada.titulo
    editForm.elements.organizacion.value = actividadEditada.organizacion
    editForm.elements.responsable.value = actividadEditada.responsable
    //editForm.elements.numero.value = actividadEditada.numero
    editForm.elements.contenido.value = actividadEditada.contenido
    editForm.elements.fecha.value = actividadEditada.fecha
    activarEditForm()
}
export function findIndex(id) {
    for (let i = 0; i < baseDeDatos.length; i++) {
        const element = baseDeDatos[i];
        if (element.id === id) {
            return i
        }
    }
}
export function deleteFila(id) {

    let index = findIndex(id) // encontrar el la posicion del elemento a eliminar
    baseDeDatos.splice(index, 1) // eliminar post del array untilizando splice
    cargarContedido(baseDeDatos) // volver a cargar los post despues de elminar.
}
function buttonsAction(event) {

    let target = event.target // obtener etique sobre la que se hizo click
    console.log(target);
    let id = parseInt(target.closest('div').id)// id del post sobre el cual se hizo click
    console.log(id);
    if (target.id === 'eliminar') { // validar si se hizo click sobre el boton delete
        deleteFila(id) // llamar a la function de eliminar el post
    } else if (target.id === 'edit') { // validar si se hizo click sobre el boton edit
        editActividad(id) // llamar a la function de editar el post
    }

}
cargarContedido(baseDeDatos)
listaTotal.addEventListener('click', (e) => {
    const target = e.target
    console.log(target.tagName);
    if (target.tagName === 'LI') {
        const org = target.textContent
        let result = baseDeDatos.filter((element) => org === element.organizacion)
        cargarContedido(result)
    }
})
const cancelarButton = document.querySelector('.cancelar_button')

addButton.addEventListener('click', activarFormulario)
cancelarButton.addEventListener('click', activarFormulario)
modalClose.addEventListener('click', activarFormulario)
modalCloseEdit.addEventListener('click', activarEditForm)
actividadList.addEventListener('click', buttonsAction)
cancelButton.addEventListener('click', cancelEdicion)
editForm.addEventListener('submit', salvarEdition)
agregarForm.addEventListener('submit', nuevaActividad)
