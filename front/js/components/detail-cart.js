import { Cart } from "../functions/cart.js"
import { CartAllData } from "../functions/CartAllData.js"

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
    cartAllData.forEach(item => appendItemToElement(item, cartItemElement, template));

    cartElement.querySelector('#totalQuantity').innerText = cartAllData.totalQuantity
    cartElement.querySelector('#totalPrice').innerText = cartAllData.totalPrice
}

/**
 * @param {ItemCartAllData} itemCartAllData
 * @param {HTMLElement} element
 * @param {HTMLElement} template
 */
function appendItemToElement(itemCartAllData, element, template){
    const itemElement = template.content.cloneNode(true).querySelector('.cart__item')
    itemElement.addEventListener('updateItemCart', event => updateItemCart(event))

    itemElement.setAttribute('data-id',itemCartAllData.idProduct)
    itemElement.setAttribute('data-color',itemCartAllData.color)

    const img = itemElement.querySelector('.cart__item__img > img')
    img.setAttribute('src', itemCartAllData.imageUrl)
    img.setAttribute('alt', itemCartAllData.altTxt)

    const description = itemElement.querySelector('.cart__item__content__description')
    description.querySelector('h2').innerText = itemCartAllData.name
    const ps = description.querySelectorAll('p')
    ps[0].innerText = itemCartAllData.color
    ps[1].innerText = itemCartAllData.priceWithQuantity + " €"

    const inputQuantity = itemElement.querySelector('.itemQuantity')
    inputQuantity.value = itemCartAllData.quantity
    inputQuantity.addEventListener('change', event => changeQuantity(event))
    itemElement.querySelector('.deleteItem').addEventListener('click', event => deleteToCart(event))

    element.append(itemElement)
}

export function updateCart(event, cart, cartElement){
    // déclnché par 'updateCart'
    setDetailCartToElement(cart, cartElement)
}
function updateItemCart(event){
    // déclnché par 'updateItemCart' => émet evenement perso 'updateCart' capturé au niveau de '.cart'
}
function changeQuantity(event){
    // déclnché par 'click' => émet evenement perso 'updateItemCart' capturé au niveau de '.cart__item'
}
function deleteToCart(event){
    // déclnché par 'click' => émet evenement perso 'updateItemCart' capturé au niveau de '.cart__item'
}