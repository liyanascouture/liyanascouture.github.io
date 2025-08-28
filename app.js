 // app.js - Load Products Dynamically
document.addEventListener('DOMContentLoaded', () => {
    const productList = document.getElementById('product-list');

    const products = [
        {id: 1, name: 'Embroidered Kurta', description: 'Beautifully embroidered, perfect for any occasion.', price: '1000', image: 'assets/images/product1.jpg'},
        {id: 2, name: 'Luxury Silk Saree', description: 'A blend of tradition and luxury in one piece.', price: '2000', image: 'assets/images/product2.jpg'},
        {id: 3, name: 'Designer Lehenga Choli', description: 'Exclusive design for weddings and festivals.', price: '5000', image: 'assets/images/product3.jpg'}
    ];

    products.forEach(product => {
        const productCard = `
            <div class="col-md-4">
                <div class="card">
                    <img src="${product.image}" class="card-img-top" alt="${product.name}">
                    <div class="card-body">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text">${product.description}</p>
                        <p class="card-text"><strong>₹${product.price}</strong></p>
                        <button class="btn btn-primary add-to-cart" data-id="${product.id}">Add to Cart</button>
                    </div>
                </div>
            </div>
        `;
        productList.innerHTML += productCard;
    });

    // Add to Cart Functionality
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = e.target.getAttribute('data-id');
            addToCart(productId);
        });
    });
});

// Add to Cart - Save to LocalStorage
function addToCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (!cart.includes(productId)) {
        cart.push(productId);
        localStorage.setItem('cart', JSON.stringify(cart));
    }
}



