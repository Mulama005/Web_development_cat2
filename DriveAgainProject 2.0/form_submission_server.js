document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form'); // FIXED: match your actual HTML form ID

    if (contactForm) {
        contactForm.addEventListener('submit_form', async function(e) {
            e.preventDefault();

            // Get submit button and show loading
            const submitBtn = contactForm.querySelector('[type="submit"]');
            const originalBtnText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';

            try {
                const formData = new FormData(contactForm);

                const response = await fetch('submit_form.php', {  // FIXED: match your actual PHP file
                    method: 'POST',
                    body: formData
                });

                const result = await response.json();

                if (!response.ok || !result.success) {
                    throw new Error(result.error || 'Server error');
                }

                // Show success notification
                showNotification(result.message || 'Message sent!', 'success');
                contactForm.reset();
            } catch (error) {
                console.error('Form submission error:', error);
                showNotification(error.message || 'Failed to send message', 'error');
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = originalBtnText;
            }
        });
    }
});

// Simple notification system
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `fixed top-5 right-5 px-4 py-2 rounded shadow-lg z-50 text-white text-sm ${
        type === 'success' ? 'bg-green-600' : 'bg-red-600'
    }`;
    notification.textContent = message;

    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 5000);
}
