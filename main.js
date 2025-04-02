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
  delay: 100,
  origin: "bottom"
});
