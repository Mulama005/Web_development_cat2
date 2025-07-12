document.getElementById('contact-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const form = e.target;
  const formStatus = document.getElementById('form-status');
  formStatus.textContent = "Sending...";

  const formData = new FormData(form);

  try {
    const response = await fetch('submit_form.php', {
      method: 'POST',
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      formStatus.textContent = "Message sent successfully!";
      formStatus.style.color = 'green';
      form.reset();
    } else {
      formStatus.textContent = "Error: " + (data.error || "Unknown error");
      formStatus.style.color = 'red';
    }
  } catch (error) {
    console.error('Error submitting form:', error);
    formStatus.textContent = "Network error - please try again.";
    formStatus.style.color = 'red';
  }
});
