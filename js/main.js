var productName = document.getElementById('pName');
var productPrice = document.getElementById('pPrice');
var productCategory = document.getElementById('pCategory');

var currentIndex = -1; // -1 means no product is being updated. 
var allProducts = [];


if (localStorage.getItem('allProducts') != null) {
    allProducts = JSON.parse(localStorage.getItem('allProducts'));
    displayProducts();
}

function addProduct() {
    var nameInput = document.getElementById('pName');
    var priceInput = document.getElementById('pPrice');
    var categoryInput = document.getElementById('pCategory');

    if (nameInput.value.trim() == "" || priceInput.value.trim() == "" || categoryInput.value.trim() == "") {
        Swal.fire({
            title: 'Error!',
            text: 'All fields are required',
            icon: 'error',
            confirmButtonColor: '#6366f1'
        });
        return;
    }

    var product = {
        name: nameInput.value,
        price: priceInput.value,
        category: categoryInput.value
    };

    allProducts.push(product);
    localStorage.setItem('allProducts', JSON.stringify(allProducts));

    displayProducts();
    clearForm();

    Swal.fire({
        title: 'Success!',
        text: 'Product added successfully',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false
    });
}

function clearForm() {

    productName.value = "";
    productCategory.value = "";
    productPrice.value = "";
}


function displayProducts() {
    let cartona = "";
    for (let i = 0; i < allProducts.length; i++) {
        cartona += `
        <tr>
            <td data-label="#">${i + 1}</td>
            <td data-label="NAME">${allProducts[i].name}</td>
            <td data-label="PRICE">${allProducts[i].price}</td>
            <td data-label="CATEGORY">${allProducts[i].category}</td>
            <td data-label="UPDATE">
                <button onclick="prepareUpdate(${i})" class="btn btn-warning btn-sm">Update</button>
            </td>
            <td data-label="DELETE">
                <button onclick="deleteProduct(${i})" class="btn btn-danger btn-sm">Delete</button>
            </td>
        </tr>`;
    }
    document.getElementById('tbody').innerHTML = cartona;
}

function deleteProduct(index) {

    allProducts.splice(index, 1);
    displayProducts();
    localStorage.setItem('allProducts', JSON.stringify(allProducts));
}

function search(term) {
    var cartona = "";

    for (var i = 0; i < allProducts.length; i++) {
        if (allProducts[i].name.toLowerCase().includes(term.toLowerCase()) == true) {
            cartona += `
                <tr>
                    <td data-label="#">${i + 1}</td>
                    <td data-label="NAME">${allProducts[i].name}</td>
                    <td data-label="PRICE">${allProducts[i].price}</td>
                    <td data-label="CATEGORY">${allProducts[i].category}</td>
                    <td data-label="UPDATE">
                        <button onclick="prepareUpdate(${i})" class="btn btn-warning btn-sm">Update</button>
                    </td>
                    <td data-label="DELETE">
                        <button onclick="deleteProduct(${i})" class="btn btn-danger btn-sm">Delete</button>
                    </td>
                </tr>
            `;
        }
    }

    // Update table
    document.getElementById('tbody').innerHTML = cartona;
}

// Search function wrapper
function searchProduct(term) {
    if (term === '') {
        displayProducts();
    } else {
        search(term);
    }
}

// Prepare update (fills form with selected product)
function prepareUpdate(index) {
    currentIndex = index; // Store index of the product being updated
    productName.value = allProducts[index].name;
    productPrice.value = allProducts[index].price;
    productCategory.value = allProducts[index].category;

    document.getElementById('mainBtn').style.display = "none";

    // Create update button if it doesn't exist
    if (!document.getElementById('update-btn')) {
        var updateBtn = document.createElement('button');
        updateBtn.id = 'update-btn';
        updateBtn.className = 'btn btn-glow w-100';
        updateBtn.textContent = 'Update Product';
        updateBtn.onclick = updateProduct;
        document.getElementById('mainBtn').parentElement.appendChild(updateBtn);
    } else {
        document.getElementById('update-btn').style.display = "inline-block";
    }
}

// Update the selected product
function updateProduct() {
    if (currentIndex !== -1) {
        allProducts[currentIndex] = {
            name: productName.value,
            price: productPrice.value,
            category: productCategory.value,
        };

        localStorage.setItem("allProducts", JSON.stringify(allProducts));
        displayProducts();
        clearForm();
        resetButtons();
        currentIndex = -1; // Reset index
    }
}

// Reset buttons after update
function resetButtons() {
    document.getElementById('mainBtn').style.display = "inline-block";
    var updateBtn = document.getElementById('update-btn');
    if (updateBtn) { updateBtn.style.display = 'none'; }
}


