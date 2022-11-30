import { Cart } from "../functions/cart.js"
import { CartAllData } from "../functions/CartAllData.js"
import { DetailItemCartComponent } from "./DetailItemCartComponent.js"

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


/**
 * 
 * @param {Cart} cart
 * @param {HTMLElement} cartElement
 */
export async function setDetailCartToElement(cart, cartElement){
    const template = cartElement.querySelector('template#itemCart')

    const cartAllData = new CartAllData(cart)
    await cartAllData.getDetail()

    const cartItemElement = cartElement.querySelector('#cart__items')
    cartAllData.forEach(item => {
        new DetailItemCartComponent(template, item).appendTo(cartItemElement)
    });

    cartElement.querySelector('#totalQuantity').innerText = cartAllData.totalQuantity
    cartElement.querySelector('#totalPrice').innerText = cartAllData.totalPrice
}
