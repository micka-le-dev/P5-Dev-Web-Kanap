/**
 * 
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
 * 
 * @param {string} selecteurElement sélecteur CSS de l'élément à replacer
 * @param {string} message
 */
export function replaceElementByMessage(selecteurElement, message){
    const element = document.querySelector(selecteurElement)
    const p = document.createElement("p").innerText = message
    element.replaceWith(p)
}

/**
 * replace tous les contenu d'un élément par un message
 * @param {string} selecteurElement selecteur CSS
 * @param {string} message
 */
export function setMessageInElement(selecteurElement, message){
    const element = document.querySelector(selecteurElement)
    const p = document.createElement('p').innerText = message
    while(element.firstChild)
        element.removeChild(element.firstChild)
    element.append(p)
}