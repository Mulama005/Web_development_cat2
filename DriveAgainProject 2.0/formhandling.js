// Formspree Form Handling
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  formStatus.textContent = "Sending...";
  
  fetch("https://formspree.io/f/YOUR_FORMSPREE_ID", {
    method: "POST",
    body: new FormData(contactForm),
    headers: { 'Accept': 'application/json' }
  })
  .then(response => {
    formStatus.textContent = "Message sent successfully!";
    contactForm.reset();
  })
  .catch(error => {
    formStatus.textContent = "Oops! There was a problem.";
  });
});