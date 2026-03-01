let currentSlide = 1;
const totalSlides = document.querySelectorAll('.slide').length;

document.getElementById('total-slides').textContent = totalSlides;

// Navigation Functions
function showSlide(n) {
    const slides = document.querySelectorAll('.slide');
    
    // Loop slide number
    if (n > totalSlides) {
        currentSlide = 1;
    } else if (n < 1) {
        currentSlide = totalSlides;
    }

    // Remove active class from all slides
    slides.forEach(slide => {
        slide.classList.remove('active', 'prev');
    });

    // Add active class to current slide
    if (slides[currentSlide - 1]) {
        slides[currentSlide - 1].classList.add('active');
        // update the number displayed within the slide itself
        const innerNum = slides[currentSlide - 1].querySelector('.slide-number');
        if (innerNum) {
            innerNum.textContent = currentSlide;
        }
    }

    // Update slide counter
    document.getElementById('current-slide').textContent = currentSlide;

    // Add animation to slide number within the active slide
    const slideNumber = slides[currentSlide - 1]?.querySelector('.slide-number');
    if (slideNumber) {
        slideNumber.style.animation = 'none';
        setTimeout(() => {
            slideNumber.style.animation = 'fadeIn 0.5s ease-in-out';
        }, 10);
    }
}

function nextSlide() {
    currentSlide++;
    showSlide(currentSlide);
}

function previousSlide() {
    currentSlide--;
    showSlide(currentSlide);
}

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        nextSlide();
    } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        previousSlide();
    }
});

// Mouse Wheel Navigation
document.addEventListener('wheel', (e) => {
    if (e.deltaY > 0) {
        nextSlide();
    } else {
        previousSlide();
    }
}, { passive: true });

// Touch Navigation (for mobile)
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    if (touchStartX - touchEndX > swipeThreshold) {
        nextSlide();
    }
    if (touchEndX - touchStartX > swipeThreshold) {
        previousSlide();
    }
}

// Initialize
showSlide(currentSlide);

// Optional: Add fullscreen support
document.addEventListener('keydown', (e) => {
    if (e.key === 'f' || e.key === 'F') {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    }
});

// Add click outside prevention for better UX
document.addEventListener('click', (e) => {
    if (e.target === document.body) {
        nextSlide();
    }
});
