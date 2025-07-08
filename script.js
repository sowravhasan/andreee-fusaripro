const menuBtn = document.getElementById('menuBtn');
const sidebar = document.getElementById('sidebar');
const closeBtn = document.getElementById('closeBtn');

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
document.addEventListener('keydown', function(e) {
   if (e.key === 'Escape') {
      closeSidebar();
   }
});