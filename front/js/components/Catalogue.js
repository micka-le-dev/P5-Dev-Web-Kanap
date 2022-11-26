import { createElement } from "../functions/dom.js"

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

export class Catalogue{

    /** @type {Produit[]}  */
    #catalogue = []

    /**
     * 
     * @param {Produit[]} catalogue 
     */
    constructor(catalogue){
        this.#catalogue = catalogue
    }

    /**
     * 
     * @param {HTMLElement} element 
     */
    appendTo(element){
        this.#catalogue.forEach(produit => {
            element.append(createCardProduct(produit))
        });
    }
}

/**
 * 
 * @param {Produit} produit
 * @return {HTMLElement}
 */
function createCardProduct(produit){
    const carteProduit = createElement('a',{ href: `./product.html?id=${produit._id}` })

    const article = createElement('article')
    carteProduit.append(article)

    article.append(
        createElement('img',{
            src: produit.imageUrl,
            alt: produit.altTxt
        })
    )

    article.append(
        createElement('h3',{
                class: 'productName'
            },
            produit.name
        )
    )

    article.append(
        createElement('p',{
                class: 'productDescription'
            },
            produit.description
        )
    )

    return carteProduit
}