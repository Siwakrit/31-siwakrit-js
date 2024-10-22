document.addEventListener("DOMContentLoaded", () => {
    const createProduct = document.getElementById("create-Product");
    const productNameReset = document.getElementById("productName");
    const productPriceReset = document.getElementById("productPrice");
    const productImageReset = document.getElementById("productImage");

    let statusBackground = false;
    let listProductArr = [];

    // Create product event
    createProduct.addEventListener("click", (event) => {
        event.preventDefault();

        const productName = productNameReset.value.trim();
        const productPrice = parseFloat(productPriceReset.value.trim());
        const productImage = productImageReset.value.trim();

        // Validate inputs
        if (!productName || !productPrice || isNaN(productPrice) || productPrice <= 0 ) {
            return alert("Still Fighting It");
            // || !validateImageUrl(productImage)
        }

        // Create new product object
        const listProduct = {
            pName: productName,
            pPrice: productPrice,
            pImage: productImage,
            id: Date.now(),
        };

        statusBackground = true;
        checkConditionBg();

        listProductArr.push(listProduct);
        renderProduct(listProductArr);

        // Reset input fields
        productNameReset.value = "";
        productPriceReset.value = "";
        productImageReset.value = "";
    });

    // Validate image URL format
    // function validateImageUrl(url) {
    //     return /\.(jpg|jpeg|png|gif)$/i.test(url);
    // }

    // Show or hide product list
    function checkConditionBg() {
        const productList = document.getElementById('productList');
        productList.style.display = statusBackground ? "block" : "none";
    }

    // Show or hide cart based on selection
    function checkConditionForm() {
        const cartList = document.getElementById('cartList');
        cartList.style.display = cartArr.length > 0 ? "block" : "none";
        document.body.style.background = cartArr.length > 0 ? "#ffffff" : "transparent";
    }

    // Render products in the product list
    function renderProduct(productToRender) {
        const productList = document.getElementById("productList");
        productList.innerHTML = ""; // Clear previous product list

        productToRender.forEach((prod) => {
            const productItem = document.createElement('div');
            productItem.innerHTML = `
                <div>
                    <input type="checkbox" class="product-checkbox" data-id="${prod.id}">
                    <img src="${prod.pImage}" alt="${prod.pName}">
                    <div class="textcard">
                        <h3>${prod.pName}</h3>
                        <p>$${prod.pPrice.toFixed(2)}</p>
                    </div>
                </div>
            `;
            productList.appendChild(productItem);
        });
    }

    let cartArr = [];

    // Add selected products to the cart
    document.getElementById('Add-to-Cart').addEventListener('click', function () {
        const checkboxes = document.querySelectorAll('.product-checkbox');
        cartArr = [];

        checkboxes.forEach((checkbox) => {
            if (checkbox.checked) {
                const productId = checkbox.getAttribute('data-id');
                const product = listProductArr.find(prod => prod.id == productId);
                if (product) {
                    cartArr.push(product);
                }
            }
        });

        updateCart();
        checkConditionForm();
    });

    // Update cart display
    function updateCart() {
        const cartList = document.getElementById('cartList');
        cartList.innerHTML = ''; // Clear previous cart items

        cartArr.forEach((citem, index) => {
            const cartItem = document.createElement('div');
            cartItem.innerHTML = `
                <div class="formcard">
                    <img src="${citem.pImage}" alt="${citem.pName}">
                    <div class="textcard">
                        <h3>${citem.pName}</h3>
                        <p>$${citem.pPrice.toFixed(2)}</p>
                        <button class="remove-Product" data-index="${index}" type="button">Remove</button>
                    </div>
                </div>
            `;
            cartList.appendChild(cartItem);
        });

        const removeButtons = document.querySelectorAll(".remove-Product");
        removeButtons.forEach(button => {
            button.addEventListener("click", function () {
                const indexToRemove = button.getAttribute("data-index");
                removeFromCart(indexToRemove);
            });
        });

        document.getElementById("calculatePriceBtn").style.display = cartArr.length > 0 ? "block" : "none";
    }

    // Remove product from the cart
    function removeFromCart(index) {
        cartArr.splice(index, 1);
        updateCart();
        updateFinalPrice();
        checkConditionForm();
    }

    // Calculate total price
    document.getElementById("calculatePriceBtn").addEventListener("click", function () {
        updateFinalPrice();
    });

    function updateFinalPrice() {
        let totalPrice = cartArr.reduce((sum, citem) => sum + citem.pPrice, 0);
        const finalPriceItem = document.getElementById("finalPrice");
        finalPriceItem.innerHTML = cartArr.length > 0 ? `<h1>You have to pay: $${totalPrice.toFixed(2)}</h1>` : "";
    }
});
