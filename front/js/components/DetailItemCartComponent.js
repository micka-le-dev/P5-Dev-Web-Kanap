
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
    #template

    /** @type {ItemCartAllData} */
    #itemCartAllData

    /**
     * @param {HTMLElement} template
     * @param {ItemCartAllData} itemCartAllData
     */
    constructor(template, itemCartAllData){
        this.#template = template

        this.#itemElement = template.content.cloneNode(true).querySelector('.cart__item')
        this.update(itemCartAllData)
    }

    /**
     * @param {ItemCartAllData} itemCartAllData
     */
    update(itemCartAllData){
        this.#itemCartAllData = itemCartAllData

        this.#itemElement.addEventListener('updateItemCart', event => updateItemCart(event))

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

        const inputQuantity = this.#itemElement.querySelector('.itemQuantity')
        inputQuantity.value = this.#itemCartAllData.quantity
        inputQuantity.addEventListener('change', event => changeQuantity(event))

        this.#itemElement
            .querySelector('.deleteItem')
            .addEventListener('click', event => this.#dispatchDeteteEvent(event))
    }

    /**
     * @param {HTMLElement} element
     */
    appendTo(element){
        element.append(this.#itemElement)
    }

    /**
     * @param {Event} event
     */
    #dispatchDeteteEvent(event){
        const eventUpdateItemCart = new CustomEvent('updateCart',{
            detail: {
                idProduct: this.#itemCartAllData.idProduct,
                color: this.#itemCartAllData.color,
                quantity : 0
            },
            bubbles: true,
            cancelable: true
        })
        this.#itemElement.dispatchEvent(eventUpdateItemCart)

        // if( ! eventUpdateItemCart.preventDefault)
        //     this.#itemElement.remove() // risque de bug d'affichage si ce n'est pas supprimer du panier
    }
}