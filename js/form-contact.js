export class FormContact {
    constructor() {
        // elementos del DOM
        this.oFormContact =  document.querySelector('#contact')
        this.oInputName = document.querySelector('#name')
        this.oInputEmail = document.querySelector('#email')
        this.oInputPhone = document.querySelector('#phone')
        this.oTextMessage = document.querySelector('#message')
        this.oSelectSeleccion = document.querySelector('#selection') 
        this.oInputSelectOtros = document.querySelector('#select_otros')       

        // Manejadores de eventos
        this.oFormContact.addEventListener('submit', this.leerContact.bind(this)) 
        this.oTextMessage.addEventListener('change', this.checkMessage.bind(this))
        this.oSelectSeleccion.addEventListener('change', this.checkShowOthers.bind(this))
        this.oInputSelectOtros.addEventListener('input', this.checkInputSelectOthers.bind(this))
    }

    /************ Métodos manejadores de eventos *************/

    checkInputSelectOthers () {
        let select_value = this.oSelectSeleccion.options[this.oSelectSeleccion.selectedIndex].value
        let div_boton_send = document.querySelector('#div_send')
        //console.dir(select_value)
        //console.dir(this.oInputSelectOtros.value)
        if(select_value=="Otros" && this.oInputSelectOtros.value=="") {
            this.oInputSelectOtros.setCustomValidity('Debe indicar cómo me has conocido manualmente')            
            div_boton_send.setAttribute('class', "hide")    
        } else {
            this.oInputSelectOtros.setCustomValidity('')
            div_boton_send.setAttribute('class', "show")
        }
    }

    checkShowOthers(oE) {
        let divSelectOtros = document.querySelector('#div_select_otros')
        let div_boton_send = document.querySelector('#div_send')
        let select_value = this.oSelectSeleccion.options[this.oSelectSeleccion.selectedIndex].value
        //console.dir(divSelectOtros)
        //console.dir(select_value)
        if(select_value=="Otros") {
            divSelectOtros.setAttribute('class', "show")
            div_boton_send.setAttribute('class', "hide")
        } else {
            divSelectOtros.setAttribute('class', "hide") 
            div_boton_send.setAttribute('class', "show")   
            this.oInputSelectOtros.value="";        
        }
    }

    checkMessage (oE) {
        let str=this.oTextMessage.value
        //console.dir(str)
        let num_words=str.split(' ').length;
        //console.dir(num_words)
        if(num_words>=150) {
            this.oTextMessage.setCustomValidity('El campo mensaje no puede contener más de 150')
        } else {
            this.oTextMessage.setCustomValidity('')
        }
    }

    leerContact(oE) {
        oE.preventDefault()
        this.guardarDatos()
    }

    /************ Métodos auxiliares *************/    

    guardarDatos() {
        this.oData = {
            name:  this.oInputName.value,
            email: this.oInputEmail.value,
            phone: this.oInputPhone.value,
            message: this.oTextMessage.value,
            seleccion: this.oSelectSeleccion.options[this.oSelectSeleccion.selectedIndex].value,
            select_otros: this.oInputSelectOtros.value,
        }

        console.dir(this.oData)
        alert('Datos guardados con éxito')
    }
}
