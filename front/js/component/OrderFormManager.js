export class OrderFormManager{

    /** @type {HTMLFormElement} */
    #form

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

        form.addEventListener('submit', event => this.submit(event))
    }

    submit(){

    }

    /**
     * @param {string} firstName
     * @returns {boolean | undefined} retourne undefined si firstName est null, undefined ou vide
     */
    #firstNameIsOk(firstName){
        console.log("firstNameIsOk avec ",firstName)
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
        console.log("verifyFirstName avec ",firstName)
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
        console.log("lastNameIsOk avec ",lastName)
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
        console.log("verifyLastName avec ",lastName)
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
        console.log("addressIsOk avec ",address)
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
        console.log("verifyAddress avec ",address)
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
        console.log("cityIsOk avec ",city)
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
        console.log("verifyCity avec ",city)
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
        console.log("emailIsOk avec ",email)
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
        console.log("emailIsOk avec ",email)
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