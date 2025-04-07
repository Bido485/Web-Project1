// Main JavaScript for all pages

// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('show');
        });
    }

    // Load cars on homepage
    if (document.getElementById('carsContainer')) {
        loadCars();
    }

    // Set default dates for rental form
    setDefaultDates();

    // FAQ functionality
    setupFAQ();

    // Form submissions
    setupForms();
});

// Load cars into the homepage
function loadCars() {
    const carsContainer = document.getElementById('carsContainer');
    
    cars.forEach(car => {
        const carCard = document.createElement('div');
        carCard.className = 'car-card';
        
        // Generate stars for rating
        const stars = [];
        const fullStars = Math.floor(car.rating);
        const hasHalfStar = car.rating % 1 >= 0.5;
        
        for (let i = 0; i < 5; i++) {
            if (i < fullStars) {
                stars.push('<i class="fas fa-star"></i>');
            } else if (i === fullStars && hasHalfStar) {
                stars.push('<i class="fas fa-star-half-alt"></i>');
            } else {
                stars.push('<i class="far fa-star"></i>');
            }
        }
        
        carCard.innerHTML = `
            <img src="${car.img}" alt="${car.name}" class="car-img">
            <div class="car-details">
                <h3 class="car-title">${car.name} <span style="font-size: 14px; color: #7f8c8d;">${car.type}</span></h3>
                <div class="car-features">
                    <span class="car-feature"><i class="fas fa-users"></i> ${car.features.passengers}</span>
                    <span class="car-feature"><i class="fas fa-suitcase"></i> ${car.features.bags}</span>
                    <span class="car-feature"><i class="fas fa-door-open"></i> ${car.features.doors}</span>
                </div>
                <div class="car-features">
                    <span class="car-feature"><i class="fas fa-cog"></i> ${car.features.transmission}</span>
                    <span class="car-feature">${stars.join('')} ${car.rating}</span>
                </div>
                <div class="car-price">$${car.price}<span class="price-period"> /day</span></div>
                <button class="btn" style="width: 100%;" onclick="rentCar(${car.id})">Rent Now</button>
            </div>
        `;
        
        carsContainer.appendChild(carCard);
    });
}

// Set default dates for the rental form
function setDefaultDates() {
    const pickupDate = document.getElementById('pickup-date');
    const dropoffDate = document.getElementById('dropoff-date');
    
    if (pickupDate && dropoffDate) {
        const today = new Date();
        const tomorrow = new Date();
        tomorrow.setDate(today.getDate() + 1);
        
        pickupDate.valueAsDate = today;
        dropoffDate.valueAsDate = tomorrow;
    }
}

// Setup FAQ functionality
function setupFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            this.classList.toggle('active');
            const answer = this.nextElementSibling;
            answer.classList.toggle('show');
        });
    });
}

// Handle form submissions
function setupForms() {
    // Rental form
    const rentalForm = document.getElementById('rentalForm');
    if (rentalForm) {
        rentalForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const pickupLocation = document.getElementById('pickup-location').value;
            const pickupDate = document.getElementById('pickup-date').value;
            const dropoffDate = document.getElementById('dropoff-date').value;
            
            if (!pickupLocation || !pickupDate || !dropoffDate) {
                alert('Please fill in all required fields');
                return;
            }
            
            alert('Searching for available cars...');
            if (document.getElementById('cars')) {
                document.getElementById('cars').scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // Contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        });
    }
}

// Rent car function (global for HTML onclick)
function rentCar(carId) {
    const car = cars.find(c => c.id === carId);
    alert(`You've selected the ${car.name}. Proceeding to checkout...`);
    // In a real app, you would redirect to a checkout page
}
