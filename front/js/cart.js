import { CartLocalStorage } from "./class/CartLocalStorage.js"
import { DetailCartComponent } from "./component/DetailCartComponent.js"
import { OrderFormManager } from "./component/OrderFormManager.js"
import { TailleCartComponent } from "./component/TailleCartComponent.js"
import { fetchPostJson } from "./functions/fetch.js"
import { urlApi } from "./var.js"

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
formOrder.addEventListener('submit', async (event) => {
    event.preventDefault() // dev

    if( cartLocalStorage.isVoid ){
        event.preventDefault()
        return
    }

    const contact = orderFormManager.getContact(event)

    if( ! contact ){
        event.preventDefault()
        return
    }

    const order = {
        contact,
        products: cartLocalStorage.products
    }

    try{
        console.log('order ',order)

        const numOrder = await fetchPostJson(`${urlApi}/order`, order)

        console.log('numOrder ',numOrder)
    }
    catch(err){
        event.preventDefault()
        console.error(err)
    }
})