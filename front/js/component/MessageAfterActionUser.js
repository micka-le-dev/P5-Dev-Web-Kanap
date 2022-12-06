import { createMessageElement } from "../functions/dom.js"

export class MessageAfterActionUser{

    /** @type {string} */
    #message

    /** @type {HTMLElement} */
    #messageElement

    /** @type {HTMLElement} */
    #contenerElement

    /** @type {string} */
    #position

    /**
     * 
     * @param {HTMLElement} contenerElement
     * @param {string} position pour utiliser Element.insertAdjacentElement()
     */
    constructor(contenerElement, position){
        this.#contenerElement = contenerElement
        this.#position = position
    }

    /**
     * @param {string} context
     */
    update(context){
        this.#updateMessage(context)

        console.log(`MessageAfterActionUser
context : ${context}
message : ${this.#message}`)

        if ( this.#message ){
            if( this.#messageElement )
                this.#messageElement.innerText = this.#message
            else{
                this.#messageElement = createMessageElement(this.#message)
                this.#contenerElement.insertAdjacentElement(this.#position, this.#messageElement)
            }
        }
        else{
            this.#messageElement?.remove()
            this.#messageElement = undefined

        }
    }

    /**
     * @return {string}
     */
    get message() { return this.#message }

    /**
     * @param {string} context
     */
    #updateMessage(context){
        switch(context){
            case 'add':
                this.#message = "Ajouté au panier."
                break

            case 'delete':
                this.#message = "Supprimé du panier."
                break

            case 'update-quantity' :
                this.#message = 'Nouvelle quantité pour ce produit.'
                break

            case 'no-change-quantity':
                this.#message = 'Ce produit est déjà dans le panier dans cette quantité.'
                break

            case 'not-available':
                this.#message = "Ce produit n'est pas dans le panier."
                break

            case 'no-color-selected':
                this.#message = "Vous devez seléctionner une couleur pour ajouter ce produit au panier."
                break

            case 'no-message':
                this.#message = undefined
                this.#messageElement?.remove()
                break

            default:
                this.#message = context
        }
    }
}