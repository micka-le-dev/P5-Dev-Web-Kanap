import { CartLocalStorage } from "../class/CartLocalStorage.js";

/**
 * @typedef {object} Produit
 * @property {string} _id
 * @property {number} price
 * @property {string} name
 * @property {string} description
 * @property {string} imageUrl
 * @property {string} altTxt pour l'image
 * @property {string[]} colors
 */

/**
 * @typedef {object} ItemCart
 * @property {string} idProduct
 * @property {string} color
 * @property {number} quantity
 */

export class DetailProductComponent{

    /** @type {CartLocalStorage} */
    #cartLocalStorage

    /** @type {HTMLElement} */
    #contenerDetailElement

    /** @type {HTMLElement} */
    #btnActionOnCart

    /** @type {HTMLElement} */
    #quantityElement

    /** @type {string} valeur possible : "add" "suppr" */
    #statusBtn

    /** @type {string | undefined} */
    #couleurSelectione

    /** @type {ItemCart} */
    #dejaDansPanier

    /**
     * @param {CartLocalStorage} cartLocalStorage
     * @param {HTMLElement} contenerDetailElement 
     */
    constructor(cartLocalStorage, contenerDetailElement){
        this.#cartLocalStorage = cartLocalStorage
        this.#contenerDetailElement = contenerDetailElement
    }

    /**
     * @param {Produit} produit
     */
    initDetailProduct(produit){
        this.#dejaDansPanier = this.#cartLocalStorage.findAProduct(produit._id)

        const img = createElement('img',{
            src: produit.imageUrl,
            alt: produit.altTxt
        })
        this.#contenerDetailElement
            .querySelector('.item__img')
            .append(img)

        this.#contenerDetailElement
            .querySelector('#title')
            .innerText = produit.name

        this.#contenerDetailElement
            .querySelector('#price')
            .innerText = produit.price

        this.#contenerDetailElement
            .querySelector('#description')
            .innerText = produit.description

        const colorsElement = elementDetail.querySelector('#colors')
        produit.colors.forEach( color => {
                const colorElement = createElement('option',
                                                    {value: color },
                                                    color
                                                  )
                if( color === dejaDansPanier?.color){
                    this.#couleurSelectione = color
                    this.#statusBtn = 'add'
                    colorElement.setAttribute('selected','')
                }
                colorsElement.append(colorElement)
            })
        colorsElement.addEventListener('change', event => { this.#updateInputquantity(event.target.value) })

        this.#quantityElement = document.querySelector('#quantity')
        if( ! this.#couleurSelectione )
            quantityElement.disabled = true
        else if ( dejaDansPanier?.quantity >= 1 ) {
            quantityElement.value = dejaDansPanier.quantity
            quantityElement.setAttribute('data-old-value', quantityElement.value)
        }
        quantityElement.addEventListener('change', event => {/* faire des trucs */})

        this.#btnActionOnCart = this.#contenerDetailElement.querySelector('#addToCart')

        return this.#contenerDetailElement
    }

    #updateInputquantity(color){
        const quantity = this.#dejaDansPanier?.quantity ?? 1
        this.#quantityElement.value = quantity
        this.#quantityElement.setAttribute('data-old-value', quantity)
    }
}