const menuBtn = document.getElementById('menuBtn');
const sidebar = document.getElementById('sidebar');
const closeBtn = document.getElementById('closeBtn');

// Products data
const products = [
   { name: "The Notch - Dark Blue", image: "/images/product/asset 4.png" },
   { name: "The Notch - Burgundy with Plaids", image: "/images/product/asset 5.png" },
   { name: "The Notch - Light Grey", image: "/images/product/asset 6.png" },
   { name: "The Double Breasted Trench - Beige", image: "/images/product/asset 7.png" },
   { name: "The Notch Coat - Grey Cachemire", image: "/images/product/asset 8.png" },
   { name: "The Classic Trench - Dark Blue", image: "/images/product/asset 9.png" },
   { name: "The Winter Vest - Dark blue", image: "/images/product/asset 10.png" },
   { name: "The Cardigan with Buttons - Pale Light Blue", image: "/images/product/asset 11.png" },
   { name: "The Zipper Sweater - Red with White Zipper", image: "/images/product/asset 12.png" },
   { name: "The Round Neck Casual Sweater - Light Blue", image: "/images/product/asset 13.png" },
   { name: "The Round Neck Sweater - Pale Yellow", image: "/images/product/asset 14.png" },
   { name: "The V Neck Sweater - Wine", image: "/images/product/asset 15.png" },
   { name: "The Band Roll - Black", image: "/images/product/asset 16.png" },
   { name: "The Tux - White", image: "/images/product/asset 17.png" },
   { name: "The Mao - Beige", image: "/images/product/asset 18.png" },
   { name: "The Cotton T-Shirts - Dark Blue", image: "/images/product/asset 19.png" },
   { name: "The 200s Polo - Light Blue", image: "/images/product/asset 20.png" },
   { name: "The TeeS O Neck - Black", image: "/images/product/asset 21.png" },
   { name: "The Jeans - Washed Middle Blue", image: "/images/product/asset 22.png" },
   { name: "The Jeans - Washed Light Blue", image: "/images/product/asset 23.png" },
   { name: "The Jeans - Full White", image: "/images/product/asset 24.png" },
   { name: "The Sneaker with Straps - Brown", image: "/images/product/asset 25.png" },
   { name: "The Sneaker with Straps - Black", image: "/images/product/asset 26.png" },
   { name: "The Sneaker with Laces - Dark Blue", image: "/images/product/asset 27.png" },
   { name: "The Boots Pointed - Black Patina", image: "/images/product/asset 28.png" },
   { name: "The Tassel Loafer - Brown braid / black piping", image: "/images/product/asset 29.png" },
   { name: "The One Cut Pointed - Brown Patina", image: "/images/product/asset 30.png" },
   { name: "The Francesco Guccini Pocket Square", image: "/images/product/asset 31.png" },
   { name: "The Suspender - Red and Dark Brown Leather", image: "/images/product/asset 32.png" },
   { name: "The Belt with the Logo - Red", image: "/images/product/asset 33.png" },
   { name: "The Bicolor Scarf - Dark Blue", image: "/images/product/asset 34.png" },
   { name: "The Colorful Socks - Blue", image: "/images/product/asset 35.png" },
   { name: "The Milan - Sunset", image: "/images/product/asset 36.png" }
];

// Function to render products grid
function renderProductsGrid(showAll = false) {
   const productsGrid = document.getElementById('products-grid');
   const loadMoreContainer = document.getElementById('load-more-container');

   if (productsGrid) {
      // Show either all products or just the first 6
      const displayProducts = showAll ? products : products.slice(0, 6);

      productsGrid.innerHTML = displayProducts.map(product => `
         <div class="group cursor-pointer">
            <div class="aspect-square overflow-hidden mb-4">
               <img 
                  src="${product.image}" 
                  alt="${product.name}"
                  class="w-full h-full object-cover object-center"
                  loading="lazy"
               />
            </div>
            <h3 class="text-center text-[#2D2E2C] text-lg leading-tight font-medium-custom tracking-[0.5px]">
               ${product.name}
            </h3>
         </div>
      `).join('');

      // Hide load more button container if showing all products
      if (loadMoreContainer) {
         loadMoreContainer.style.display = showAll ? 'none' : 'block';
      }
   }
}

function openSidebar() {
   sidebar.classList.remove('-translate-x-full');
   document.body.style.overflow = 'hidden';
}

function closeSidebar() {
   sidebar.classList.add('-translate-x-full');
   document.body.style.overflow = 'auto';
}

menuBtn.addEventListener('click', openSidebar);
closeBtn.addEventListener('click', closeSidebar);

// Close sidebar on escape key
document.addEventListener('keydown', function (e) {
   if (e.key === 'Escape') {
      closeSidebar();
   }
});

