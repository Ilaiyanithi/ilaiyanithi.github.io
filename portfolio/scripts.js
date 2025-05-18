// Theme switching functionality
document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });

    // Theme switching
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.setAttribute('data-theme', savedTheme);
        themeToggle.checked = savedTheme === 'light';
    }

    // Theme toggle event listener
    themeToggle.addEventListener('change', () => {
        const newTheme = themeToggle.checked ? 'light' : 'dark';
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Force a reflow to ensure theme is applied
        void body.offsetWidth;
    });

    // Create dynamic particles
    function createParticles() {
        const particleCount = 15;
        const colors = ['var(--primary-color)', 'var(--secondary-color)', 'var(--accent-color)'];
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random position
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            const delay = Math.random() * 15;
            const size = Math.random() * 3 + 2;
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            particle.style.left = `${posX}%`;
            particle.style.top = `${posY}%`;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.animationDelay = `${delay}s`;
            particle.style.backgroundColor = color;
            particle.style.boxShadow = `0 0 ${size * 2}px ${color}`;
            
            // Add mouse interaction
            particle.addEventListener('mouseover', () => {
                particle.style.transform = 'scale(2)';
                particle.style.opacity = '0.8';
            });
            
            particle.addEventListener('mouseout', () => {
                particle.style.transform = 'scale(1)';
                particle.style.opacity = '0.3';
            });
            
            document.body.appendChild(particle);
        }
    }

    // Initialize particles
    createParticles();

    // Add scroll animations
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        
        // Animate sections on scroll
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition > sectionTop - window.innerHeight / 2) {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }
        });
        
        // Update active nav link
        navLinks.forEach(link => {
            const section = document.querySelector(link.getAttribute('href'));
            if (section) {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                
                if (scrollPosition >= sectionTop - 100 && 
                    scrollPosition < sectionTop + sectionHeight - 100) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            }
        });
    });

    // Add hover effects to cards
    const cards = document.querySelectorAll('.project-card, .certification-item, .skill-category');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
            card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.2)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)';
        });
    });

    // Add smooth scroll to navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Mobile menu functionality
    const hamburger = document.querySelector('.hamburger');
    const navLinksContainer = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinksContainer.classList.toggle('active');
        hamburger.setAttribute('aria-expanded', hamburger.classList.contains('active'));
        body.style.overflow = hamburger.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navLinksContainer.contains(e.target) && navLinksContainer.classList.contains('active')) {
            hamburger.classList.remove('active');
            navLinksContainer.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            body.style.overflow = '';
        }
    });

    // Close mobile menu when clicking on a link
    navLinksContainer.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinksContainer.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            body.style.overflow = '';
        });
    });

    // Project Tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    const projectCards = document.querySelectorAll('.project-card');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            tabBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');
            
            const category = btn.dataset.tab;
            
            projectCards.forEach(card => {
                if (category === 'all' || card.dataset.category === category) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Testimonial slider functionality
    const testimonialSlider = document.querySelector('.testimonials-slider');
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    let currentTestimonial = 0;
    let isAutoSliding = true;
    let slideInterval;

    // Create navigation buttons
    const testimonialNav = document.createElement('div');
    testimonialNav.className = 'testimonial-navigation';
    
    const prevBtn = document.createElement('button');
    prevBtn.className = 'testimonial-nav-btn prev';
    prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
    
    const nextBtn = document.createElement('button');
    nextBtn.className = 'testimonial-nav-btn next';
    nextBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
    
    testimonialNav.appendChild(prevBtn);
    testimonialNav.appendChild(nextBtn);
    testimonialSlider.parentElement.appendChild(testimonialNav);

    function slideTestimonials(direction = 1) {
        currentTestimonial = (currentTestimonial + direction + testimonialItems.length) % testimonialItems.length;
        updateTestimonialSlider();
    }

    function updateTestimonialSlider() {
        const offset = -(currentTestimonial * (100 / testimonialItems.length));
        testimonialSlider.style.transform = `translateX(${offset}%)`;
    }

    // Start auto-sliding
    function startAutoSlide() {
        if (slideInterval) clearInterval(slideInterval);
        slideInterval = setInterval(() => {
            if (isAutoSliding) {
                slideTestimonials(1);
            }
        }, 5000);
    }

    // Event listeners for hover pause
    testimonialSlider.addEventListener('mouseenter', () => {
        isAutoSliding = false;
    });

    testimonialSlider.addEventListener('mouseleave', () => {
        isAutoSliding = true;
        startAutoSlide();
    });

    // Navigation button event listeners
    prevBtn.addEventListener('click', () => {
        isAutoSliding = false;
        slideTestimonials(-1);
        setTimeout(() => {
            isAutoSliding = true;
            startAutoSlide();
        }, 1000);
    });

    nextBtn.addEventListener('click', () => {
        isAutoSliding = false;
        slideTestimonials(1);
        setTimeout(() => {
            isAutoSliding = true;
            startAutoSlide();
        }, 1000);
    });

    // Touch events for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    testimonialSlider.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        isAutoSliding = false;
    });

    testimonialSlider.addEventListener('touchmove', (e) => {
        touchEndX = e.touches[0].clientX;
        const diff = touchStartX - touchEndX;
        const offset = -(currentTestimonial * (100 / testimonialItems.length)) - (diff / testimonialSlider.offsetWidth * 100);
        testimonialSlider.style.transform = `translateX(${offset}%)`;
    });

    testimonialSlider.addEventListener('touchend', () => {
        const swipeDistance = touchEndX - touchStartX;
        if (Math.abs(swipeDistance) > 50) {
            if (swipeDistance > 0) {
                slideTestimonials(-1);
            } else {
                slideTestimonials(1);
            }
        } else {
            updateTestimonialSlider(); // Reset to current position if swipe wasn't long enough
        }
        isAutoSliding = true;
        startAutoSlide();
    });

    // Initialize the slider
    updateTestimonialSlider();
    startAutoSlide();

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close mobile menu if open
                hamburger.classList.remove('active');
                navLinksContainer.classList.remove('active');
            }
        });
    });

    // Add scroll-based animations
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Navbar scroll effect
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        // Add parallax effect to background elements
        const parallaxElements = document.querySelectorAll('.parallax');
        parallaxElements.forEach(element => {
            const speed = element.getAttribute('data-speed') || 0.5;
            const yPos = -(scrollTop * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
        
        lastScrollTop = scrollTop;
    });

    // Form submission handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Here you would typically handle form submission
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        });
    }

    // Testimonials auto-clone for infinite scroll
    const testimonialsTrack = document.querySelector('.testimonials-track');
    if (testimonialsTrack) {
        // Clone the track when it reaches halfway
        testimonialsTrack.addEventListener('animationiteration', () => {
            testimonialsTrack.style.transform = 'translateX(0)';
        });
    }
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        const hamburger = document.querySelector('.hamburger');
        const navLinks = document.querySelector('.nav-links');
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

//