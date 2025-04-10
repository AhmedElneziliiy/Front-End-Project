document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function updateCart() {
        cartItemsContainer.innerHTML = '';
        let total = 0;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        } else {
            cart.forEach((item, index) => {
                const itemElement = document.createElement('div');
                itemElement.classList.add('cart-item');
                itemElement.innerHTML = `
                    <img src="${item.image}" alt="${item.name}" style="width: 80px; height: auto; margin-right: 20px;">
                    <h4>${item.name}</h4>
                    <div class="quantity-controls">
                        <button class="decrease">-</button>
                        <span>${item.quantity}</span>
                        <button class="increase">+</button>
                    </div>
                    <span class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</span>
                `;

                itemElement.querySelector('.increase').addEventListener('click', () => {
                    item.quantity++;
                    updateCart();
                });

                itemElement.querySelector('.decrease').addEventListener('click', () => {
                    item.quantity--;
                    if (item.quantity <= 0) {
                        cart.splice(index, 1);
                    }
                    updateCart();
                });

                cartItemsContainer.appendChild(itemElement);
                total += item.price * item.quantity;
            });
        }

        totalPriceElement.textContent = total.toFixed(2);
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    updateCart();
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    const root = document.documentElement;
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        root.setAttribute('data-theme', savedTheme);
        themeIcon.classList.toggle('ri-moon-line', savedTheme === 'dark');
        themeIcon.classList.toggle('ri-sun-line', savedTheme !== 'dark');
    }
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = root.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        root.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Toggle icon
        themeIcon.classList.toggle('ri-moon-line');
        themeIcon.classList.toggle('ri-sun-line');
    });
});
