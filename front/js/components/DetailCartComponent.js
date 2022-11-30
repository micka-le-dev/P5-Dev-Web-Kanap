import { Cart } from "../functions/cart.js";
import { CartAllData } from "../functions/CartAllData.js";
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
     * 
     * @param {Cart} cart 
     */
    async update(cart){
        if( ! this.#cartAllData )
            this.#cartAllData = new CartAllData(cart)
        else
            this.#cartAllData.setCart(cart)

        await this.#cartAllData.getDetail()

        const itemsCartElement = this.#cartAndOrderElement.querySelector('#cart__items')

        while( itemsCartElement.firstChild )
            itemsCartElement.firstChild.remove()

        this.#cartAllData.forEach(item => {
            new DetailItemCartComponent(this.#templateItem, item)
            .appendTo(itemsCartElement)
        });
        this.#cartAndOrderElement.querySelector('#totalQuantity').innerText = this.#cartAllData.totalQuantity
        this.#cartAndOrderElement.querySelector('#totalPrice').innerText = this.#cartAllData.totalPrice
    }
}