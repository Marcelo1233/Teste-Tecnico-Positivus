document.addEventListener('DOMContentLoaded', () => {
    // Accordion Logic
    const accordionItems = document.querySelectorAll('.accordion-item');

    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        header.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all items
            accordionItems.forEach(i => {
                i.classList.remove('active');
                const icon = i.querySelector('.accordion-icon');
                if (icon) icon.innerHTML = '<i data-lucide="plus"></i>';
            });

            // If not active, open it
            if (!isActive) {
                item.classList.add('active');
                const icon = item.querySelector('.accordion-icon');
                if (icon) icon.innerHTML = '<i data-lucide="minus"></i>';
            }

            // Re-create icons to update plus/minus
            lucide.createIcons();
        });
    });

    // Testimonial Carousel Logic
    const carouselList = document.querySelector('.testimonial-list');
    const carouselCards = document.querySelectorAll('.testimonial-card');
    const navIndicators = document.querySelectorAll('.indicator-star');
    const prevArrow = document.querySelector('.prev-btn');
    const nextArrow = document.querySelector('.next-btn');
    
    let currentSlide = 0;

    function updateCarousel() {
        const section = document.querySelector('.testimonials-section');
        if (!section || carouselCards.length === 0) return;

        const sectionWidth = section.offsetWidth;
        const cardWidth = carouselCards[0].offsetWidth;
        const gap = 50; 

        // Center current card:
        // (sectionWidth / 2) - (cardWidth / 2) - (currentSlide * (cardWidth + gap))
        const offset = (sectionWidth / 2) - (cardWidth / 2) - (currentSlide * (cardWidth + gap));
        
        carouselList.style.transform = `translateX(${offset}px)`;
        
        navIndicators.forEach((star, index) => {
            star.classList.toggle('active', index === currentSlide);
        });
    }

    if (prevArrow && nextArrow) {
        nextArrow.addEventListener('click', () => {
            if (currentSlide < carouselCards.length - 1) {
                currentSlide++;
                updateCarousel();
            }
        });

        prevArrow.addEventListener('click', () => {
            if (currentSlide > 0) {
                currentSlide--;
                updateCarousel();
            }
        });
    }

    navIndicators.forEach((star, index) => {
        star.addEventListener('click', () => {
            currentSlide = index;
            updateCarousel();
        });
    });

    window.addEventListener('resize', updateCarousel);
    setTimeout(updateCarousel, 100);

    // Form Submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });
    }

    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
