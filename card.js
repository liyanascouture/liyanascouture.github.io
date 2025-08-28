document.addEventListener('DOMContentLoaded', () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartContainer = document.getElementById('cart-items');

    // Product data for displaying in cart
    const products = [
        {id: 1, name: 'Embroidered Kurta', price: 1000},
        {id: 2, name: 'Luxury Silk Saree', price: 2000},
        {id: 3, name: 'Designer Lehenga Choli', price: 5000}
    ];

    let total = 0;
    cart.forEach(productId => {
        const product = products.find(p => p.id === parseInt(productId));
        total += product.price;

        const cartItem = `
            <div class="cart-item">
                <p>${product.name} - ₹${product.price}</p>
            </div>
        `;
        cartContainer.innerHTML += cartItem;
    });

    document.getElementById('total-price').textContent = `Total: ₹${total}`;
});
