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
 * replace tous les contenu d'un élément par un message
 * @param {HTMLElement} element
 * @param {string} message
 */
export function setMessageInElement(element, message){
    const p = document.createElement('p')
    p.innerText = message
    p.style.textAlign = "center"
    while(element.firstChild)
        element.removeChild(element.firstChild)
    element.append(p)
}

/**
 * @param {HTMLInputElement} input 
 */
export function conrrigeInputNombre(input){
    let val = input.value * 1
    let min = input.getAttribute('min') * 1 ?? 1
    let max = input.getAttribute('max') * 1 ?? 100
    val = val <= min ? min : val
    val = val >= max ? max : val
    input.value = val
}