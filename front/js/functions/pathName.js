
/**
 * @param {string} pathFileRacine le chemin avec le ficher de référence (qui sera enlevé du chemin final)
 * @param {string} pathNameRelatif le chemin de lacible par rapport à la référence pathFileRacine
 * @returns {string} la combinaison des 2 chemins
 */
export function combinePathName(pathFileRacine, pathNameRelatif){
    const dossiersRacine = pathFileRacine.split('/')
    dossiersRacine.pop() // supprime le nom du fichier de référence
    const dossiersCible = pathNameRelatif.split('/')

    if( dossiersCible[0] == '.' )
        dossiersCible.shift()

    while(dossiersCible && dossiersCible.length && dossiersCible[0] === ".."){
        dossiersRacine.pop()
        dossiersCible.shift()
    }

    return [...dossiersRacine, ...dossiersCible].join('/')
}

/**
 * @param {string} pathNameDest le chemin relatif à la page courante vers la page cible
 */
export function redirectToRelativePage(pathNameDest){
    const newPath = combinePathName(location.pathname, pathNameDest)
    console.log('newPath',newPath)
    window.location.pathname = newPath
}