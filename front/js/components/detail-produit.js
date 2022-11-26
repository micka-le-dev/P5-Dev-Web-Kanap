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


/**
 * 
 * @param {HTMLElement} elementDetail
 * @param {Produit} produit
 * @return {HTMLElement}
 */
export function setDetailProduitToElement(produit,elementDetail){

    const img = createElement('img',{
                                src: produit.imageUrl,
                                alt: produit.altTxt
                            })
    elementDetail
        .querySelector('.item__img')
        .append(img)

    elementDetail
        .querySelector('#title')
        .innerText = produit.name

    elementDetail
        .querySelector('#price')
        .innerText = produit.price

    elementDetail
        .querySelector('#description')
        .innerText = produit.description

    const colorsElement = elementDetail.querySelector('#colors')
    produit.colors.forEach( color => {
        const colorElement = createElement('option',
                                            {value: color },
                                            color)
        colorsElement.append(colorElement)
    })

    return elementDetail
}
