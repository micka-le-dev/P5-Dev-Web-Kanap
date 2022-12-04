export class InputQuantityManager{

    /** @type {HTMLElement} */
    #inputElement

    /** @type {boolean} */
    #deletable

    /**
     * @param {HTMLElement} inputQuantityElement
     * @param {boolean} deletable
     */
    constructor(inputQuantityElement, deletable = false){
        this.#inputElement = inputQuantityElement
        this.#deletable = deletable
    }

    quantityChange(){
        const input = this.#inputElement
        const oldValue = input.getAttribute('data-old-value') ?? 1

        let val = input.value * 1

        if( // erreur de manipulation de la part de l'utilisateur
            input.value == ''
            || val < 0
        )
        {
            input.value = oldValue
            return 'no-change'
        }

        if( this.#deletable && val === 0){
            return 'delete'
        }

        let min = input.getAttribute('min') * 1 ?? 1
        let max = input.getAttribute('max') * 1 ?? 100
        val = val <= min ? min : val
        val = val >= max ? max : val

        input.value = val
        input.setAttribute('data-old-value', val)
        return 'update'
    }
}