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
    constructor(selecteurCSS, cartLocalStorage = new CartLocalStorage()){
        this.#element = querySelector(selecteurCSS)
        this.#cartLocalStorage = cartLocalStorage
        this.updateComponent()
    }

    updateComponent(){
        this.#element.innerText = this.#cartLocalStorage.nbItemTostring()
    }
}