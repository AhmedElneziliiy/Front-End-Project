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

//scrol reval script animated scroliing
const scrollRevealOption = {
  distance: "50px",
  // from where
  origin: "left", 
  duration: 1000,
};
// Start Animation
ScrollReveal().reveal(".header-image img", {
  ...scrollRevealOption,
  origin: "right",
});
ScrollReveal().reveal(".header-content div", {
  duration: 1000,
  delay: 500,
});
ScrollReveal().reveal(".header-content h1", {
  ...scrollRevealOption,
  delay: 100,
});
ScrollReveal().reveal(".header-content p", {
  ...scrollRevealOption,
  delay: 100,
});
ScrollReveal().reveal(".deals-card", {
  ...scrollRevealOption,
  delay: 1000,
  origin: "bottom"
});
ScrollReveal().reveal(".about-image img", {
  ...scrollRevealOption,
  delay: 100,
  origin: "right"
});
ScrollReveal().reveal(".about-card", {
  duration:1000,
  interval:500,
  delay: 100
});
ScrollReveal().reveal(".product-card", {
  interval:100
});
ScrollReveal().reveal(".client-content", {
  duration:1500,
  interval:100,
  origin: "top"
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
