import { Cart } from "../class/Cart.js"
import { conrrigeInputNombre, createElement } from "../functions/dom.js"

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
 * @param {Produit} produit
 * @param {HTMLElement} elementDetail
 * @param {string | undefined} preSeletionCouleur
 * @param {number | undefined} preSelectionQuantite
 * @return {HTMLElement}
 */
export function setDetailProduitToElement(produit,elementDetail, preSeletionCouleur = undefined, preSelectionQuantite = undefined){

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
        if( color === preSeletionCouleur)
            colorElement.setAttribute('selected','')
        colorsElement.append(colorElement)
    })

    const quantityElement = document.querySelector('#quantity')


    quantityElement.addEventListener('change', e => conrrigeInputNombre(e.target) )
    if(preSelectionQuantite)
        quantityElement.value = preSelectionQuantite < 0 ? 0 : preSelectionQuantite
    conrrigeInputNombre(quantityElement)

    return elementDetail
}

/**
 * @param {string} idProduct
 * @param {string} color
 * @param {Cart} cart
 */
export function upDateInputQuantity(idProduct, color, cart){
    const item = cart.find({idProduct, color, quantity: 1})
    const quantity = item?.quantity ?? 1
    document.querySelector('#quantity').value = quantity
}