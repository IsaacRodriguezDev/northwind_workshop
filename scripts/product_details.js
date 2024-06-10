"use strict"
window.onload = ()=>{
    let productDetailTableBody = document.querySelector('#productDetailTableBody')
    productDetailData(productDetailTableBody)
}
async function productDetailData(productDetailTableBody){
    let urlParam = new URLSearchParams(location.search)
    console.log('not worked')
    if(urlParam.has('productId')===true ){
        console.log('worked')
        productDetail(urlParam.get('productId'),productDetailTableBody)
    }else{
        alert('invalid course id')
        window.location.href = "./product_search.html"
    }
}
async function productDetail(productId,productDetailTableBody){
    try{
        let response = await fetch('http://localhost:8081/api/products/'+productId)
        let productData = await response.json()
        let newRow = productDetailTableBody.insertRow()
        let cell1 = newRow.insertCell()
        cell1.innerHTML = `There are ${productData.unitsInStock} units`
        let cell2 = newRow.insertCell()
        cell2.innerHTML = `${productData.supplier}`
        let cell3 = newRow.insertCell()
        cell3.innerHTML = `${productData.discontinued}`
    }catch(err){
        console.log(err)
    }
    
}