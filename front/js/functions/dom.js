/**
 * @param {string} balise le nom d'une balise HTML
 * @param {object} attributs
 * @param {string} innerText
 * @return {HTMLElement}
 */
 export function createElement(balise, attributs = {}, innerText = null){
    const element = document.createElement(balise)
    for (const [attribut, valeur] of Object.entries(attributs)) {
        element.setAttribute(attribut, valeur)
    }
    if(innerText)
        element.innerText = innerText
    return element
}

/**
 * replace tous les contenu d'un élément par un message dans un <p>
 * @param {HTMLElement} element
 * @param {string} message
 * @returns {HTMLElement} le paragraphe créé
 */
export function replaceContentElementByMessage(element, message){
    while(element.firstChild)
        element.removeChild(element.firstChild)
    return appendMessageToElement(message,element)
}
/**
 * @param {string} message
 * @param {HTMLElement} element
 * @returns {HTMLElement} le paragraphe créé
 */
export function appendMessageToElement(message, element){
    const messageElement = createMessageElement(message)
    element.append(messageElement)
    return messageElement
}

/**
 * @param {string} message
 * @param {HTMLElement} element
 * @returns {HTMLElement} le paragraphe créé
 */
export function messageAfterElement(message, element){
    const messageElement = createMessageElement(message)
    element.insertAdjacentElement('afterend',messageElement)
    return messageElement
}

/**
 * @param {string} message
 * @returns {HTMLElement} le paragraphe créé
 */
function createMessageElement(message){
    const p = document.createElement('p')
    p.innerText = message
    p.style.textAlign = "center"
    return p
}