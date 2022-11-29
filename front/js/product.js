import { setDetailProduitToElement } from "./components/detail-produit.js"
import { ErrorResourceDontExist } from "./Error/ErrorResourceDontExist.js"
import { Cart } from "./functions/cart.js"
import { setMessageInElement } from "./functions/dom.js"
import { fetchGetJson } from "./functions/fetch.js"
import { urlApi } from "./var.js"

const url = new URL(window.location.href)
const id = url.searchParams.get("id")

let messageDErreur

const detailElement = document.querySelector('section.item > article')
const btnAddToCart = detailElement.querySelector('#addToCart')

if( !id )
    messageDErreur = "Aucun produit spécifié."

else{
    try{
        const cart = new Cart()
        const detailProduit = await fetchGetJson(`${urlApi}/${id}`)

        document.querySelector('title').innerText = detailProduit.name
        const dejaDansPanier = cart.findAProduct(detailProduit._id)
        if(dejaDansPanier)
            setDetailProduitToElement(detailProduit, detailElement, dejaDansPanier.color, dejaDansPanier.quantity)
        else
            setDetailProduitToElement(detailProduit, detailElement)
        
        btnAddToCart.addEventListener('click', event => cart.addToCart(event, detailElement, detailProduit))
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