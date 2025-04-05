document.addEventListener("DOMContentLoaded", () => {
    // Get the product ID from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("id");
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Fetch products from JSON file
    fetch("assets/products.json")
        .then((res) => res.json())
        .then((products) => {
            // Find the product by ID
            const product = products.find((p) => p.id == productId);
            if (product) {
                // Populate the preview card
                document.getElementById("product-image").src = product.image;
                document.getElementById("product-image").alt = product.name;
                document.getElementById("product-name").textContent = product.name;
                document.getElementById("product-description").textContent = product.description || "No description available.";
                document.getElementById("product-price").textContent = `$${product.price}`;

                // Add click event to "Add to Cart" button
                const addToCartBtn = document.querySelector(".add-to-cart-btn");
                addToCartBtn.addEventListener("click", () => {
                    const productData = {
                        id: product.id,
                        name: product.name,
                        price: parseFloat(product.price),
                        image: product.image,
                        quantity: 1
                    };

                    const existingItem = cart.find(item => item.id === productData.id);
                    if (existingItem) {
                        existingItem.quantity += 1;
                    } else {
                        cart.push(productData);
                    }

                    localStorage.setItem('cart', JSON.stringify(cart));
                    window.location.href = 'cart.html';
                });
            } else {
                document.getElementById("product-card").innerHTML = "<p>Product not found.</p>";
            }
        })
        .catch((error) => {
            console.error("Error loading product:", error);
            document.getElementById("product-card").innerHTML = "<p>Error loading product details.</p>";
        });

        //dark mode
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
