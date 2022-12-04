import { CartLocalStorage } from "../class/CartLocalStorage.js";
import { createElement, replaceContentElementByMessage } from "../functions/dom.js";

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
    #btnActionCartElement

    /** @type {HTMLElement} */
    #colorsElement
    /** @type {HTMLElement} */
    #quantityElement

    /** @type {ItemCart} */
    #dejaDansPanier
    /** @type {Produit} */
    #produit

    /**
     * @type {string}
     */
    #actionBtnNotDefined = `classe DetailProductComponent : l'action du bouton #addToCart n'est pas défini, utiliser la méthode actionClickBtn pour la definir`

    /** @type {Function} */
    #oldCallBack



    /**
     * @param {CartLocalStorage} cartLocalStorage
     * @param {string} selecteurCSS
     */
    constructor(cartLocalStorage, selecteurCSS){
        this.#cartLocalStorage = cartLocalStorage
        this.#contenerDetailElement = document.querySelector(selecteurCSS)
    }

    get idProduct() { return this.#produit._id }
    get color() { return this.#colorsElement?.value }
    get quantity() { return this.#quantityElement?.value }

    /**
     * @param {Function} actionBtn param1 {string} idProduct,  param2 {string} color,  param3 {number} quantity
     */
    actionClickBtn(actionBtn) {
        this.#btnActionCartElement.removeEventListener('click', this.#oldCallBack )
        this.#oldCallBack = actionBtn
        this.#btnActionCartElement.addEventListener('click', actionBtn )
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

        this.#btnActionCartElement = this.#contenerDetailElement.querySelector('#addToCart')
        this.actionClickBtn(() => console.log(this.#actionBtnNotDefined))

        this.#quantityElement = this.#contenerDetailElement.querySelector('#quantity')
        this.#quantityElement.addEventListener('change', event => { this.#quantityChange() })

        this.#colorsElement = this.#contenerDetailElement.querySelector('#colors')
        produit.colors.forEach( color => {
                const colorElement = createElement('option',
                                                    {value: color },
                                                    color
                                                  )
                if( color === this.#dejaDansPanier?.color){
                    this.#colorChange(color)
                    this.#updateTextBtn('add')
                    colorElement.setAttribute('selected','')
                }
                this.#colorsElement.append(colorElement)
            })
        this.#colorsElement.addEventListener('change', event => { this.#colorChange(event.target.value) })

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
        const input = this.#quantityElement
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
            this.#btnActionCartElement.innerText = 'Ajouter au panier'
        else if( statusBtn === 'suppr' )
            this.#btnActionCartElement.innerText = 'supprimer du panier'
        else
            this.#btnActionCartElement.innerText = 'Ajouter au panier'
    }
}