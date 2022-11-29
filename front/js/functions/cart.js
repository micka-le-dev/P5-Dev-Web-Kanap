import { getArrayLocalStorage, setArrayLocalStorage } from "./localStorage.js"

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

export class Cart{
    /** @type {ItemCart[]} */
    #panier = []
    /** @type {string} */
    #keyLocalStorage

    /**
     * 
     * @param {string} keyLocalStorage
     */
    constructor(keyLocalStorage = 'cart'){
        this.#keyLocalStorage = keyLocalStorage

        this.#panier = getArrayLocalStorage(keyLocalStorage, false)

        console.log(this.#panier)

        if( ! this.#panier instanceof Array )
            throw new Error("le panier n'est pas un tableau")
    }
    
    /**
     * 
     * @param {Event} event
     * @param {HTMLElement} detailElement
     * @param {Produit} product
     */
     addToCart(event, detailElement, product){
        event.preventDefault()

        const color = detailElement.querySelector('#colors').value
        const quantityElement = detailElement.querySelector('#quantity')
        const quantity = quantityElement.value * 1

        this.add(product,color, quantity)
    }

    /**
     * 
     * @param {Produit} product
     * @param {string} color
     * @param {number} quantity
     */
    add(product, color, quantity){
        if( quantity < 0 )
            throw new Error(`${quantity} n'est pas une quantité valide`)

        // vérifi si cette couleur est possible pour ce produit
        if( ! product.colors.find(couleur => couleur === color) )
            throw new Error(`${color} n'est pas une couleur valide`)

        const item = {
            idProduct: product._id,
            color: color,
            quantity: quantity*1
        }
        this.#updateCart(item)
        this.#updateLocalStorage()

        console.log(this.#panier)
    }

    /**
     * cherche si une produit de cetee couleur est dans le panier
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
     * 
     * @param {ItemCart} item
     */
    #updateCart(item){
        const index = this.#findIndex(item)

        if( index < 0) // item n'est pas dans le pannier
        {
            this.#panier.push(item)
            return
        }

        if( item.quantity == 0) // supprime l'item du pannier
        {
            this.#panier.splice(index,1)
            return
        }

        this.#panier[index].quantity += item.quantity
    }

    #updateLocalStorage(){
        setArrayLocalStorage(this.#keyLocalStorage, this.#panier)
    }
}
