import { CartLocalStorage } from "./class/CartLocalStorage.js"
import { DetailProductComponent } from "./component/DetailProductComponent.js"
import { TailleCartComponent } from "./component/TailleCartComponent.js"

const url = new URL(window.location.href)
const id = url.searchParams.get("id")

let messageDErreur

const detailProduit = await fetchGetJson(`${urlApi}/${id}`)

const cartLocalStorage = new CartLocalStorage()

const tailleCartComponent = new TailleCartComponent('#js-statusCart',cartLocalStorage)

/**
 * @param {string} idProduct
 * @param {string} color
 * @param {number} quantity
 */
const actionBtnAddCart = function (idProduct, color, quantity){
    cartLocalStorage.updateItem( { idProduct, color, quantity } )
    tailleCartComponent.updateComponent()
}
const detailProductComponent = new DetailProductComponent(cartLocalStorage, 'section.item > article', actionBtnAddCart)
detailProductComponent.initDetailProduct(detailProduit)
