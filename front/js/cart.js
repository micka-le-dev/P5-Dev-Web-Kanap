import { setDetailCartToElement } from "./components/detail-cart.js"
import { Cart } from "./functions/cart.js"

const cart = new Cart()
const cartElement = document.querySelector('.cart')
cartElement.addEventListener('updateCart', event => updateCart(event, cart, cartElement))


setDetailCartToElement(cart, cartElement)
