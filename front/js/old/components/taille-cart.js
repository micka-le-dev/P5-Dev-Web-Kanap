import { CartLocalStorage } from "../class/CartLocalStorage.js";

/**
 * affiche la taille du panier dans le lien vers la page panier
 * @param {CartLocalStorage} cartLocalStorage
 */
export function updateLinkCart(cartLocalStorage){
    const lien = document.querySelector('#js-statusCart')
    if ( lien )
        lien.innerText = cartLocalStorage.nbItemTostring()
}