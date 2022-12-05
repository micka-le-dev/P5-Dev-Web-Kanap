/**
 * @returns {boolean}
 */
export function isString(VarToTesting){
    if(
        typeof VarToTesting === 'string'
        || VarToTesting instanceof String
    )
        return true

    return false
}

/**
 * @param {string} action
 * @returns {string}
 */
export function buildMessage(action){
    switch(action){
        case 'add': return "Ajouté au panier."
        case 'delete': return "Supprimer du panier."
        case 'update-quantity': return "Nouvelle quantité pour ce produit."
        default: return `Action réalisé : ${action}.`
    }
}