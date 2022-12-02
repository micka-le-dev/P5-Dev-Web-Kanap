import { CartLocalStorage } from "../class/CartLocalStorage.js"

export class TailleCartComponent{
    /** @type {HTMLElement} */
    #element

    /** @type {CartLocalStorage} */
    #cartLocalStorage

    /**
     * @param {string} selecteurCSS
     * @param {CartLocalStorage} cartLocalStorage
     */
    constructor(selecteurCSS, cartLocalStorage = undefined){
        this.#element = querySelector(selecteurCSS)
        this.#cartLocalStorage = cartLocalStorage ?? new CartLocalStorage()
    }

    updateComponent(){
        this.#element.innerText = this.#cartLocalStorage.nbItemTostring()
    }
}