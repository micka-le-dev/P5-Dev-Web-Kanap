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