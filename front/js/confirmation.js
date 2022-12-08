const orderId = sessionStorage.getItem('orderId')
if ( orderId ){
    console.log('orderId', orderId)

    document.querySelector('#orderId').innerText = orderId
}