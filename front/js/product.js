import { setDetailProduitToElement, upDateInputQuantity } from "./components/detail-produit.js"
import { ErrorResourceDontExist } from "./Error/ErrorResourceDontExist.js"
import { CartLocalStorage } from "./class/CartLocalStorage.js"
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
        const cartLocalStorage = new CartLocalStorage()
        const detailProduit = await fetchGetJson(`${urlApi}/${id}`)

        document.querySelector('title').innerText = detailProduit.name
        const dejaDansPanier = cartLocalStorage.findAProduct(detailProduit._id)
        if(dejaDansPanier)
            setDetailProduitToElement(detailProduit, detailElement, dejaDansPanier.color, dejaDansPanier.quantity)
        else
            setDetailProduitToElement(detailProduit, detailElement)

        document.querySelector("#colors").addEventListener('change', e => upDateInputQuantity(detailProduit._id, e.target.value, cartLocalStorage))
        
        document.querySelector('#quantity').addEventListener('btnAddToDelete', event => { btnAddToCart.innerText = "Supprimer du panier"   })
        document.querySelector('#quantity').addEventListener('btnDeleteToAdd', event => { btnAddToCart.innerText = "Ajouter au panier"     })

        btnAddToCart.addEventListener('click', event => cartLocalStorage.addToCart(event, detailElement, detailProduit))
    }
    catch(e){
        if( e instanceof ErrorResourceDontExist)
            messageDErreur = "Ce produit n'existe pas."
        else{
            messageDErreur = "Erreur réseau."
            console.error(e)
        }
    }
}

if(messageDErreur)
    setMessageInElement(detailElement,messageDErreur)