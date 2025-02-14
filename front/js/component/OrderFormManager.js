export class OrderFormManager{

    /** @type {HTMLFormElement} */
    #form

    /** @type {FormData} */
    #formData

    #regex = {
        nom: /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u,
        adresse: /^[A-Za-z0-9àáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]{5,100}$/,
        emailFaible: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/,
        email: /(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/
    }
    /** @return {Object{}} */
    get regex() { return this.#regex }

    /**
     * @param {HTMLFormElement} form
     */
    constructor(form){
        if( ! form instanceof HTMLFormElement)
            throw new Error('constructor of OrderFormManager, HTMLFormElement attendu')

        this.#form = form
        form.querySelector('#firstName').addEventListener('input', e => this.#verifyFirstName(e.target.value))
        form.querySelector('#lastName').addEventListener('input', e => this.#verifyLastName(e.target.value))
        form.querySelector('#address').addEventListener('input', e => this.#verifyAddress(e.target.value))
        form.querySelector('#city').addEventListener('input', e => this.#verifyCity(e.target.value))
        form.querySelector('#email').addEventListener('input', e => this.#verifyEmail(e.target.value))

        // form.addEventListener('submit', event => this.submit(event))
    }

    /** @return {string | null} */
    get pathAction() {  return this.#form.getAttribute('action')  }

    /**
     * @typedef {Object} Contact
     * @property {string} firstName
     * @property {string} lastName
     * @property {string} address
     * @property {string} city
     * @property {string} email
     */
    /**
     * @param {Event | undefined} event si event est defini et le formulaire est invalide, preventDefault et alert
     * @returns {Contact | undefined} undefined si le formulaire n'est pas valide
     */
    submit(event){
        return this.getContact(event)
    }

    /**
     * @param {Event | undefined} event si event est defini et le formulaire est invalide, preventDefault et alert
     * @returns {Contact | undefined} undefined si le formulaire n'est pas valide
     */
    getContact(event){
        this.#formData = new FormData(this.#form)

        if ( ! this.orderFormIsOk() ){
            if(event){
                event.preventDefault()
            }
            console.log('getContact(), Commande not Ok ! ')
            alert(`Les reseignements fournis sont incorrect.
Veuillez fournir ces information s'il vous plait.`)
            return
        }

        const contact = {
            firstName: this.#formData.get('firstName'),
            lastName: this.#formData.get('lastName'),
            address: this.#formData.get('address'),
            city: this.#formData.get('city'),
            email: this.#formData.get('email')
        }
        console.log('getContact(), Commande Ok ! ', contact)
        return contact
    }

    reset(){
        this.#form.reset()
    }

    /**
     * @returns {boolean}
     */
    orderFormIsOk(){
        this.#formData = new FormData(this.#form)

        const firstNameIsOk = this.#firstNameIsOk( this.#formData.get('firstName') )
        const lastNameIsOk = this.#lastNameIsOk( this.#formData.get('lastName') )
        const addressIsOk = this.#addressIsOk( this.#formData.get('address') )
        const cityIsOk = this.#cityIsOk( this.#formData.get('city') )
        const emailIsOk = this.#emailIsOk( this.#formData.get('email') )

        if ( firstNameIsOk && lastNameIsOk && addressIsOk && cityIsOk && emailIsOk )
            return true
        return false
    }


    /**
     * @param {string} firstName
     * @returns {boolean | undefined} retourne undefined si firstName est null, undefined ou vide
     */
    #firstNameIsOk(firstName){
        if( firstName == undefined || firstName == null || firstName === '')
            return undefined
        else if( this.regex.nom.test(firstName) )
            return true
        else
            return false
    }
    /**
     * @param {string} firstName
     */
    #verifyFirstName(firstName){
        const errorElement = this.#form.querySelector('#firstNameErrorMsg')

        switch(this.#firstNameIsOk(firstName)){
            case true:
                errorElement.innerText = ''
                break
            case false:
                errorElement.innerText = "Ceci n'est pas un prénon valide."
                break
            case undefined:
            default:
                errorElement.innerText = "Veillez renseigner vôtre prénom, s'il vous plait."
                break
        }
    }

    /**
     * @param {string} lastName
     * @returns {boolean | undefined} retourne undefined si lastName est null, undefined ou vide
     */
    #lastNameIsOk(lastName){
        if( lastName == undefined || lastName == null || lastName === '')
            return undefined
        else if( this.regex.nom.test(lastName) )
            return true
        else
            return false
    }
    /**
     * @param {string} lastName
     */
    #verifyLastName(lastName){
        const errorElement = this.#form.querySelector('#lastNameErrorMsg')

        switch(this.#lastNameIsOk(lastName)){
            case true:
                errorElement.innerText = ''
                break
            case false:
                errorElement.innerText = "Ceci n'est pas un nom valide."
                break
            case undefined:
            default:
                errorElement.innerText = "Veillez renseigner vôtre nom, s'il vous plait."
                break
        }
    }

    /**
     * @param {string} address
     * @returns {boolean | undefined} retourne undefined si address est null, undefined ou vide
     */
     #addressIsOk(address){
        if( address == undefined || address == null || address === '')
            return undefined
        else if( this.regex.adresse.test(address) )
            return true
        else
            return false
    }
    /**
     * @param {string} address
     */
    #verifyAddress(address){
        const errorElement = this.#form.querySelector('#addressErrorMsg')

        switch(this.#addressIsOk(address)){
            case true:
                errorElement.innerText = ''
                break
            case false:
                errorElement.innerText = "Ceci n'est pas un adresse valide."
                break
            case undefined:
            default:
                errorElement.innerText = "Veillez renseigner vôtre adresse, s'il vous plait."
                break
        }
    }

    /**
     * @param {string} city
     * @returns {boolean | undefined} retourne undefined si city est null, undefined ou vide
     */
     #cityIsOk(city){
        if( city == undefined || city == null || city === '')
            return undefined
        else if( this.regex.nom.test(city) )
            return true
        else
            return false
    }
    /**
     * @param {string} city
     */
    #verifyCity(city){
        const errorElement = this.#form.querySelector('#cityErrorMsg')

        switch(this.#cityIsOk(city)){
            case true:
                errorElement.innerText = ''
                break
            case false:
                errorElement.innerText = "Ceci n'est pas un ville valide."
                break
            case undefined:
            default:
                errorElement.innerText = "Veillez renseigner vôtre ville, s'il vous plait."
                break
        }
    }


    /**
     * @param {string} email
     * @returns {boolean | undefined} retourne undefined si email est null, undefined ou vide
     */
     #emailIsOk(email){
        if( email == undefined || email == null || email === '')
            return undefined
        else if( this.regex.email.test(email) )
            return true
        else
            return false
    }
    /**
     * @param {string} email
     */
    #verifyEmail(email){
        const errorElement = this.#form.querySelector('#emailErrorMsg')

        switch(this.#emailIsOk(email)){
            case true:
                errorElement.innerText = ''
                break
            case false:
                errorElement.innerText = "Ceci n'est pas un adrersse email valide."
                break
            case undefined:
            default:
                errorElement.innerText = "Veillez renseigner vôtre adrersse email, s'il vous plait."
                break
        }
    }


}