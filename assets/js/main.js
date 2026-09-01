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
