import { ErrorResourceDontExist } from "../../Error/ErrorResourceDontExist.js"

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
