import { DetailCartComponent } from "./components/DetailCartComponent.js"
import { CartLocalStorage } from "./class/CartLocalStorage.js"
import { updateLinkCart } from "./components/taille-cart.js"

const cartLocalStorage = new CartLocalStorage()
updateLinkCart(cartLocalStorage)

const templateItemCart = document.querySelector('template#itemCart')
const cartAndOrderElement = document.querySelector('.cart')

const cartComponent = new DetailCartComponent(cartAndOrderElement, templateItemCart)
cartComponent.update(cartLocalStorage)


cartAndOrderElement.addEventListener('updateCart', event => {
    const item = event.detail
    cartLocalStorage.updateItem(item)
    cartComponent.update(cartLocalStorage)
})
