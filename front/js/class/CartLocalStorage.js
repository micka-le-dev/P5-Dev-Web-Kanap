import { updateLinkCart } from "../components/taille-cart.js"
import { ErrorColorProduct } from "../Error/ErrorcolorProduct.js"
import { getArrayLocalStorage, setArrayLocalStorage } from "../functions/localStorage.js"

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

    get items() { return this.#panier }
    get isVoid() {  return ! this.#panier || ! this.#panier.length }

    /**
     * @param {Event} event
     * @param {HTMLElement} detailElement
     * @param {Produit} product
     */
     addToCart(event, detailElement, product){
        event.preventDefault()

        const color = detailElement.querySelector('#colors').value
        const quantityElement = detailElement.querySelector('#quantity')
        const quantity = quantityElement.value * 1

        try{
            this.add(product,color, quantity)
        }
        catch(err){
            if( err instanceof ErrorColorProduct)
                alert("Vous devez seléctionner une couleur pour ajouter ce produit au panier.")
        }
    }

    /**
     * @param {Produit} product
     * @param {string} color
     * @param {number} quantity
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
        this.updateItem(item)
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
     * cherche si une produit de cetee couleur est dans le panier
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
    findAProduct(idProduct){
        return this.#panier.find(item => item.idProduct === idProduct)
    }

    /**
     * @param {ItemCart} item
     */
     updateItem(item){
        item.quantity *= 1
        this.#updateItemOfArray(item)
        this.#sort()
        this.#updateLocalStorage()

        this.console()

        updateLinkCart(this)
    }

    /**
     * @param {ItemCart} item
     */
    #updateItemOfArray(item){
        if( item.quantity >= 1)
            this.#addItem(item)
        else if( item.quantity == 0)
            this.#removeItem(item)

        this.#compteNbArticle()
    }

    /**
     * @param {ItemCart} item
     */
     #addItem(item){
        const index = this.#findIndex(item)

        if( index >= 0 )
            this.#panier[index].quantity = item.quantity
        else
            this.#panier.push(item)
    }

    /**
     * @param {ItemCart} item
     */
    #removeItem(item){
        const index = this.#findIndex(item)

        if(index >= 0)
        {
            this.#panier.splice(index,1)
            this.#nbArticle -= item.quantity
        }
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
}
