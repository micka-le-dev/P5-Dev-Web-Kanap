import { CartLocalStorage } from "./class/CartLocalStorage.js"
import { DetailProductComponent } from "./component/DetailProductComponent.js"
import { TailleCartComponent } from "./component/TailleCartComponent.js"
import { ErrorId } from "./Error/ErrorId.js"
import { fetchGetJson } from "./functions/fetch.js"
import { urlApi } from "./var.js"


const cartLocalStorage = new CartLocalStorage()
const tailleCartComponent = new TailleCartComponent('#js-statusCart',cartLocalStorage)
const detailProductComponent = new DetailProductComponent(cartLocalStorage, 'section.item > article')

try{

    const url = new URL(window.location.href)
    const id = url.searchParams.get("id")
    if ( ! id )
        throw new ErrorId("aucun id n'est spécifié")

    const detailProduit = await fetchGetJson(`${urlApi}/${id}`)

    detailProductComponent.initDetailProduct(detailProduit)
    /**
     * @param {string} idProduct
     * @param {string} color
     * @param {number} quantity
     */
    detailProductComponent.actionClickBtn = function (idProduct, color, quantity){
                                                cartLocalStorage.updateItem( { idProduct, color, quantity } )
                                                tailleCartComponent.updateComponent()
                                            }

}catch(err){
    if( err instanceof ErrorId)
        detailProductComponent.setMessageError("Désole, aucun produit n'est spécifié.")
    else{
        detailProductComponent.setMessageError("Désolé, une erreur est survenue.")
        console.error(err)
    }
}