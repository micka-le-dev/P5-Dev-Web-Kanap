import { InputQuantityManager } from "./inputQuantityManager.js"

/**
 * @typedef {object} ItemCartAllData
 * @property {string} idProduct
 * @property {number} priceWithQuantity
 * @property {string} name
 * @property {string} description
 * @property {string} imageUrl
 * @property {string} altTxt pour l'image
 * @property {string} color
 * @property {number} quantity
 */


/**
 * @typedef {object} ItemCart
 * @property {string} idProduct
 * @property {string} color
 * @property {number} quantity
 */


 export class DetailItemCartComponent{

    /** @type {HTMLElement} */
    #itemElement

    /** @type {HTMLElement} */
    #inputQuantityManager

    /** @type {ItemCartAllData} */
    #itemCartAllData

    /**
     * @param {HTMLElement} template
     * @param {ItemCartAllData} itemCartAllData
     */
    constructor(template, itemCartAllData){
        this.#itemElement = template.content.cloneNode(true).querySelector('.cart__item')
        this.#inputQuantityManager = new InputQuantityManager(this.#itemElement.querySelector('.itemQuantity'), false)
        this.update(itemCartAllData)
    }

    /**
     * @param {ItemCartAllData} itemCartAllData
     */
    update(itemCartAllData){
        this.#itemCartAllData = itemCartAllData

        this.#itemElement.setAttribute('data-id',this.#itemCartAllData.idProduct)
        this.#itemElement.setAttribute('data-color',this.#itemCartAllData.color)

        const img = this.#itemElement.querySelector('.cart__item__img > img')
        img.setAttribute('src', this.#itemCartAllData.imageUrl)
        img.setAttribute('alt', this.#itemCartAllData.altTxt)

        const description = this.#itemElement.querySelector('.cart__item__content__description')
        description.querySelector('h2').innerText = this.#itemCartAllData.name
        const ps = description.querySelectorAll('p')
        ps[0].innerText = this.#itemCartAllData.color
        ps[1].innerText = this.#itemCartAllData.priceWithQuantity + " €"

        this.#inputQuantityManager.quantity = this.#itemCartAllData.quantity
        this.#inputQuantityManager.actionChangeValue( () => {
                                            this.#inputQuantityManager.correctQuantity()
                                            this.#dispatchEventChangeQuantity(this.#inputQuantityManager.quantity)
                                        })

        this.#itemElement
            .querySelector('.deleteItem')
            .addEventListener('click', () => this.#dispatchEventChangeQuantity(0))
    }

    /**
     * @param {HTMLElement} element
     */
    appendTo(element){
        element.append(this.#itemElement)
    }

    /**
     * @param {HTMLInputElement} input 
     */
     #dispatchEventChangeQuantity(quantity){
        const eventUpdateItemCart = new CustomEvent('updateItemCart',{
            detail: {
                idProduct: this.#itemCartAllData.idProduct,
                color: this.#itemCartAllData.color,
                quantity : quantity*1
            },
            bubbles: true,
            cancelable: true
        })
        this.#itemElement.dispatchEvent(eventUpdateItemCart)
    }
}