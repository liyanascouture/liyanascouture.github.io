// Carousel
const track = document.querySelector('.carousel-track');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
let index = 0;

prevBtn.addEventListener('click', () => {
    index = Math.max(index - 1, 0);
    track.style.transform = `translateX(-${index * 270}px)`;
});
nextBtn.addEventListener('click', () => {
    index = Math.min(index + 1, track.children.length - 3);
    track.style.transform = `translateX(-${index * 270}px)`;
});

// Cart
let cart = [];
const cartItemsDiv = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const cartTotal = document.getElementById('cart-total');

document.querySelectorAll('.add-to-cart').forEach(btn => {
    btn.addEventListener('click', () => {
        const name = btn.dataset.name;
        const price = parseInt(btn.dataset.price);
        cart.push({name, price});
        updateCart();
    });
});

function updateCart() {
    cartItemsDiv.innerHTML = '';
    let total = 0;
    cart.forEach((item, i) => {
        const div = document.createElement('div');
        div.textContent = `${item.name} - PKR ${item.price}`;
        cartItemsDiv.appendChild(div);
        total += item.price;
    });
    cartCount.textContent = cart.length;
    cartTotal.textContent = `Total: PKR ${total}`;
}

// Contact Form
document.getElementById('contact-form').addEventListener('submit', function(e){
    e.preventDefault();
    alert('Thank you! Your message has been sent.');
});
