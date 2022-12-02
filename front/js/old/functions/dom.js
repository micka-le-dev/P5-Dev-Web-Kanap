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
export function replaceContentElementByMessage(element, message){
    while(element.firstChild)
        element.removeChild(element.firstChild)
    appendMessageToElement(message,element)
}

export function appendMessageToElement(message, element, options = {}){
    const p = document.createElement('p')
    p.innerText = message
    p.style.textAlign = "center"
    element.append(p)
}

/**
 * @param {HTMLInputElement} input
 * @param {boolean} deletable
 */
export function conrrigeInputNombre(input , deletable = false){
    const oldValue = input.getAttribute('data-old-value') ?? 1
    
    let val = input.value * 1

    if(
        input.value == ''
        || val < 0
        || !deletable && val == 0
    )
    {
        input.value = oldValue
        return
    }

    if( deletable )
    {
        if( val == 0 )
        {
            dispatchEventBtnDeteteItem(input)
            return
        }
        dispatchEventBtnAddItem(input)
    }

    let min = input.getAttribute('min') * 1 ?? 1
    let max = input.getAttribute('max') * 1 ?? 100
    val = val <= min ? min : val
    val = val >= max ? max : val

    input.value = val
    input.setAttribute('data-old-value', val)
}

/**
 * @param {HTMLElement} element
 */
function dispatchEventBtnDeteteItem(element){
    const eventDeleteItem = new CustomEvent('btnAddToDelete',{})
    element.dispatchEvent(eventDeleteItem)
}

/**
 * @param {HTMLElement} element
 */
 function dispatchEventBtnAddItem(element){
    const eventDeleteItem = new CustomEvent('btnDeleteToAdd',{})
    element.dispatchEvent(eventDeleteItem)
}