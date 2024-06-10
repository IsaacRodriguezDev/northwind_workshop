"use strict"
window.onload = ()=>{
    let tableSearch = document.querySelector('#tableSearch')
    tableSearch.style.display = 'none'
    let productSearchDDL = document.querySelector('#productSearchDDL')
    productSearchDDL.addEventListener('change',showAllData)
    
}
async function showAllData(){
let productSearchDDL = document.querySelector('#productSearchDDL')
let tableSearch = document.querySelector('#tableSearch')

if(productSearchDDL.value === 'viewAll'){
    console.log('yes')
    let tableSearchBody = document.querySelector('#tableSearchBody')
    let response = await fetch('http://localhost:8081/api/products')
    let allProducts = await response.json()
    console.log(allProducts)
    if(allProducts){
    tableSearch.style.display = 'block'
    }
    for(let i = 0; i< allProducts.length;i++){
        let newRow = tableSearchBody.insertRow()
        let cell1 = newRow.insertCell()
        cell1.innerHTML = allProducts[i].productId
        let cell2 = newRow.insertCell()
        cell2.innerHTML = allProducts[i].productName
        let cell3 = newRow.insertCell()
        cell3.innerHTML = `$${parseFloat(allProducts[i].unitPrice ).toFixed(2)}`
        let cell4 = newRow.insertCell()
        cell4.innerHTML = `<a href="../product_details.html?productId=${allProducts[i].productId}">Details</a>`
        
    }

}else{
        tableSearch.style.display = 'none'
}
}
async function showCategory(){
    let productSearchDDL = document.querySelector('#productSearchDDL')
    if(productSearchDDL.value === 'viewAll'){
        console.log('yes')
        let response = await fetch('http://localhost:8081/api/products')
        let allProducts = await response.json()
    
    }
    }