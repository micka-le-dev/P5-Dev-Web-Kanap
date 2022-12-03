import { CartLocalStorage } from "./class/CartLocalStorage.js"
import { DetailProductComponent } from "./component/DetailProductComponent.js"
import { TailleCartComponent } from "./component/TailleCartComponent.js"

const url = new URL(window.location.href)
const id = url.searchParams.get("id")

let messageDErreur

const cartLocalStorage = new CartLocalStorage()

const tailleCartComponent = new TailleCartComponent('#js-statusCart',cartLocalStorage)

const detailElement = document.querySelector('section.item > article')
const detailProductComponent = new DetailProductComponent(cartLocalStorage, detailElement)

const detailProduit = await fetchGetJson(`${urlApi}/${id}`)
detailProductComponent.initDetailProduct(detailProduit)