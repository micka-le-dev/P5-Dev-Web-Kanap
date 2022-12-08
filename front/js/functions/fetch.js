import { ErrorResourceDontExist } from "../Error/ErrorResourceDontExist.js"

/**
 * @param {string} url endpoint + path
 */
export async function fetchGetJson ( url) {
    const headers = { accept: 'application/json' }
    const options = { headers }
    const reponse = await fetch(url, options)
    if (reponse.ok){
        return reponse.json()
    }
    throw new ErrorResourceDontExist("Le serveur répond qu'il ne connait pas la resource", {cause: reponse})
}

/**
 * @param {string} url endpoint + path
 * @param {Object} object qera convertit en JSON
 */
export async function fetchPostJson(url, object){
    const strJson = JSON.stringify(object)
    console.log("fetchPostJson", strJson)
    const headers = {
        "Content-type": 'application/json',
        "Accept": 'application/json'
    }
    const options = {
        method: 'POST',
        headers,
        body: strJson
    }
    const reponse = await fetch(url, options)
    if( reponse.ok )
        return reponse.json()

    console.error('fetchPostJson', reponse)
    throw new ErrorResourceDontExist("Le serveur répond qu'il ne connait pas la resource", {cause: reponse})
}

