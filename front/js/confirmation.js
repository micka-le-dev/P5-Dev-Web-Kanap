const orderId = sessionStorage.getItem('orderId')
if ( orderId ){
    console.log('orderId', orderId)

    document.querySelector('#orderId').innerText = orderId
}
else{
        document.querySelector('.confirmation').innerText = `Désolé, nous n'avons aucun numéro de commande à vous fournir.`
}