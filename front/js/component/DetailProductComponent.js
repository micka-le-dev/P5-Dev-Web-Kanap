import { CartLocalStorage } from "../class/CartLocalStorage.js";
import { replaceContentElementByMessage } from "../functions/dom.js";

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
    #colorsElement
    /** @type {HTMLElement} */
    #quantityElement

    /** @type {string | undefined} */
    #couleurSelectione

    /** @type {ItemCart} */
    #dejaDansPanier
    /** @type {Produit} */
    #produit

    /**
     * @type {Function}
     * @param {string} idProduct
     * @param {string} color
     * @param {number} quantity
     */
    #actionBtn = (idProduct, color, quantity) => console.log(
`classe DetailProductComponent : l'action du bouton #addToCart n'est pas défini, utiliser le setter actionClickBtn pour la definir
cette function prend 3 paramettres :
    idProduct : string,
    color : string,
    quantity : number`)




    /**
     * @param {CartLocalStorage} cartLocalStorage
     * @param {string} selecteurCSS
     */
    constructor(cartLocalStorage, selecteurCSS){
        this.#cartLocalStorage = cartLocalStorage
        this.#contenerDetailElement = document.querySelector(selecteurCSS)
    }

    get id() { return this.#produit.idProduct }
    get color() { return this.#colorsElement.value }
    get quantity() { return this.#quantityElement.value }

    /**
     * @param {Function} actionBtn param1 {string} idProduct,  param2 {string} color,  param3 {number} quantity
     */
    set actionClickBtn(actionBtn) {
        this.#actionBtn = actionBtn
        this.#btnActionOnCart.addEventListener('click', this.#actionBtn(this.id, this.color, this.quantity) )
    }

    /**
     * @param {string} message
     * @returns {HTMLElement} le paragraphe créé
     */
    setMessageError(message){
        return replaceContentElementByMessage(this.#contenerDetailElement, message)
    }
    /**
     * @param {Produit} produit
     */
    initDetailProduct(produit){
        this.#produit = produit
        this.#dejaDansPanier = this.#cartLocalStorage.findByIdProduct(produit._id)

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

        this.#colorsElement = elementDetail.querySelector('#colors')
        produit.colors.forEach( color => {
                const colorElement = createElement('option',
                                                    {value: color },
                                                    color
                                                  )
                if( color === dejaDansPanier?.color){
                    this.#couleurSelectione = color
                    this.#updateTextBtn('add')
                    colorElement.setAttribute('selected','')
                }
                this.#colorsElement.append(colorElement)
            })
        this.#colorsElement.addEventListener('change', event => { this.#colorChange(event.target.value) })

        this.#quantityElement = document.querySelector('#quantity')
        if( ! this.#couleurSelectione )
            quantityElement.disabled = true
        else if ( dejaDansPanier?.quantity >= 1 ) {
            quantityElement.value = dejaDansPanier.quantity
            quantityElement.setAttribute('data-old-value', quantityElement.value)
        }
        quantityElement.addEventListener('change', event => { this.#quantityChange() })

        this.#btnActionOnCart = this.#contenerDetailElement.querySelector('#addToCart')

        return this.#contenerDetailElement
    }

    #updateInputQuantityFromCart(){
        const quantity = this.#dejaDansPanier?.quantity ?? 1
        this.#quantityElement.value = quantity
        this.#quantityElement.setAttribute('data-old-value', quantity)
    }

    /**
     * @param {string} color
     */
    #colorChange(color){
        if ( color == '' ){
            this.#dejaDansPanier = undefined
            this.#updateTextBtn(undefined)
            this.#quantityElement.disabled = true
            return
        }
        this.#quantityElement.disabled = false
        this.#updateTextBtn('add')
        this.#dejaDansPanier = this.#cartLocalStorage.findByIdAndColor(this.#produit.idProduct, color)
        this.#updateInputQuantityFromCart()
    }

    #quantityChange(){
        const oldValue = input.getAttribute('data-old-value') ?? 1

        let val = input.value * 1

        if( // erreur de manipulation de la part de l'utilisateur
            input.value == ''
            || val < 0
        )
        {
            input.value = oldValue
            return
        }

        if( val === 0){
            this.#updateTextBtn('suppr')
            return
        }
        this.#updateTextBtn('add')

        let min = input.getAttribute('min') * 1 ?? 1
        let max = input.getAttribute('max') * 1 ?? 100
        val = val <= min ? min : val
        val = val >= max ? max : val

        input.value = val
        input.setAttribute('data-old-value', val)
    }

    /**
     * @param {string | undefined} statusBtn "add", "suppr"
     */
    #updateTextBtn(statusBtn){
        if( statusBtn === 'add' )
            this.#btnActionOnCart.innerText = 'Ajouter au panier'
        else if( statusBtn === 'suppr' )
            this.#btnActionOnCart.innerText = 'supprimer du panier'
        else
            this.#btnActionOnCart.innerText = 'Ajouter au panier'
    }
}