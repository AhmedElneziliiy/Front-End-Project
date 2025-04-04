const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");
const menuBtnIcon = menuBtn.querySelector("i");
// open and close menu 
menuBtn.addEventListener("click", (e) => {
  navLinks.classList.toggle("open");
    //changing menu icon
  const isOpen = navLinks.classList.contains("open");
  menuBtnIcon.setAttribute("class", isOpen ? "ri-close-line" : "ri-menu-line");
});
// close menu when clicking ang of it's sections
navLinks.addEventListener("click", (e) => {
    navLinks.classList.remove("open");
    menuBtnIcon.setAttribute("class", "ri-menu-line");
});

//open search icon text box

const navSearch = document.getElementById("nav-search");
const searchInput = navSearch.querySelector("input");

navSearch.addEventListener("click", (e) => {
  navSearch.classList.toggle("open");
  //making the input ready for typing putting the cursor in it
  searchInput.focus(); 
});

// Prevents search bar from closing when clicking inside the input
searchInput.addEventListener("click", (e) => {
    // to avoid event bubbling تصاعد الأحداث.
  e.stopPropagation();
});

// Close search input when clicking outside
document.addEventListener("click", (e) => {
  if (!navSearch.contains(e.target)) {
    navSearch.classList.remove("open");
  }
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
          if (entry.isIntersecting) {
              const element = entry.target;
              const config = animationConfig[element.dataset.animate];
              
              // Apply duration
              element.style.transitionDuration = config.duration;
              
              // Apply delay
              element.style.transitionDelay = config.delay || '0ms';
              
              // Handle interval for multiple elements
              if (config.interval) {
                  const siblings = document.querySelectorAll(element.dataset.animate);
                  const index = Array.from(siblings).indexOf(element);
                  const totalDelay = parseInt(config.delay || 0) + (index * parseInt(config.interval));
                  element.style.transitionDelay = `${totalDelay}ms`;
              }

              // Make visible
              element.classList.add('is-visible');
              observer.unobserve(element);
          }
      });
  }, {
      threshold: 0.1 // Trigger when 10% of element is visible
  });

  // Apply animation attributes to elements
  Object.keys(animationConfig).forEach(selector => {
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
// 
// 
//
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

// Cart functionality

let cart = JSON.parse(localStorage.getItem('cart')) || [];

document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        const card = e.target.closest('.product-card');
        const product = {
            id: card.dataset.id,
            name: card.dataset.name,
            price: parseFloat(card.dataset.price),
            image: card.dataset.image,
            quantity: 1
        };
        
        const existingItem = cart.find(item => item.id === product.id);
        if (existingItem) {
            existingItem.quantity += 1; // Increment quantity if product exists
        } else {
            cart.push(product); // Add new product if it doesn't exist
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        window.location.href = 'cart.html';
    });
});