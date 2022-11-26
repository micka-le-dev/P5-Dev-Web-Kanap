import { Catalogue } from "./components/Catalogue.js"
import { setMessageInElement } from "./functions/dom.js"
import { fetchGetJson } from "./functions/fetch.js"
import { urlApi } from "./var.js"


try{
    const catalogue = await fetchGetJson(urlApi)
    const newCatalogue = new Catalogue(catalogue)
    newCatalogue.appendTo(document.getElementById('items'))
}
catch(e){
    setMessageInElement('#items','Impossible de charger nos produit.')
}
