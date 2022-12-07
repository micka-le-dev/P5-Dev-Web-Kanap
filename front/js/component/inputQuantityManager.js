export class InputQuantityManager{

    /** @type {HTMLElement} */
    #inputElement

    /** @type {boolean} */
    #deletable

    /** @type {requestCallback} */
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
     * @param {requestCallback} newActionChangeValue
     */
    actionChangeValue(newActionChangeValue) {
        this.#inputElement.removeEventListener('change', this.#oldCallBack )
        this.#oldCallBack = newActionChangeValue
        this.#inputElement.addEventListener('change', newActionChangeValue )
    }

    /**
     * @return {HTMLElement}
     */
    get element() { return this.#inputElement }

    /**
     * @return {Number | undefined}
     */
    get quantity() { return this.isVoid ? undefined : this.#inputElement.value * 1 }

    /** @return {boolean} */
    get isVoid() { return isNaN(this.#inputElement.value) }

    /**
     * @param {Number} newValue
     */
    set quantity(newValue) { this.setQuantity(newValue) }

    /** @param {boolean} putDisabled */
    set disabled(putDisabled) { this.#inputElement.disabled = putDisabled }

    /**
     * @return {string} évolution de la quantité : 'no-change', 'delete', 'decrease' et 'increase'
     */
     correctQuantity(){
        return this.setQuantity(undefined)
    }

    /**
     * si newQuantity est undefined, corrige la valeur de l'input
     * @param {Number | undefined} newQuantity
     * @return {string} évolution de la quantité : 'no-change', 'delete', 'decrease' et 'increase'
     */
     setQuantity(newQuantity){

        let oldValue
        let quantity
        let initValue = false

        if(newQuantity){
            if ( isNaN(newQuantity) )
                throw new Error("quantity n'est pas un nombre")

            if ( newQuantity < 0 )
                throw new Error("une quantité ne peut pas être négative")

            if ( newQuantity == 0 && ! this.#deletable)
                throw new Error("cette quantité ne peut pas être zéro")

            quantity = newQuantity
            initValue = true
        }
        else{
            oldValue = this.#inputElement.getAttribute('data-old-value')
            initValue = oldValue == undefined || oldValue === ''
            oldValue = initValue ? 1 : oldValue * 1
            quantity = this.quantity
            if(
                quantity != undefined
                && (
                    quantity < 0
                    || (quantity == 0 && !this.#deletable)
                    || quantity == oldValue
                )
            ){
                this.#inputElement.value = oldValue
                return 'no-change'
            }
        }

        // ici quantity est un nombre >= 0 ou > 0 si ! deletable

        if(
            this.#deletable
            && quantity == 0
        ){
            this.#forceSetQuantity(quantity)
            return 'delete'
        }

        const min = (this.#inputElement.getAttribute('min') ?? 1) * 1
        quantity = quantity < min ? min : quantity

        const max = (this.#inputElement.getAttribute('max') ?? 100) * 1
        quantity = quantity > max ? max : quantity

        this.#forceSetQuantity(quantity)

        if( quantity == oldValue )
            return 'no-change'

        if( initValue )
            return 'init-value'

        return quantity < oldValue ? 'decrease' : 'increase'
    }

    /**
     * @param {Number} quantity
     */
    #forceSetQuantity(quantity){
        if ( isNaN(quantity) )
            throw new Error("quantity n'est pas un nombre")

        this.#inputElement.value = quantity
        this.#inputElement.setAttribute('data-old-value', quantity)
    }
}