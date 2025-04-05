// 1- logic to toggle the menu
const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");
const menuBtnIcon = menuBtn.querySelector("i");

menuBtn.addEventListener("click", (e) => {
  navLinks.classList.toggle("open");

//changing icon when openinig the droplist
  const isOpen = navLinks.classList.contains("open");
  menuBtnIcon.setAttribute("class", isOpen ? "ri-close-line" : "ri-menu-line");
});


navLinks.addEventListener("click", (e) => {
//changing class to close
  navLinks.classList.remove("open");
  menuBtnIcon.setAttribute("class", "ri-menu-line");
});


// 2-Loading products from JSON file and displaying them 
const productGrid = document.getElementById("productGrid");
const searchInput = document.getElementById("searchInput");
const searchIcon = document.getElementById("search-icon");
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let products = [];

// Fetch products from JSON file
fetch("assets/products.json")
    .then((res) => res.json())
    .then((data) => {
        products = data;
        displayProducts(products);
    })
    .catch((error) => console.error("Error loading products:", error));

// Function to display products
function displayProducts(items) {
    productGrid.innerHTML = "";

    items.forEach((product) => {
        const card = document.createElement("div");
        card.className = "product-card";
        card.setAttribute("data-id", product.id);
        card.setAttribute("data-name", product.name);
        card.setAttribute("data-price", product.price);
        card.setAttribute("data-image", product.image);

        card.innerHTML = `
            <h4>${product.name}</h4>
            <p>$${product.price}</p>
            <img src="${product.image}" alt="${product.name}" />
            <button class="add-to-cart-btn">Add to Cart</button>
            <button class="details-btn" onclick="window.location.href='product-preview.html?id=${product.id}'">Details</button>
        `;

        // Add click event to "Add to Cart" button
        card.querySelector('.add-to-cart-btn').addEventListener('click', () => {
            const productData = {
                id: product.id,
                name: product.name,
                price: parseFloat(product.price),
                image: product.image,
                quantity: 1
            };

            //check if the product in the cart if it is add trhe quantity
            // if is not add it to cart
            const existingItem = cart.find(item => item.id === productData.id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push(productData);
            }
            //saving progress to local sstorage
            localStorage.setItem('cart', JSON.stringify(cart));
            window.location.href = 'cart.html';
        });

        productGrid.appendChild(card);
    });
}

// Filter products on search by char
searchInput.addEventListener("keyup", () => {
    const term = searchInput.value.toLowerCase();
    const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(term)
    );
    displayProducts(filtered);
});

// Focus the search input when the search icon is clicked puts the cursor in the search input
searchIcon.addEventListener("click", () => {
    searchInput.focus();
    document.getElementById("product").scrollIntoView({ behavior: "smooth" });
});


// Animation configuration
document.addEventListener('DOMContentLoaded', () => {
  const animationConfig = {
      '.header-image img': { duration: '1000ms', origin: 'right', delay: '0ms' },
      '.header-content div': { duration: '1000ms', delay: '500ms' },
      '.header-content h1': { duration: '1000ms', origin: 'left', delay: '100ms' },
      '.header-content p': { duration: '1000ms', origin: 'left', delay: '100ms' },
      '.deals-card': { duration: '1000ms', origin: 'bottom', delay: '1000ms' },
      '.about-image img': { duration: '1000ms', origin: 'right', delay: '100ms' },
      '.about-card': { duration: '1000ms', delay: '100ms', interval: '500ms' },
      '.product-card': { duration: '1000ms', interval: '100ms' },
      '.client-content': { duration: '1500ms', origin: 'top', interval: '100ms' }
  };

  // Set up Intersection Observer
  const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        //make sure that elment is displayed
          if (entry.isIntersecting) {
              const element = entry.target;
              const config = animationConfig[element.dataset.animate];
              
              // Apply duration
              element.style.transitionDuration = config.duration;
              // Make visible
              element.classList.add('is-visible');
              observer.unobserve(element);
          }
      });
  }, {
  });
  // Apply animation attributes to elements
  // from animation object gets it's behavior and add it for each elment   
  Object.keys(animationConfig)
  .forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(element => {
          element.dataset.animate = selector;
          if (animationConfig[selector].origin) {
              element.dataset.origin = animationConfig[selector].origin;
          }
          observer.observe(element);
      });
  });
});

// Start Slider
// Slider configuration
const slides = document.querySelector('.slides');
const slideElements = [...document.querySelectorAll('.slide')];
const pagination = document.querySelector('.pagination');
const totalSlides = slideElements.length;
let index = 1, autoplay;

// Add a copy of first slide to end
slides.append(slideElements[0].cloneNode(true));
// Add a copy of last slide to start
slides.prepend(slideElements[totalSlides - 1].cloneNode(true));

const allSlides = document.querySelectorAll('.slide');//save it
slides.style.transform = `translateX(-${index * 100}%)`;//

//creating div and make it dot style and activate the slide dot
slideElements.forEach((_, i) => {
  const dot = document.createElement('div');
  dot.classList.add('dot', i === 0 && 'active');
  dot.addEventListener('click', () => {
    goToSlide(i + 1);
    resetAutoplay();
  });
  pagination.append(dot);
});

const dots = document.querySelectorAll('.dot');

function updateSlide() {
  slides.style.transition = 'transform 0.5s ease-in-out';
  slides.style.transform = `translateX(-${index * 100}%)`;
  dots.forEach((dot, i) => dot.classList.toggle('active', i === ((index - 1 + totalSlides) % totalSlides)));
}

function goToSlide(i) {
  index = i;
  updateSlide();
}
// عندما يصل السلايدر إلى آخر شريحة وهمية → يرجع فورًا إلى أول شريحة حقيقية بدون تأثير مرئي.
slides.addEventListener('transitionend', () => {
  if (index === allSlides.length - 1) index = 1;
  if (index === 0) index = totalSlides;
  slides.style.transition = 'none';
  slides.style.transform = `translateX(-${index * 100}%)`;
});

function startAutoplay() {
  autoplay = setInterval(() => {
    index++;
    updateSlide();
  }, 2000);
}

function resetAutoplay() {
  clearInterval(autoplay);
  startAutoplay();
}

startAutoplay();
updateSlide();
// End Slider


// dark
// Theme toggle functionality
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('i');
const root = document.documentElement;//<html>

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