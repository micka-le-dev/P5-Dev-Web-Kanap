import { DetailCartComponent } from "./components/DetailCartComponent.js"
import { CartLocalStorage } from "./class/CartLocalStorage.js"

const cartLocalStorage = new CartLocalStorage()

const templateItemCart = document.querySelector('template#itemCart')
const cartAndOrderElement = document.querySelector('.cart')

const cartComponent = new DetailCartComponent(cartAndOrderElement, templateItemCart)
cartComponent.update(cartLocalStorage)


cartAndOrderElement.addEventListener('updateCart', event => {
    const item = event.detail
    cartLocalStorage.updateItem(item)
    cartComponent.update(cartLocalStorage)
})
