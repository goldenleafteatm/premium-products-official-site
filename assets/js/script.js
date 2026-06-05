const images = [

"assets/images/products/origin-black/main.jpg",

"assets/images/products/origin-black/gallery1.jpg",

"assets/images/products/origin-black/gallery2.jpg",

"assets/images/products/origin-black/gallery3.jpg"

];

let currentImage = 0;

function changeImage(image){

document.getElementById("mainImage").src =
image.src;

}

function nextImage(){

currentImage++;

if(currentImage >= images.length){

currentImage = 0;

}

document.getElementById("mainImage").src =
images[currentImage];

}

function previousImage(){

currentImage--;

if(currentImage < 0){

currentImage = images.length - 1;

}

document.getElementById("mainImage").src =
images[currentImage];

}
