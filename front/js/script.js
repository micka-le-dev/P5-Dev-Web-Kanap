import { fetchGetJson } from "./utils.js"

console.log("lancement de js/script.js","//dev") // dev

const urlApi = "http://localhost:3000/api/products"
try{
    const catalogue = await fetchGetJson(urlApi)
    catalogue.forEach(detailCanape => {
        console.log(detailCanape)
    });
}
catch(e){
    console.error(e.message)
    console.error(e.cause)
    console.error(e)
}
