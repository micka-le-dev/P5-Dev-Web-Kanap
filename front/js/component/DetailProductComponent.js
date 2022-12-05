import { CartLocalStorage } from "../class/CartLocalStorage.js";
import { createElement, replaceContentElementByMessage } from "../functions/dom.js";
import { InputQuantityManager } from "./inputQuantityManager.js";
import { MessageAfterActionUser } from "./MessageAfterActionUser.js"

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

    /** @type {InputQuantityManager} */
    #quantityManager

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

    /** @type {MessageAfterActionUser} */
    #messageToUser


    /**
     * @param {CartLocalStorage} cartLocalStorage
     * @param {string} selecteurCSS
     * @param {MessageAfterActionUser} messageToUser
     */
    constructor(cartLocalStorage, selecteurCSS, messageToUser){
        this.#cartLocalStorage = cartLocalStorage
        this.#contenerDetailElement = document.querySelector(selecteurCSS)
        this.#messageToUser = messageToUser
    }

    /** @return {string} */
    get idProduct() { return this.#produit._id }

    /** @return {string} */
    get color() { return this.#colorsElement?.value }

    /** @return {boolean} */
    get noColorSelected() { return this.color === ''}

    /** @return {number} */
    get quantity() { return this.#quantityManager?.quantity }

    /**
     * @param {Function} actionBtn
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

        this.#quantityManager = new InputQuantityManager( this.#contenerDetailElement.querySelector('#quantity'), true )
        this.#quantityManager.actionChangeValue(() => { this.#quantityChange() })

        this.#quantityManager.disabled = true
        this.#updateTextBtn(undefined)

        this.#colorsElement = this.#contenerDetailElement.querySelector('#colors')
        produit.colors.forEach( color => this.#initColorElement(color) )
        this.#colorsElement.addEventListener('change', event => { this.#colorChange(event.target.value) })

        this.#messageToUser.update('no-message')
        return this.#contenerDetailElement
    }

    /**
     * @param {string} color
     */
    #initColorElement(color){
        const colorElement = createElement('option',
                                            {value: color },
                                            color
                                            )
        if( color === this.#dejaDansPanier?.color){
            colorElement.setAttribute('selected','')
            this.#quantityManager.quantity = this.#dejaDansPanier.quantity
            this.#quantityManager.disabled = false
            this.#updateTextBtn('add')
        }
        this.#colorsElement.append(colorElement)
    }

    /**
     * @param {string} color
     */
    #colorChange(color){

        if ( this.noColorSelected ){
            this.#dejaDansPanier = undefined
            this.#updateTextBtn(undefined)
            this.#quantityManager.disabled = true
            this.#messageToUser.update('no-color-selected')
            return
        }

        this.#updateTextBtn('add')
        this.#dejaDansPanier = this.#cartLocalStorage.findByIdAndColor(this.#produit._id, color)
        this.#messageToUser.update('no-message')
        const quantity = this.#dejaDansPanier?.quantity ?? 1
        this.#quantityManager.quantity = quantity
        this.#quantityManager.disabled = false
    }

    #quantityChange(){
        const evolutionQuantity = this.#quantityManager.correctQuantity()

        console.log('evolutionQuantity', evolutionQuantity)
        switch(evolutionQuantity){

            case 'delete':
                this.#updateTextBtn('suppr')
                break

            case 'decrease':
            case 'increase':
                this.#updateTextBtn('add')
                break

            case 'no-change':
                return

            default:
                this.#updateTextBtn()
        }
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