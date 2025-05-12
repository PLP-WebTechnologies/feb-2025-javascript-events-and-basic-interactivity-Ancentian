document.addEventListener('DOMContentLoaded', function() {
    // --------------------------
    // Event Handling Section
    // --------------------------
    
    // Button click event
    const clickButton = document.getElementById('click-button');
    const clickOutput = document.getElementById('click-output');
    
    clickButton.addEventListener('click', function() {
        clickOutput.textContent = 'Button was clicked!';
        clickButton.classList.add('bounce');
        setTimeout(() => clickButton.classList.remove('bounce'), 500);
    });
    
    // Hover effects
    const hoverBox = document.querySelector('.hover-box');
    const hoverOutput = document.getElementById('hover-output');
    
    hoverBox.addEventListener('mouseenter', function() {
        hoverOutput.textContent = 'Mouse entered!';
    });
    
    hoverBox.addEventListener('mouseleave', function() {
        hoverOutput.textContent = 'Mouse left!';
    });
    
    // Keypress detection
    const keypressInput = document.getElementById('keypress-input');
    const keypressOutput = document.getElementById('keypress-output');
    
    keypressInput.addEventListener('keypress', function(e) {
        keypressOutput.textContent = `Key pressed: ${e.key}`;
    });
    
    // Secret action (double click or long press)
    const secretBox = document.querySelector('.secret-box');
    const secretOutput = document.getElementById('secret-output');
    let pressTimer;
    
    // Double click
    secretBox.addEventListener('dblclick', function() {
        secretOutput.textContent = 'You discovered the double click secret! 🎉';
        this.classList.add('bounce');
        setTimeout(() => this.classList.remove('bounce'), 500);
    });
    
    // Long press
    secretBox.addEventListener('mousedown', function() {
        pressTimer = setTimeout(() => {
            secretOutput.textContent = 'You discovered the long press secret! 🎉';
            this.classList.add('bounce');
            setTimeout(() => this.classList.remove('bounce'), 500);
        }, 1000);
    });
    
    secretBox.addEventListener('mouseup', function() {
        clearTimeout(pressTimer);
    });
    
    secretBox.addEventListener('mouseleave', function() {
        clearTimeout(pressTimer);
    });
    
    // --------------------------
    // Interactive Elements Section
    // --------------------------
    
    // Button that changes color
    const colorChanger = document.getElementById('color-changer');
    const colors = ['#3498db', '#2ecc71', '#e74c3c', '#f39c12', '#9b59b6'];
    let colorIndex = 0;
    
    colorChanger.addEventListener('click', function() {
        colorIndex = (colorIndex + 1) % colors.length;
        this.style.backgroundColor = colors[colorIndex];
        this.textContent = `Color Changed (${colorIndex + 1}/${colors.length})`;
    });
    
    // Image gallery/slideshow
    const images = document.querySelectorAll('.gallery-container img');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    let currentImageIndex = 0;
    
    function showImage(index) {
        images.forEach(img => img.classList.remove('active'));
        images[index].classList.add('active');
        currentImageIndex = index;
    }
    
    prevBtn.addEventListener('click', function() {
        let newIndex = currentImageIndex - 1;
        if (newIndex < 0) newIndex = images.length - 1;
        showImage(newIndex);
    });
    
    nextBtn.addEventListener('click', function() {
        let newIndex = currentImageIndex + 1;
        if (newIndex >= images.length) newIndex = 0;
        showImage(newIndex);
    });
    
    // Auto-advance slideshow every 5 seconds
    setInterval(() => {
        let newIndex = currentImageIndex + 1;
        if (newIndex >= images.length) newIndex = 0;
        showImage(newIndex);
    }, 5000);
    
    // Accordion functionality
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const content = this.nextElementSibling;
            const isActive = content.classList.contains('active');
            
            // Close all accordion items
            document.querySelectorAll('.accordion-content').forEach(item => {
                item.classList.remove('active');
            });
            
            // Open the clicked one if it wasn't active
            if (!isActive) {
                content.classList.add('active');
            }
        });
    });
    
    // --------------------------
    // Form Validation Section
    // --------------------------
    
    const form = document.getElementById('validation-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const passwordError = document.getElementById('password-error');
    const strengthMeter = document.querySelector('.strength-meter');
    const strengthText = document.querySelector('.strength-text');
    
    // Real-time validation for name
    nameInput.addEventListener('input', function() {
        if (this.value.trim() === '') {
            nameError.textContent = 'Name is required';
            this.classList.add('shake');
            setTimeout(() => this.classList.remove('shake'), 400);
        } else {
            nameError.textContent = '';
        }
    });
    
    // Real-time validation for email
    emailInput.addEventListener('input', function() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (this.value.trim() === '') {
            emailError.textContent = '';
        } else if (!emailRegex.test(this.value)) {
            emailError.textContent = 'Please enter a valid email address';
            this.classList.add('shake');
            setTimeout(() => this.classList.remove('shake'), 400);
        } else {
            emailError.textContent = '';
        }
    });
    
    // Real-time password strength check
    passwordInput.addEventListener('input', function() {
        const password = this.value;
        let strength = 0;
        
        // Check password length
        if (password.length >= 8) strength += 1;
        
        // Check for mixed case
        if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength += 1;
        
        // Check for numbers
        if (/\d/.test(password)) strength += 1;
        
        // Check for special characters
        if (/[^a-zA-Z0-9]/.test(password)) strength += 1;
        
        // Update strength meter
        const strengthPercent = strength * 25;
        let strengthColor = '#e74c3c'; // red
        let text = 'Weak';
        
        if (strength >= 3) {
            strengthColor = '#2ecc71'; // green
            text = 'Strong';
        } else if (strength >= 2) {
            strengthColor = '#f39c12'; // orange
            text = 'Medium';
        }
        
        strengthMeter.style.width = `${strengthPercent}%`;
        strengthMeter.style.backgroundColor = strengthColor;
        strengthText.textContent = text;
        strengthText.style.color = strengthColor;
        
        // Show error if password is too short
        if (password.length > 0 && password.length < 8) {
            passwordError.textContent = 'Password must be at least 8 characters';
            this.classList.add('shake');
            setTimeout(() => this.classList.remove('shake'), 400);
        } else {
            passwordError.textContent = '';
        }
    });
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        let isValid = true;
        
        // Validate name
        if (nameInput.value.trim() === '') {
            nameError.textContent = 'Name is required';
            nameInput.classList.add('shake');
            setTimeout(() => nameInput.classList.remove('shake'), 400);
            isValid = false;
        }
        
        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailInput.value.trim() !== '' && !emailRegex.test(emailInput.value)) {
            emailError.textContent = 'Please enter a valid email address';
            emailInput.classList.add('shake');
            setTimeout(() => emailInput.classList.remove('shake'), 400);
            isValid = false;
        }
        
        // Validate password
        if (passwordInput.value.length < 8) {
            passwordError.textContent = 'Password must be at least 8 characters';
            passwordInput.classList.add('shake');
            setTimeout(() => passwordInput.classList.remove('shake'), 400);
            isValid = false;
        }
        
        // If form is valid, show success message
        if (isValid) {
            alert('Form submitted successfully!');
            form.reset();
            strengthMeter.style.width = '0';
            strengthText.textContent = '';
        }
    });
});