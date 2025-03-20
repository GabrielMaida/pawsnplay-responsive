// Event listeners
document.getElementById('hamb-menu').addEventListener('click', toggleMenu);
document.getElementById('shop-viewmore').addEventListener('click', goToRight);
document.getElementById('submit-button').addEventListener('click', validateForm);
document.getElementById('newsletter-button').addEventListener('click', validateEmail);

// Event listeners for the product input number
document.querySelectorAll('.product-input-number-plus').forEach(button => {
    button.addEventListener('click', function () {
        incrementProductInput(this);
    });
});
document.querySelectorAll('.product-input-number-less').forEach(button => {
    button.addEventListener('click', function () {
        decrementProductInput(this);
    });
});

// Function to toggle the hamburger menu
function toggleMenu() {
    // Toggles the 'active' class on nav-links
    document.getElementById('nav-links').classList.toggle('active');

    // Toggles the 'aria-expanded' attribute on hamb-menu
    document.getElementById('hamb-menu').ariaExpanded = 
    document.getElementById('hamb-menu').ariaExpanded == "true" ? "false" : "true";
}

// Function to go to right inside the overflowed shop
function goToRight() {
    const shopCards = document.getElementById('shop-cards');

    shopCards.scrollTo({
        left: shopCards.scrollWidth,
        behavior: 'smooth'
    });
}

// Function to increment the product input number
function incrementProductInput(button) {
    // Find the closest
    const productCard = button.closest('.product-card');

    // Seleciona o valor específico dentro desse card
    const valueElement = productCard.querySelector('.product-input-number-value');

    // Incrementa o valor
    const currentValue = parseInt(valueElement.textContent);
    const newValue = currentValue + 1;
    
    if (newValue <= 15){
        valueElement.textContent = newValue;
    }
    else{
        showModal('You can only buy up to 15 units of each product');
    }
}

// Function to decrement the product input number
function decrementProductInput(button) {
    const productCard = button.closest('.product-card');
    const valueElement = productCard.querySelector('.product-input-number-value');

    // Decrementa o valor (mas evita valores negativos)
    let currentValue = parseInt(valueElement.textContent);
    if (currentValue > 0) {
        valueElement.textContent = currentValue - 1;
    }
}

// Function to show and hide modal
function showModal(message) {
    const modalOverlay = document.getElementById('modal-overlay');
    const modalText = document.getElementById('modal-text');

    // Defines the modal message
    if (modalText) {
        modalText.textContent = message;
    }

    // Shows the modal
    modalOverlay.classList.remove('hidden');

    // Close modal when clicking the button
    document.getElementById('modal-ok-button').onclick = function () {
        modalOverlay.classList.add('hidden');
    };

    // Close modal when clicking outside
    modalOverlay.onclick = function (event) {
        if (event.target === modalOverlay) {
            modalOverlay.classList.add('hidden');
        }
    };
}

// Function to validate the form
function validateForm(event) {
    event.preventDefault();

    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    if (firstName === "" && lastName === "" && email === "" && message === "") {
        return showModal('You need to fill something!');
    }

    if (firstName.length < 3 || lastName.length < 3) {
        return showModal('The names must be at least 3 characters long');
    }

    if (!/^[a-zA-Z]+$/.test(firstName) || !/^[a-zA-Z]+$/.test(lastName)) {
        return showModal('The names must contain only letters');
    }

    if (email === "") {
        return showModal('The email field is required');
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return showModal('The email field must contain a valid email address');
    }

    if (message === "") {
        return showModal('The message field is required');
    }

    if (!document.getElementById('checkbox').checked) {
        return showModal('You must accept the terms and conditions');
    }

    return showModal('Form submitted successfully!');
}

// Function to validate the email
function validateEmail(event) {
    event.preventDefault();

    const email = document.getElementById('newsletter-email').value;

    if (email === "") {
        return showModal('You must provide an email address');
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return showModal('The email field must contain a valid email address');
    }

    return showModal('Successfully subscribed to our newsletter!');
}
