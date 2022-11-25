/**
 * 
 * @param {string} balise le nom d'une balise HTML
 * @param {object} attributs
 * @param {string} innerText
 * @return {HTMLElement}
 */
export function createElement(balise, attributs = {}, innerText = ''){
    const element = document.createElement(balise)
    for (const [attribut, valeur] of Object.entries(attributs)) {
        element.setAttribute(attribut, valeur)
    }
    element.innerText = innerText
    return element
}