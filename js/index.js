import { FormContact} from './form-contact.js'
import { Menu } from './menu.js'

/**
 * 
 * @class Index
 * 
 * Se instancia al acceder a la página index
 * Depende de:
 *  - la clase Menu para gestionar los menus, 
 *      comportidos con la otra página del sitio
 *  - la clase FormCoctact, responsable del 
 *      formulario de contactos
 * 
 */

export class Index {
    constructor() {
        // elementos del DOM
        this.oMenus = new Menu()
        this.oFormContact = new FormContact()
        //console.log(this)
    }
}
