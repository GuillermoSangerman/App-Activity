const fecha = document.querySelector('#fecha')
const fechaForm = document.querySelector('#fecha_form')
const fechaFormActualizar = document.querySelector('#fecha_form_actualizar')

export function getDate() {
    const now = new Date()
    let dia = now.getDay()
    let diasEspecifico =  ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];
    let day = now.getDate()
    let month = now.getMonth() + 1
    let year = now.getFullYear()

    let formatedDate = `${diasEspecifico[dia]}-${day}/${month}/${year}`
    return formatedDate
}
export function fechaActual() {
    fecha.value = getDate()
    fechaForm.value = getDate()
    fechaFormActualizar.value = getDate()
}