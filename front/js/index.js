import { CartLocalStorage } from "./class/CartLocalStorage.js"
import { Catalogue } from "./components/Catalogue.js"
import { updateLinkCart } from "./components/taille-cart.js"
import { setMessageInElement } from "./functions/dom.js"
import { fetchGetJson } from "./functions/fetch.js"
import { urlApi } from "./var.js"


try{
    const cartLocalStorage = new CartLocalStorage()
    updateLinkCart(cartLocalStorage)
    const catalogue = await fetchGetJson(urlApi)
    const newCatalogue = new Catalogue(catalogue)
    newCatalogue.appendTo(document.getElementById('items'))
}
catch(e){
    setMessageInElement(document.querySelector('#items'),'Impossible de charger nos produit.')
    console.log(e)
}
