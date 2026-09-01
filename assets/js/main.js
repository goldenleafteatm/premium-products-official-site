let images = [];
let currentImage = 0;

function loadImages() {

    const pageName = window.location.pathname
        .split("/")
        .pop()
        .replace(".html", "");

    images = [
        `assets/images/products/${pageName}/main.jpg`,
        `assets/images/products/${pageName}/gallery1.jpg`,
        `assets/images/products/${pageName}/gallery2.jpg`,
        `assets/images/products/${pageName}/gallery3.jpg`
    ];

    const mainImage = document.getElementById("mainImage");

    if (mainImage) {
        mainImage.src = images[0];
    }

    currentImage = 0;
}

function nextImage() {

    currentImage++;

    if (currentImage >= images.length) {
        currentImage = 0;
    }

    document.getElementById("mainImage").src = images[currentImage];
}

function previousImage() {

    currentImage--;

    if (currentImage < 0) {
        currentImage = images.length - 1;
    }

    document.getElementById("mainImage").src = images[currentImage];
}

document.addEventListener("DOMContentLoaded", () => {

    loadImages();

    const params = new URLSearchParams(window.location.search);

    const product = params.get("product");

    const productSelect =
        document.querySelector('select[name="Product"]');

    if (product && productSelect) {
        productSelect.value = product;
    }

});

document.addEventListener("DOMContentLoaded", () => {

    const params = new URLSearchParams(window.location.search);

    const product = params.get("product");

    const productSelect =
        document.querySelector('select[name="Product"]');

    if(product && productSelect){

        productSelect.value = product;

    }

});


function redirectAfterSubmit() {
    setTimeout(() => {
        window.location.href = "thank-you.html";
    }, 500);
    return true;
}


/* =========================================
   GOLDEN LEAF SHOPPING CART
   ========================================= */

let cart = JSON.parse(localStorage.getItem("goldenLeafCart")) || [];

function saveCart() {
    localStorage.setItem("goldenLeafCart", JSON.stringify(cart));
}

function addToCart(productName, price, image) {

    const existingProduct = cart.find(
        item => item.name === productName
    );

    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({
            name: productName,
            price: Number(price),
            image: image,
            quantity: 1
        });
    }

    saveCart();

    alert(productName + " has been added to your cart.");
}

/* =========================================
   DISPLAY SHOPPING CART
   ========================================= */

function displayCart() {

    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

    if (!cartItems || !cartTotal) {
        return;
    }

    cartItems.innerHTML = "";

    let total = 0;

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <div class="empty-cart">
                <i class="fa-solid fa-cart-shopping"></i>
                <h2>Your Cart Is Empty</h2>
                <p>Add some of our carefully crafted teas to get started.</p>

                <a href="products.html" class="btn">
                    Explore Our Teas
                </a>
            </div>
        `;

        cartTotal.textContent = "₹0";
        updateCartCount();

        return;
    }

    cart.forEach((item, index) => {

        const itemTotal = item.price * item.quantity;

        total += itemTotal;

        cartItems.innerHTML += `

            <div class="cart-item">

                <img
                    src="${item.image}"
                    alt="${item.name}"
                >

                <div class="cart-item-info">

                    <h3>${item.name}</h3>

                    <p>
                        Price: ₹${item.price}
                    </p>

                    <div class="cart-quantity">

                        <button
                            onclick="changeQuantity(${index}, -1)">
                            −
                        </button>

                        <span>
                            ${item.quantity}
                        </span>

                        <button
                            onclick="changeQuantity(${index}, 1)">
                            +
                        </button>

                    </div>

                </div>

                <strong>
                    ₹${itemTotal}
                </strong>

                <button
                    class="remove-cart-item"
                    onclick="removeFromCart(${index})">

                    <i class="fa-solid fa-trash"></i>

                </button>

            </div>
        `;
    });

    cartTotal.textContent = "₹" + total;

    updateCartCount();
}


/* =========================================
   CHANGE QUANTITY
   ========================================= */

function changeQuantity(index, amount) {

    cart[index].quantity += amount;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    saveCart();

    displayCart();
}


/* =========================================
   REMOVE PRODUCT
   ========================================= */

function removeFromCart(index) {

    cart.splice(index, 1);

    saveCart();

    displayCart();
}


/* =========================================
   CART COUNT
   ========================================= */

function updateCartCount() {

    const cartCount = document.getElementById("cart-count");

    if (!cartCount) {
        return;
    }

    const count = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    cartCount.textContent = count;
}


/* =========================================
   LOAD CART
   ========================================= */

document.addEventListener("DOMContentLoaded", function () {

    displayCart();

    updateCartCount();

});

