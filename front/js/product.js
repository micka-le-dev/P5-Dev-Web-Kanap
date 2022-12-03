import { CartLocalStorage } from "./class/CartLocalStorage.js"
import { DetailProductComponent } from "./component/DetailProductComponent.js"
import { TailleCartComponent } from "./component/TailleCartComponent.js"

const url = new URL(window.location.href)
const id = url.searchParams.get("id")

/**
 * @param {string} idProduct
 * @param {string} color
 * @param {number} quantity
 */
const cartLocalStorage = new CartLocalStorage()
const detailProductComponent = new DetailProductComponent(cartLocalStorage, 'section.item > article')
const tailleCartComponent = new TailleCartComponent('#js-statusCart',cartLocalStorage)

let messageDErreur

detailProductComponent.actionClickBtn = function (idProduct, color, quantity){
    cartLocalStorage.updateItem( { idProduct, color, quantity } )
    tailleCartComponent.updateComponent()
}
const detailProduit = await fetchGetJson(`${urlApi}/${id}`)
detailProductComponent.initDetailProduct(detailProduit)
