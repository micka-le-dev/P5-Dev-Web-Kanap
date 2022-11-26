import { setDetailProduitToElement } from "./components/detail-produit.js"
import { ErrorResourceDontExist } from "./Error/ErrorResourceDontExist.js"
import { setMessageInElement } from "./functions/dom.js"
import { fetchGetJson } from "./functions/fetch.js"
import { urlApi } from "./var.js"

const url = new URL(window.location.href)
const id = url.searchParams.get("id")

let messageDErreur

const detailElement = document.querySelector('section.item > article')
const display = detailElement.style.display
detailElement.style.display = 'none'

if( !id )
    messageDErreur = "Aucun produit spécifié."

else{
    try{
        const detailProduit = await fetchGetJson(`${urlApi}/${id}`)
        setDetailProduitToElement(detailProduit, detailElement)
    }
    catch(e){
        if( e instanceof ErrorResourceDontExist)
            messageDErreur = "Ce produit n'existe pas."
        else
            messageDErreur = "Erreur réseau."
    }
}

if(messageDErreur)
    setMessageInElement(detailElement,messageDErreur)


detailElement.style.display = display