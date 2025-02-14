import { ErrorColorProduct } from "../Error/ErrorColorProduct.js"
import { appendMessageToElement } from "../functions/dom.js"
import { getArrayLocalStorage, setArrayLocalStorage } from "../functions/localStorage.js"
import { isString } from "../functions/utils.js"

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

export class CartLocalStorage{

    /** @type {ItemCart[]} */
    #panier = []

    /** @type {string} */
    #keyLocalStorage

    /** @type {number} */
    #nbArticle = 0

    /**
     * @param {string} keyLocalStorage
     */
    constructor(keyLocalStorage = 'cart'){
        this.#keyLocalStorage = keyLocalStorage

        this.#panier = getArrayLocalStorage(keyLocalStorage, false)
        this.#compteNbArticle()
        this.#sort()

        this.console()

        if( ! this.#panier instanceof Array )
            throw new Error("le panier n'est pas un tableau")
    }

    /** @return {ItemCart[]} */
    get items() { return this.#panier }


    /**
     * @typedef {Object} ProductCart
     * @property {string} _id
     * @property {string} color
     * @property {number} quantity
     */
    /** @return {ProductCart[]} */
    get detailsCart(){
        const products = []
        this.#panier.forEach(item => {
            products.push({
                _id: item.idProduct,
                color: item.color,
                quantity: item.quantity
            })
        })
        return products
    }

    /** @return {string[]} la liste des id des produit dans le panier */
    get ids(){
        const ids = []
        this.#panier.forEach(item => {
            ids.push(item.idProduct)
        })
        return ids
    }
    /** @return {boolean} */
    get isVoid() {  return ! this.#panier || this.#panier.length <= 0 }


    /**
     * @param {Produit} product
     * @param {string} color
     * @param {number} quantity
     * @param {Produit} productAllDetails
     * @return {string} action réalisé
     */
    add(product, color, quantity){
        quantity *= 1
        if( quantity < 0 )
            throw new Error(`${quantity} n'est pas une quantité valide`)

        // vérifi si cette couleur est possible pour ce produit
        if( ! product.colors.find(couleur => couleur === color) )
            throw new ErrorColorProduct(`${color} n'est pas une couleur valide`)

        const item = {
            idProduct: product._id,
            color: color,
            quantity: quantity*1
        }
        return this.updateItem(item)
    }

    /**
     * cherche si une produit de cette couleur est dans le panier
     * @param {ItemCart} item
     * @return { number} index de l'item
     */
     #findIndex(itemFind){
        return this.#panier.findIndex(item => {
            const bonProduit = item.idProduct === itemFind.idProduct
            const bonneCouleur = item.color === itemFind.color
            return bonProduit && bonneCouleur
        })
    }
    /**
     * cherche si une produit de cette couleur est dans le panier
     * @param {ItemCart} item
     * @return { ItemCart }
     */
    find(itemFind){
        return this.#panier.find(item => {
            const bonProduit = item.idProduct === itemFind.idProduct
            const bonneCouleur = item.color === itemFind.color
            return bonProduit && bonneCouleur
        })
    }

    /**
     * cherche si un produit est dans le panier independament de ses options
     * @param {string} idProduct
     * @return {ItemCart}
     */
    findByIdProduct(idProduct){
        return this.#panier.find(item => item.idProduct === idProduct)
    }
    /**
     * cherche si une produit de cette couleur est dans le panier
     * @param {string} idProduct
     * @param {string} color
     * @return {ItemCart}
     */
    findByIdAndColor(idProduct,color){
        return this.find({idProduct, color, quantity: 1})
    }

    /**
     * @param {ItemCart} item
     * @param {Produit} productAllDetails
     * @return {string} action réalisé
     */
     updateItem(item,productAllDetails = undefined){
        item.quantity = item.quantity * 1 ?? undefined

        if ( ! this.itemIsValid(item,productAllDetails) )
            return

        const action = this.#updateItemOfArray(item)
        this.#sort()
        this.#updateLocalStorage()

        this.console()

        return action
    }

    /**
     * @param {ItemCart} item
     * @param {Produit} productAllDetails
     * @returns {boolean}
     */
    itemIsValid(item,productAllDetails = undefined){
        const compatibleAvecUnProduitExistant =
                        productAllDetails == undefined
                        ||(
                            productAllDetails._id === item.idProduct
                            && productAllDetails.colors.find(couleur => couleur === item.color)
                          )
        if(
            item
            && isString( item.idProduct )
            && isString( item.color )
            && compatibleAvecUnProduitExistant
            && Number.isInteger(item.quantity)
        )
            return true
        return false
    }
    /**
     * @param {ItemCart} item
     * @return {string} action réalisé
     */
    #updateItemOfArray(item){
        let action
        if( item.quantity >= 1){
            action = this.#addItem(item)
        }
        else if( item.quantity == 0){
            action = this.#removeItem(item)
        }

        this.#compteNbArticle()
        return action
    }

    /**
     * @param {ItemCart} item
     * @return {string} action réalisé
     */
     #addItem(item){
        const index = this.#findIndex(item)
        let action
        if( index >= 0 ){
            if( this.#panier[index].quantity != item.quantity ){
                action = 'update-quantity'
                this.#panier[index].quantity = item.quantity
            }
            else{
                action = 'no-change-quantity'
            }
        }
        else{
            this.#panier.push(item)
            action = 'add'
        }
        return action
    }

    /**
     * @param {ItemCart} item
     * @return {string} action réalisé
     */
    #removeItem(item){
        const index = this.#findIndex(item)

        if(index >= 0)
        {
            this.#panier.splice(index,1)
            return 'delete'
        }

        return 'not-available'
    }

    #updateLocalStorage(){
        setArrayLocalStorage(this.#keyLocalStorage, this.#panier)
    }

    /**
     * tri le panier pour que les produits similaire soit côte-à-côte
     */
    #sort(){
        this.#panier.sort( (a,b) => a.idProduct.localeCompare(b.idProduct))
    }

    /**
     * affiche le contenu du panier dans la console
     */
    console(){
        console.log("cartLocalStorage ", this.#panier)
    }

    /**
     * @returns {string} exemples de retour : "( 1 article )", "( 2 artcles )", "vide"
     */
    nbItemTostring(){
        const sAuMotArticle = this.#nbArticle >= 2 ? 's' : ''
        return this.#nbArticle >= 1 ?
                `( ${this.#nbArticle} article${sAuMotArticle} )`
                : 'vide'
    }

    #compteNbArticle(){
        this.#nbArticle = 0
        this.#panier.forEach(item => this.#nbArticle += item.quantity )
    }

    empty(){
        this.console()
        this.#panier = []
        localStorage.removeItem(this.#keyLocalStorage)
        this.console()
    }
}
