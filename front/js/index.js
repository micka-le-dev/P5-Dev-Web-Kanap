import { Catalogue } from "./components/Catalogue.js"
import { fetchGetJson } from "./functions/utils.js"
import { urlApi } from "./var.js"


try{
    const catalogue = await fetchGetJson(urlApi)
    const newCatalogue = new Catalogue(catalogue)
    newCatalogue.appendTo(document.getElementById('items'))
}
catch(e){
    console.error("try catch général")
    console.error(e.message)
    console.error(e.cause)
    console.error(e)
}
