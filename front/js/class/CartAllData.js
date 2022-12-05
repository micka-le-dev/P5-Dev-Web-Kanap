import { fetchGetJson } from "../functions/fetch.js"
import { urlApi } from "../var.js"
import { CartLocalStorage } from "./CartLocalStorage.js"

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

    /** @type {boolean} */
    #isCompleted = false



    /**
     * @param {CartLocalStorage} cartLocalStorage
     */
    constructor(cartLocalStorage = new CartLocalStorage()){
        this.#cartResume = cartLocalStorage.items
    }

    get totalQuantity() { return this.#nbArticle }
    get totalPrice() { return this.#totalPrice }
    get isOk() { return this.#isCompleted }
    get isNotOk() { return ! this.#isCompleted }
    get catalogue() { return this.#catalogue }

    /**
     * contacte le serveur pour obtenir les prix des articles dans le panier
     * @param {boolean} throwErrorLoadDetails lancer une Exception en cas de problème pour charger le details du panier
     */
    async getDetail(throwErrorLoadDetails = true){
        this.#isCompleted = false

        this.#nbArticle = this.#totalPrice = 0
        this.#cartCompete = []

        if( ! this.#cartResume )
            throw new Error("aucun panier n'est spécifié, utiliser la méthode setCart(cartLocalStorage)")

        if( this.#cartResume.length == 0)
        {
            this.#isCompleted = true
            return
        }

        try{
            if( ! this.#catalogue )
                this.#catalogue = await fetchGetJson(urlApi)

            this.#cartResume.forEach(item => {
                const itemCartAllData = this.#createItemAllData(item)
                this.#cartCompete.push(itemCartAllData)
                this.#nbArticle += itemCartAllData.quantity
                this.#totalPrice += itemCartAllData.priceWithQuantity
            });

            this.#isCompleted = true
        }
        catch(err){
            this.#isCompleted = false
        }

        if( ! this.#isCompleted && throwErrorLoadDetails )
            throw new Error("Impossoble de charger le détail du panier")
    }

    /**
     * Attention, ne contact pas le serveur, pour celà, utilisez la méthode async getDetail()
     * @param {CartLocalStorage} cartLocalStorage
     */
    setCart(cartLocalStorage){
        this.#cartResume = cartLocalStorage.items
    }

    /**
     * contacte le serveur pour obtenir les prix des articles dans le panier
     * @param {CartLocalstorage} cartLocalStorage
     * @param {boolean} throwErrorLoadDetails lancer une Exception en cas de problème pour charger le details du panier
     * @returns {boolean}
     */
    async updateCart(cartLocalStorage, throwErrorLoadDetails = true){
        this.#cartResume = cartLocalStorage.items
        await this.getDetail(throwErrorLoadDetails)
        return this.#isCompleted
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