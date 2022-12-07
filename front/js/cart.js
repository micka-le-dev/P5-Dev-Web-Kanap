import { CartLocalStorage } from "./class/CartLocalStorage.js"
import { DetailCartComponent } from "./component/DetailCartComponent.js"
import { OrderFormManager } from "./component/OrderFormManager.js"
import { TailleCartComponent } from "./component/TailleCartComponent.js"

const cartLocalStorage = new CartLocalStorage()
const tailleCartComponent = new TailleCartComponent('#js-statusCart',cartLocalStorage)

const templateItemCart = document.querySelector('template#itemCart')
const cartAndOrderElement = document.querySelector('.cart')

const cartComponent = new DetailCartComponent(cartAndOrderElement, templateItemCart)
cartComponent.update(cartLocalStorage)


cartAndOrderElement.addEventListener('updateItemCart', event => {
    const item = event.detail
    const product = cartComponent.catalogue.find(elem => elem._id === item.idProduct)
    cartLocalStorage.updateItem(item, product)
    cartComponent.update(cartLocalStorage)
    tailleCartComponent.updateComponent()
})


const formOrder = document.querySelector('.cart__order__form')
const orderFormManager = new OrderFormManager(formOrder)
formOrder.addEventListener('submit', event => {
    event.preventDefault() // dev

    if( cartLocalStorage.isVoid ){
        event.preventDefault()
        return
    }

    const contact = orderFormManager.getContact(event)

    if( ! contact ){
        return
    }

    const order = {
        contact,
        cart: cartLocalStorage.products
    }
})