// Initialize products grid when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
   renderProductsGrid(false); // Initially show only 6 products

   // Add click handler for load more button
   const loadMoreBtn = document.getElementById('load-more-btn');
   if (loadMoreBtn) {
      loadMoreBtn.addEventListener('click', () => {
         renderProductsGrid(true); // Show all products when clicked
      });
   }
});

// Slider functionality
let currentSlideIndex = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');

// Initialize the slider
function initSlider() {
   if (!slides.length) return;

   // Hide all slides except the first one
   slides[0].style.opacity = '1';
   slides[0].style.zIndex = '1';
   for (let i = 1; i < slides.length; i++) {
      slides[i].style.opacity = '0';
      slides[i].style.zIndex = '0';
   }
}

// Move to a specific slide
function currentSlide(n) {
   showSlide(n);
}

// Navigate between slides
function moveSlide(direction) {
   showSlide(currentSlideIndex + direction);
}

// Show the specified slide
function showSlide(n) {
   if (!slides.length) return;

   // Handle wrap-around
   if (n >= slides.length) n = 0;
   if (n < 0) n = slides.length - 1;

   // Update current slide index
   const previousIndex = currentSlideIndex;
   currentSlideIndex = n;

   // Update dots
   dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentSlideIndex);
      dot.style.opacity = index === currentSlideIndex ? '1' : '0.5';
   });

   // Fade out previous slide
   slides[previousIndex].style.transition = 'opacity 0.5s ease-in-out, z-index 0.5s step-end';
   slides[previousIndex].style.opacity = '0';
   slides[previousIndex].style.zIndex = '0';

   // Fade in new slide
   slides[currentSlideIndex].style.transition = 'opacity 0.5s ease-in-out, z-index 0.5s step-start';
   slides[currentSlideIndex].style.opacity = '1';
   slides[currentSlideIndex].style.zIndex = '1';
}

// Auto-advance slides every 5 seconds
function autoAdvance() {
   moveSlide(1);
}

// Initialize slider when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
   initSlider();
   // Start auto-advance
   setInterval(autoAdvance, 5000);

   // Logo swap functionality
   const logoContainer = document.querySelector('.logo-container');
   const defaultLogo = document.querySelector('.logo-default');
   const hoverLogo = document.querySelector('.logo-hover');

   if (logoContainer && defaultLogo && hoverLogo) {
      // Show default logo initially
      defaultLogo.style.display = 'block';
      hoverLogo.style.display = 'none';

      // Handle hover events
      logoContainer.addEventListener('mouseenter', () => {
         defaultLogo.style.display = 'none';
         hoverLogo.style.display = 'block';
      });

      logoContainer.addEventListener('mouseleave', () => {
         defaultLogo.style.display = 'block';
         hoverLogo.style.display = 'none';
      });
   }
});

// Simple Language Switcher
function toggleLanguageDropdown() {
   const dropdown = document.querySelector('.language-dropdown');
   dropdown.classList.toggle('hidden');
}

function toggleMobileLanguageDropdown() {
   const dropdown = document.querySelector('.language-dropdown-mobile');
   dropdown.classList.toggle('hidden');
}

function googleTranslateElementInit() {
   new google.translate.TranslateElement({
      pageLanguage: 'en',
      includedLanguages: 'en,fr,it,ru',
      autoDisplay: false
   }, 'google_translate_element');
}


// Optional: Set selected language from cookie
document.addEventListener('DOMContentLoaded', () => {
   const selectedLanguage = document.getElementById('selected-language');
   const cookie = document.cookie.match(/googtrans=\/auto\/(\w+)/);
   const langCode = cookie ? cookie[1].toUpperCase() : 'EN';
   if (selectedLanguage) selectedLanguage.textContent = langCode;
});


function changeLanguage(langCode, langDisplay) {
   // Set selected text
   const selectedLanguage = document.getElementById('selected-language');
   if (selectedLanguage) selectedLanguage.textContent = langDisplay;

   // Hide dropdown
   const dropdown = document.querySelector('.language-dropdown');
   if (dropdown) dropdown.classList.add('hidden');

   // Set cookie to change language
   document.cookie = `googtrans=/auto/${langCode};path=/`;
   document.cookie = `googtrans=/auto/${langCode};domain=${window.location.hostname};path=/`;

   // Reload page to apply
   location.reload();
}

function toggleLanguageDropdown() {
   const dropdown = document.querySelector('.language-dropdown');
   if (dropdown) dropdown.classList.toggle('hidden');
}

// Close dropdowns when clicking outside
document.addEventListener('click', function (event) {
   const dropdown = document.querySelector('.language-dropdown');
   const mobileDropdown = document.querySelector('.language-dropdown-mobile');
   const languageSelector = document.querySelector('.language-selector');
   const mobileLanguageContainer = event.target.closest('.md\\:hidden');

   if (dropdown && !languageSelector?.contains(event.target)) {
      dropdown.classList.add('hidden');
   }

   if (mobileDropdown && !mobileLanguageContainer?.contains(event.target)) {
      mobileDropdown.classList.add('hidden');
   }
});

