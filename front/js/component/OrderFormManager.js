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
            throw new Error('constrictor of OrderFormManager, HTMLFormElement attendu')
        this.#form = form
        form.querySelector('#firstName').addEventListener('input', e => this.#verifyFirstName(e.target.value))
        form.querySelector('#lastName').addEventListener('input', e => this.#verifyLastName(e.target.value))
        form.querySelector('#address').addEventListener('input', e => this.#verifyAddress(e.target.value))
        form.querySelector('#city').addEventListener('input', e => this.#verifyCity(e.target.value))
        form.querySelector('#email').addEventListener('input', e => this.#verifyEmail(e.target.value))

        form.addEventListener('submit', event => this.submit())
    }

    submit(){
        
    }

    /**
     * @param {string} firstName
     */
    #verifyFirstName(firstName){
        console.log("verifyFirstName avec ",firstName)
        const errorElement = this.#form.querySelector('#firstNameErrorMsg')
        if( firstName == undefined || firstName === '')
            errorElement.innerText = "Veillez renseigner vôtre prénom, s'il vous plait."
        else if( this.regex.nom.test(firstName) )
            errorElement.innerText = ''
        else
            errorElement.innerText = "Ceci n'est pas un prénon valide."
    }

    /**
     * @param {string} lastName
     */
     #verifyLastName(lastName){
        console.log("verifyLastName avec ",lastName)
        const errorElement = this.#form.querySelector('#lastNameErrorMsg')
        if( lastName == undefined || lastName === '')
            errorElement.innerText = "Veillez renseigner vôtre nom, s'il vous plait."
        else if( this.regex.nom.test(lastName) )
            errorElement.innerText = ''
        else
            errorElement.innerText = "Ceci n'est pas un nom valide."
    }

    /**
     * @param {string} address
     */
     #verifyAddress(address){
        console.log("verifyAddress avec ",address)
        const errorElement = this.#form.querySelector('#addressErrorMsg')
        if( address == undefined || address === '')
            errorElement.innerText = "Veillez renseigner vôtre adresse, s'il vous plait."
        else if( this.regex.adresse.test(address) )
            errorElement.innerText = ''
        else
            errorElement.innerText = "Ceci n'est pas une adresse valide."
    }

    /**
     * @param {string} city
     */
     #verifyCity(city){
        console.log("verifyCity avec ",city)
        const errorElement = this.#form.querySelector('#cityErrorMsg')
        if( city == undefined || city === '')
            errorElement.innerText = "Veillez renseigner vôtre ville, s'il vous plait."
        else if( this.regex.nom.test(city) )
            errorElement.innerText = ''
        else
            errorElement.innerText = "Ceci n'est pas un nom de ville valide."
    }


    /**
     * @param {string} email
     */
     #verifyEmail(email){
        console.log("verifyCity avec ",email)
        const errorElement = this.#form.querySelector('#emailErrorMsg')
        if( email == undefined || email === '')
            errorElement.innerText = "Veillez renseigner vôtre adrersse email, s'il vous plait."
        else if( this.regex.email.test(email) )
            errorElement.innerText = ''
        else
            errorElement.innerText = "Ceci n'est pas une adresse email valide."
    }

}