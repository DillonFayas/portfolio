// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');

            // Animate skill bars when visible
            if (entry.target.querySelector('.skill-fill')) {
                entry.target.querySelectorAll('.skill-fill').forEach(bar => {
                    bar.classList.add('animate');
                });
            }
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right').forEach(el => {
    observer.observe(el);
});

// Counter animation
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + '+';
        }
    };
    updateCounter();
}

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('.counter');
            counters.forEach(counter => {
                if (counter.textContent === '0') {
                    animateCounter(counter);
                }
            });
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const homeSection = document.querySelector('.page-section');
if (homeSection && homeSection.querySelector('.counter')) {
    counterObserver.observe(homeSection);
}

// Image carousel functionality
let currentSlides = {};

function changeSlide(carouselIndex, direction) {
    const carousel = document.querySelector(`[data-carousel="${carouselIndex}"]`);
    if (!carousel) return;

    const images = carousel.querySelectorAll('.carousel-image');
    if (images.length <= 1) return;

    if (!(carouselIndex in currentSlides)) {
        currentSlides[carouselIndex] = 0;
    }

    images[currentSlides[carouselIndex]].classList.remove('active');

    currentSlides[carouselIndex] += direction;

    if (currentSlides[carouselIndex] >= images.length) {
        currentSlides[carouselIndex] = 0;
    } else if (currentSlides[carouselIndex] < 0) {
        currentSlides[carouselIndex] = images.length - 1;
    }

    images[currentSlides[carouselIndex]].classList.add('active');
}

// Auto-play carousels
setInterval(() => {
    document.querySelectorAll('[data-carousel]').forEach(carousel => {
        const index = parseInt(carousel.getAttribute('data-carousel'));
        const images = carousel.querySelectorAll('.carousel-image');
        if (images.length > 1) {
            changeSlide(index, 1);
        }
    });
}, 5000);