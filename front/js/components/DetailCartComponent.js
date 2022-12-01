import { Cart } from "../class/Cart.js";
import { CartAllData } from "../class/CartAllData.js";
import { setMessageInElement } from "../functions/dom.js";
import { DetailItemCartComponent } from "./DetailItemCartComponent.js";

export class DetailCartComponent{
    /** @type {CartAllData} */
    #cartAllData

    /** @type {HTMLElement} */
    #cartAndOrderElement

    /** @type {HTMLElement} */
    #templateItem

    /**
     * @param {HTMLElement} cartItemsElement
     * @param {HTMLElement} templateItem
     */
    constructor(cartItemsElement, templateItem){
        this.#cartAndOrderElement = cartItemsElement
        this.#templateItem = templateItem
    }

    /**
     * @param {Cart} cart 
     */
    async update(cart){
        if( ! this.#cartAllData )
            this.#cartAllData = new CartAllData(cart)
        else
            this.#cartAllData.setCart(cart)

        try{
            await this.#cartAllData.getDetail(true)
    
            const itemsCartElement = this.#cartAndOrderElement.querySelector('#cart__items')
    
            while( itemsCartElement.firstChild )
                itemsCartElement.firstChild.remove()
    
            this.#cartAndOrderElement.querySelector('#totalQuantity').innerText = this.#cartAllData.totalQuantity
            this.#cartAndOrderElement.querySelector('#totalPrice').innerText = this.#cartAllData.totalPrice
    
            if( cart.isVoid )
            {
                this.#cartAndOrderElement.querySelector('.cart__order').remove()
                return
            }
            this.#cartAllData.forEach(item => {
                new DetailItemCartComponent(this.#templateItem, item)
                .appendTo(itemsCartElement)
            });
        }
        catch(err){
            console.error(err)
            setMessageInElement(this.#cartAndOrderElement,"Délolé, impossible de charger les details du panier.")
        }
    }
}