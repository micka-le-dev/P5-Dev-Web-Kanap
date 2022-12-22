import { CartLocalStorage } from "./class/CartLocalStorage.js"
import { DetailProductComponent } from "./component/DetailProductComponent.js"
import { MessageAfterActionUser } from "./component/MessageAfterActionUser.js"
import { TailleCartComponent } from "./component/TailleCartComponent.js"
import { ErrorId } from "./Error/ErrorId.js"
import { ErrorResourceDontExist } from "./Error/ErrorResourceDontExist.js"
import { fetchGetJson } from "./functions/fetch.js"
import { urlApi } from "./var.js"


var cartLocalStorage = new CartLocalStorage()
var tailleCartComponent = new TailleCartComponent('#js-statusCart',cartLocalStorage)
var messageToUser = new MessageAfterActionUser(document.querySelector('.item__content__addButton'), 'afterend')
var detailProductComponent = new DetailProductComponent(cartLocalStorage, 'section.item > article', messageToUser)


try{

    const url = new URL(window.location.href)
    const id = url.searchParams.get("id")
    if ( ! id )
        throw new ErrorId("aucun id n'est spécifié")

    var produit = await fetchGetJson(`${urlApi}/${id}`)

    document.querySelector('title').innerText = produit.name
    detailProductComponent.initDetailProduct(produit)


    detailProductComponent.actionClickBtn( userModifyCart )

}catch(err){
    document.querySelector('title').innerText = 'Aucun détail sur ce produit'
    if( err instanceof ErrorId)
        detailProductComponent.setMessageError("Désole, aucun produit n'est spécifié.")
    else if( err instanceof ErrorResourceDontExist)
        detailProductComponent.setMessageError("Désole, ce produit n'existe pas.")
    else{
        detailProductComponent.setMessageError("Désolé, une erreur est survenue.")
        console.error(err)
    }
}


function userModifyCart(){


    if ( detailProductComponent.noColorSelected ){
        messageToUser.update('no-color-selected')
        alert(messageToUser.message)
    }
    else{
        const action = cartLocalStorage.add(
                                            produit,
                                            detailProductComponent.color,
                                            detailProductComponent.quantity
                                        )
        console.log('userModifyCart', action)
        messageToUser.update(action)
        tailleCartComponent.updateComponent()
    }
}