if (localStorage.getItem('funval') === null) {
    localStorage.setItem("funval", JSON.stringify([]))
}

const baseDeLosDatos = JSON.parse(localStorage.getItem('funval'))
console.log(baseDeLosDatos);

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
        const template_organizaciones = `<li class="list-group text-dark mt-2" id="${element.id}">${element.organizacion}</li>`
        listaTotal.innerHTML += template_organizaciones
    });
}
organizacionesLista()

function cargarContedido(organizaciones) {
    actividadesLista.innerHTML = ""
    organizaciones.forEach(element => {

        let template_contenido = `<div">
                        <div id="${element.id}" class="d-flex justify-content-around align-items-md-center flex-grow-1 info flex-row flex-md-row">
                            <h3 class="fs-6 encabezados">${element.organizacion}</h3>
                            <h3 class="fs-6 encabezados">${element.titulo}</h3>
                            <h3 class="fs-6 encabezados">${element.responsable}</h3>
                            <h6 class="fs-6 encabezados">${element.fecha}</h6>
                        </div>
                        <div id="${element.id}" class="action d-flex justify-content-end gap-3 flex-grow-1">
                            <svg id="enviar" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 editar_compartir">
  <path stroke-linecap="round" stroke-linejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
</svg>
<svg id="edit" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
</svg>
<svg id="eliminar" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
</svg>

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

    actividadEditada.contenido = formData.get('contenido')
    actividadEditada.titulo = formData.get('titulo')
    actividadEditada.organizacion = formData.get('organizacion')
    actividadEditada.responsable = formData.get('responsable')
    actividadEditada.numero = formData.get('numero')
    actividadEditada.fecha = getDate()

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
    localStorage.setItem('funval', JSON.stringify(baseDeLosDatos))
}
function editActividad(id) {
    actividadEditada = findElement(id)
    editForm.elements.titulo.value = actividadEditada.titulo
    editForm.elements.organizacion.value = actividadEditada.organizacion
    editForm.elements.responsable.value = actividadEditada.responsable
    editForm.elements.numero.value = actividadEditada.numero
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
export function enviarActividad(id) {
    actividadEditada = findElement(id)
    let tituloDeActividad = actividadEditada.titulo
    let organicaionQueSirve = actividadEditada.organizacion
    let responsableDelEvento = actividadEditada.responsable
    let fechaDeCreacion = actividadEditada.fecha
    let nuevoNumero = actividadEditada.numero
    let contenidoATratar = actividadEditada.contenido
    //let abrirEnlace = `<a href="https://wa.me/52${nuevoNumero}?text=I'm%20interested%20in%20your%20car%20for%20sale"></a>`
    window.open(`https://wa.me/52${nuevoNumero}?text=Titulo de la actividad: ${tituloDeActividad},
                                                     Que organización se encarga: ${organicaionQueSirve},
                                                     Responsable: ${responsableDelEvento},
                                                     Fecha del evento: ${fechaDeCreacion},
                                                     De que se trata: ${contenidoATratar}`)
}

function buttonsAction(event) {
    let target = event.target
    console.log(target);
    let id = parseInt(target.closest('div').id)
    console.log(id);
    if (target.id === 'eliminar') {
        deleteFila(id)
    } else if (target.id === 'edit') {
        editActividad(id)
    } else if (target.id === 'enviar') {
        enviarActividad(id)

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
