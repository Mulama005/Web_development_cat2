// Modal Functions
function openModal(carId) {
  db.collection("cars").doc(carId).get().then(doc => {
    const car = doc.data();
    document.getElementById('modal-data').innerHTML = `
      <img src="${car.image}" class="w-full mb-4">
      <h2 class="text-2xl font-bold">${car.make} ${car.model}</h2>
      <p><strong>Year:</strong> ${car.year}</p>
      <p><strong>Price:</strong> $${car.price.toLocaleString()}</p>
      <p><strong>Features:</strong> ${car.features?.join(', ') || 'N/A'}</p>
    `;
    document.getElementById('car-modal').classList.remove('hidden');
  });
}
document.getElementById('modal-image').innerHTML = `
  <picture>
    <source srcset="${car.imageWebp}" type="image/webp">
    <img 
      src="${car.imageJpeg}" 
      alt="Close-up of ${car.make} ${car.model} dashboard and exterior"
      class="w-full max-h-96 object-contain"
    >
  </picture>
`;

// Close modal
document.querySelector('.close-modal').addEventListener('click', () => {
  document.getElementById('car-modal').classList.add('hidden');
});