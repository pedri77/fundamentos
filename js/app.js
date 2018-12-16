import  { Main } from './main.js'

/**
 * 
 * Fucnción autoejecutada: patrón IIEF
 * que actua como cargador de la aplicación, 
 * instanciando el objeto Main (Router)
 * 
 */

(function() {
    window.addEventListener("load", 
    () => { new Main()})
})()


