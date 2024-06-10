"use strict";
// bonus 1 use sort(data.name)
window.onload = () => {
  let tableSearch = document.querySelector("#tableSearch");
  let categoryDropdown = document.querySelector("#categoryDropdown");
  let categoryDataTable = document.querySelector("#categoryDataTable");
  
  tableSearch.style.display = "none";
  categoryDropdown.style.display = "none";
  categoryDataTable.style.display = "none";

  let productSearchDDL = document.querySelector("#productSearchDDL");

  productSearchDDL.addEventListener("change", showAllData);
  productSearchDDL.addEventListener("change", showCategory);

  categoryDropdown.addEventListener("change", showSelectedCategoryData);
};
async function showAllData() {
  let productSearchDDL = document.querySelector("#productSearchDDL");
  let tableSearch = document.querySelector("#tableSearch");
  let categoryDataTable = document.querySelector("#categoryDataTable");
  if (productSearchDDL.value === "") {
    categoryDataTable.style.display = "none";
  }
  if (productSearchDDL.value === "viewAll") {
    console.log("yes");
    let tableSearchBody = document.querySelector("#tableSearchBody");
    let response = await fetch("http://localhost:8081/api/products");
    let allProducts = await response.json();
    if (allProducts) {
      tableSearch.style.display = "block";
      categoryDataTable.style.display = "none";
    }
    allProducts.sort((a, b) => a.productName.localeCompare(b.productName));
    for (let i = 0; i < allProducts.length; i++) {
      let newRow = tableSearchBody.insertRow();
      let cell1 = newRow.insertCell();
      cell1.innerHTML = allProducts[i].productId;
      let cell2 = newRow.insertCell();
      cell2.innerHTML = allProducts[i].productName;
      let cell3 = newRow.insertCell();
      cell3.innerHTML = `$${parseFloat(allProducts[i].unitPrice).toFixed(2)}`;
      let cell4 = newRow.insertCell();
      cell4.innerHTML = `<a href="../product_details.html?productId=${allProducts[i].productId}">Details</a>`;
    }
  } else {
    tableSearch.style.display = "none";
  }
}

async function showCategory() {
  let categoryDropdown = document.querySelector("#categoryDropdown");
  let productSearchDDL = document.querySelector("#productSearchDDL");
  let defualtOption = document.createElement("option");
  if (productSearchDDL.value === "category") {
    console.log("yes");
    categoryDropdown.style.display = "block";
  } else {
    categoryDropdown.style.display = "none";
  }
  // checks if there's any children if there is return from the function before the api is called and from running more than once
  if (categoryDropdown.children.length) {
    return;
  }
  let response = await fetch("http://localhost:8081/api/categories");
  let allProducts = await response.json();
  console.log(allProducts);
  console.log(categoryDropdown.children);
  defualtOption.textContent = "Select a category";
  defualtOption.value = "";
  categoryDropdown.appendChild(defualtOption);
  for (let j = 0; j < allProducts.length; j++) {
    let categoriesOption = document.createElement("option");
    categoriesOption.textContent = allProducts[j].name;
    categoriesOption.value = allProducts[j].categoryId;
    categoryDropdown.appendChild(categoriesOption);
  }
}
async function showSelectedCategoryData() {
  let categoryDropdown = document.querySelector("#categoryDropdown");
  let categoryDataTable = document.querySelector("#categoryDataTable");
  let categoryDataBody = document.querySelector("#categoryDataBody");
  if (!categoryDropdown || categoryDropdown.selectedIndex === 0) {
    categoryDataTable.style.display = "none";
  } else {
    categoryDataTable.style.display = "block";
    categoryDataBody.textContent = "";

    let res = await fetch(
      "http://localhost:8081/api/products/bycategory/" + categoryDropdown.value
    );
    let categoryData = await res.json();
    for (let h = 0; h < categoryData.length; h++) {
      let newRow = categoryDataBody.insertRow();
      let cell1 = newRow.insertCell();
      cell1.innerHTML = categoryData[h].productId;
      let cell2 = newRow.insertCell();
      cell2.innerHTML = categoryData[h].productName;
      let cell3 = newRow.insertCell();
      cell3.innerHTML = `$${Number(categoryData[h].unitPrice).toFixed(2)}`;
      let cell4 = newRow.insertCell();
      cell4.innerHTML = `<a href='product_details.html?productId=${categoryData[h].productId}'>Details</a>`;
    }
  }
}