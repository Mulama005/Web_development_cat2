// Mobile menu toggle
const mobileMenuButton = document.querySelector('button.md:hidden');
const mobileMenu = document.querySelector('.hidden.md\\:flex');

mobileMenuButton.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
});

