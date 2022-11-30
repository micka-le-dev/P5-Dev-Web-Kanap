import { urlApi } from "../var.js"
import { Cart } from "./Cart.js"
import { fetchGetJson } from "../functions/fetch.js"

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


export class CartAllData{
    /** @type {Array}  */
    #cartResume = []

    /** @type {Produit[]}  */
    #catalogue

    /** @type {ItemCartAllData[]} */
    #cartCompete = []

    /** @type {number} */
    #nbArticle = 0
    /** @type {number} */
    #totalPrice = 0

    /**
     * @param {Cart} cart
     */
    constructor(cart){
        this.#cartResume = cart.items
    }

    get totalQuantity() { return this.#nbArticle }
    get totalPrice() { return this.#totalPrice }

    async getDetail(){
        if( ! this.#catalogue )
            this.#catalogue = await fetchGetJson(urlApi)

        this.#nbArticle = this.#totalPrice = 0
        this.#cartCompete = []

        this.#cartResume.forEach(item => {
            console.log(item, item.quantity)
            const itemCartAllData = this.#createItemAllData(item)
            this.#cartCompete.push(itemCartAllData)
            this.#nbArticle += itemCartAllData.quantity
            this.#totalPrice += itemCartAllData.priceWithQuantity
        });
    }

    /**
     * @param {Cart} cart
     */
    setCart(cart){
        this.#cartResume = cart.items
    }

    /**
     * @param {ItemCart} itemCart
     * @return {ItemCartAllData} price = price unit * quantity
     */
    #createItemAllData(itemCart){
        const detailProduit = this.#catalogue.find(produit => produit._id === itemCart.idProduct)
        if( ! detailProduit )
            throw new Error('detail produit non trouvé')

        /** @type {ItemCartAllData} */
        const itemAllData = {
            idProduct: itemCart.idProduct,
            color: itemCart.color,
            quantity: itemCart.quantity*1,
            priceWithQuantity: detailProduit.price * itemCart.quantity,
            name: detailProduit.name,
            description: detailProduit.description,
            imageUrl: detailProduit.imageUrl,
            altTxt: detailProduit.altTxt
        }

        return itemAllData
    }

    /**
     * @param {callback} callback
     */
    forEach(callback){
        this.#cartCompete.forEach( item => callback(item))
    }
}