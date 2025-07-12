// DOM Elements
const filterMake = document.getElementById('filter-make');
const filterPrice = document.getElementById('filter-price');
const carContainer = document.getElementById('car-container');

// Fetch and filter cars
function loadCars() {
  db.collection("cars").get().then((querySnapshot) => {
    let cars = [];
    querySnapshot.forEach(doc => cars.push({ id: doc.id, ...doc.data() }));
    
    // Filter by make
    if (filterMake.value) {
      cars = cars.filter(car => car.make === filterMake.value);
    }

    // Filter by price
    if (filterPrice.value) {
      const [min, max] = filterPrice.value.split('-').map(Number);
      cars = cars.filter(car => car.price >= min && car.price <= max);
    }

    renderCars(cars);
  });
}

// Render filtered cars
function renderCars(cars) {
  carContainer.innerHTML = cars.map(car => `
    <div class="car-card">
      <img src="${car.image}" alt="${car.make} ${car.model}">
      <h3>${car.make} ${car.model}</h3>
      <p>$${car.price.toLocaleString()}</p>
      <button onclick="openModal('${car.id}')">View Details</button>
    </div>
  `).join('');
}
// Advanced filtering
function filterCars() {
  const make = document.getElementById('filter-make').value;
  const priceRange = document.getElementById('filter-price').value;
  const searchTerm = document.getElementById('search').value.toLowerCase();

  db.collection("cars").get().then(snap => {
    let cars = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    // Apply filters
    cars = cars.filter(car => {
      return (!make || car.make === make) &&
             (!priceRange || checkPriceRange(car.price, priceRange)) &&
             (!searchTerm || `${car.make} ${car.model}`.toLowerCase().includes(searchTerm));
    });

    renderCars(cars);
  });
}

function checkPriceRange(price, range) {
  const [min, max] = range.split('-').map(Number);
  return price >= min && (max ? price <= max : true);
}

// Initialize filters
filterMake.addEventListener('change', loadCars);
filterPrice.addEventListener('change', loadCars);
loadCars(); // Load all cars initially