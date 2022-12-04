import { CartLocalStorage } from "./class/CartLocalStorage.js"
import { CatalogueComponent } from "./component/CatalogueComponent.js"
import { TailleCartComponent } from "./component/TailleCartComponent.js"
import { replaceContentElementByMessage } from "./functions/dom.js"
import { fetchGetJson } from "./functions/fetch.js"
import { urlApi } from "./var.js"

const cartLocalStorage = new CartLocalStorage()
const tailleCartComponent = new TailleCartComponent('#js-statusCart',cartLocalStorage)

const contenerCatalogElement = document.querySelector('#items')

try{
    const catalogue = await fetchGetJson(urlApi)
    const catalogueComponent = new CatalogueComponent(catalogue)
    catalogueComponent.appendTo(contenerCatalogElement)
}
catch(err){
    replaceContentElementByMessage(contenerCatalogElement, 'Désolé, impossible de charger nos produit.')
    console.error(err)
}