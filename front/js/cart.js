import { setDetailCartToElement } from "./components/detail-cart.js"
import { DetailCartComponent } from "./components/DetailCartComponent.js"
import { Cart } from "./functions/cart.js"

const cart = new Cart()

const templateItemCart = document.querySelector('template#itemCart')
const cartAndOrderElement = document.querySelector('.cart')

const cartComponent = new DetailCartComponent(cartAndOrderElement, templateItemCart)
cartComponent.update(cart)


cartAndOrderElement.addEventListener('updateCart', event => {
    const item = event.detail
    console.log(item)
    cart.updateItem(item)
    cartComponent.update(cart)
})


// setDetailCartToElement(cart, cartAndOrderElement)
