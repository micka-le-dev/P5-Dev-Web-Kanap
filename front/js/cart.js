import { CartLocalStorage } from "./class/CartLocalStorage.js"
import { DetailCartComponent } from "./component/DetailCartComponent.js"
import { OrderFormManager } from "./component/OrderFormManager.js"
import { TailleCartComponent } from "./component/TailleCartComponent.js"
import { replaceContentElementByMessage } from "./functions/dom.js"
import { fetchPostJson } from "./functions/fetch.js"
import { redirectToRelativePage } from "./functions/pathName.js"
import { urlApi } from "./var.js"

const cartLocalStorage = new CartLocalStorage()
if( ! cartLocalStorage.isVoid )
    sessionStorage.removeItem('orderId')

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
    event.preventDefault()

    if( cartLocalStorage.isVoid ){
        // event.preventDefault()
        return
    }

    const contact = orderFormManager.getContact()

    if( ! contact ){
        // event.preventDefault()
        return
    }

    const order = {
        contact,
        products: cartLocalStorage.products
    }

    try{
        console.log('order ',order)

        const recutDuServeur = await fetchPostJson(`${urlApi}/order`, order)

        console.log('recutDuServeur ',recutDuServeur)

        const orderId = recutDuServeur.orderId
        console.log('orderId ',orderId)

        if( ! orderId )
            throw new Error('orderId est n\'est pas défini')

        sessionStorage.setItem('orderId',orderId)

        orderFormManager.reset()
        cartLocalStorage.empty()
        tailleCartComponent.updateComponent()

        redirectToRelativePage(orderFormManager.pathAction)
    }
    catch(err){
        event.preventDefault()
        console.error(err)
        replaceContentElementByMessage(cartAndOrderElement, "Désolé, une erreur s'est produite lors de l'envoi de l'ordre de commande.")
    }
})