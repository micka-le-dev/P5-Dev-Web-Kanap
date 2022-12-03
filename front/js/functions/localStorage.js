import { ErrorLocalStorage } from "../Error/ErrorLocalStorage.js"

/**
 * @param {string} keyLocalStorage
 * @param {Array} array
 */
 export function setArrayLocalStorage(keyLocalStorage, array){
    const strArray = JSON.stringify(array)
    localStorage.setItem(keyLocalStorage, strArray)
}

/**
 * @param {string} keyLocalStorage
 * @param {boolean} exception si une erreur survient, true => throw new Error, false => return []
 * @returns {Array}
 */
export function getArrayLocalStorage(keyLocalStorage, exception = true){
    const strLocalStorage = localStorage.getItem(keyLocalStorage)?.toString()
    if( ! strLocalStorage){
        if( exception )
            throw new ErrorLocalStorage(`LocalStorage erreur de convertion en array : "${keyLocalStorage}" contient "${strLocalStorage}"`)
        else
            return []
    }

    let array
    try{
        array = JSON.parse(strLocalStorage)
        if( array instanceof Array)
            return array
    }
    catch(ex){
        if( exception )
            throw ex
        else
            return []
    }

    if( exception )
        throw new ErrorLocalStorage(`LocalStorage "${keyLocalStorage}", une erreur est survenue`)

    return []
}