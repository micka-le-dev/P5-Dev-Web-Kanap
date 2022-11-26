import { setDetailProduitToElement } from "./components/detail-produit.js"
import { replaceElementByMessage } from "./functions/dom.js"
import { fetchGetJson } from "./functions/fetch.js"
import { urlApi } from "./var.js"

const url = new URL(window.location.href)
const id = url.searchParams.get("id")

let messageDErreur
if( !id )
    messageDErreur = "Aucun produit spécifié."
else{
    try{
        const detailProduit = await fetchGetJson(`${urlApi}/${id}`)
        const elementDetail = document.querySelector('section.item')
        setDetailProduitToElement(elementDetail, detailProduit)
    }
    catch(e){
        messageDErreur = "Ce produit n'existe pas."
    }
}

if(messageDErreur)
    replaceElementByMessage('.item > article',messageDErreur)