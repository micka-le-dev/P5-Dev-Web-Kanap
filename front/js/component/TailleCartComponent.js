import { CartLocalStorage } from "../Cart/CartLocalStorage.js"
import { ErrorSelectorCSS } from "../Error/ErrorSelectorCSS.js"

export class TailleCartComponent{
    /** @type {HTMLElement} */
    #element

    /** @type {CartLocalStorage} */
    #cartLocalStorage

    /**
     * @param {string} selecteurCSS
     * @param {CartLocalStorage} cartLocalStorage
     */
    constructor(selecteurCSS, cartLocalStorage = new CartLocalStorage()){
        try{
            this.#element = document.querySelector(selecteurCSS)
            this.#cartLocalStorage = cartLocalStorage
            this.updateComponent()
        }
        catch(e){
            throw new ErrorSelectorCSS(`constructeur de  TailleCartComponent, mauvais selecteur CSS : '${selecteurCSS}'`)
        }
    }

    updateComponent(){
        this.#element.innerText = this.#cartLocalStorage.nbItemTostring()
    }
}