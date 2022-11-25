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
    throw new Error('Une erreur est survenue en contactant le serveur', {cause: reponse})
}
