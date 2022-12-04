export class InputQuantityManager{

    /** @type {HTMLElement} */
    #inputElement

    /** @type {boolean} */
    #deletable

    /** @type {Function} */
    #oldCallBack



    /**
     * @param {HTMLElement} inputQuantityElement
     * @param {boolean} deletable
     */
    constructor(inputQuantityElement, deletable = false){
        this.#inputElement = inputQuantityElement
        this.#deletable = deletable
    }

    /**
     * @param {Function} newActionChangeValue
     */
    actionChangeValue(newActionChangeValue) {
        this.#inputElement.removeEventListener('click', this.#oldCallBack )
        this.#oldCallBack = newActionChangeValue
        this.#inputElement.addEventListener('click', newActionChangeValue )
    }

    /**
     * corrige les erreurs de saisi et indique comment évolue la quantité
     * @returns {string} 'no-change', 'delete', 'decrease' ou 'increase'
     */
    correctQuantity(){
        const oldValue = this.#inputElement.getAttribute('data-old-value') ?? 1

        let val = this.quantity

        if( // erreur de manipulation de la part de l'utilisateur
            this.quantity == ''
            || val < 0
            || val == oldValue
        )
        {
            this.quantity = oldValue
            return 'no-change'
        }

        if( this.#deletable && val === 0){
            return 'delete'
        }

        this.quantity = val
        return val < oldValue ? 'decrease' : 'increase'
    }


    /**
     * @type {Number}
     */
    get quantity() { return this.getQuantity() }

    /**
     * @type {Number}
     */
    set quantity(newValue) { this.setQuantity(newValue) }


    /**
     * @returns {Number}
     */
    getQuantity() {
        return this.#inputElement.value * 1
    }

    /**
     * @param {Number} quantity
     */
     setQuantity(quantity){

        if ( isNaN(quantity) )
            throw new Error("quantity n'est pas un nombre")

        if ( quantity < 0 )
            throw new Error("une quantité ne peut pas être négative")

        if (
            quantity > 0
            || ! this.#deletable
        ){
            const min = this.#inputElement.getAttribute('min') * 1 ?? 1
            quantity = quantity < min ? min : quantity
        }

        const max = input.getAttribute('max') * 1 ?? 100
        quantity = quantity > max ? max : quantity

        this.#inputElement.value = quantity
        input.setAttribute('data-old-value', quantity)
    }
}