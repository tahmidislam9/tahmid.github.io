// ==========================================
// PERFORMANCE OPTIMIZATION - Defer heavy operations
// ==========================================

(function() {
    'use strict';

    // ==========================================
    // PRELOADER
    // ==========================================
    window.addEventListener('load', function() {
        const preloader = document.getElementById('preloader');
        setTimeout(() => {
            preloader.classList.add('hidden');
        }, 800);
    });

    // ==========================================
    // NAVIGATION
    // ==========================================
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Throttled scroll for better performance
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                if (window.scrollY > 50) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
                ticking = false;
            });
            ticking = true;
        }
    });

    // Mobile Menu Toggle
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking nav link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Active nav on scroll - Optimized
    const sections = document.querySelectorAll('section[id]');
    
    function activateNavOnScroll() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelector('.nav-link[href*=' + sectionId + ']')?.classList.add('active');
            } else {
                document.querySelector('.nav-link[href*=' + sectionId + ']')?.classList.remove('active');
            }
        });
    }

    let scrollTicking = false;
    window.addEventListener('scroll', function() {
        if (!scrollTicking) {
            window.requestAnimationFrame(function() {
                activateNavOnScroll();
                scrollTicking = false;
            });
            scrollTicking = true;
        }
    });

    // ==========================================
    // THEME TOGGLE - Dark Mode
    // ==========================================
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    // Check saved theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
    }

    themeToggle.addEventListener('click', function() {
        body.classList.toggle('dark-mode');
        const currentTheme = body.classList.contains('dark-mode') ? 'dark' : 'light';
        localStorage.setItem('theme', currentTheme);
    });

    // ==========================================
    // SCROLL TO TOP BUTTON
    // ==========================================
    const scrollTopBtn = document.getElementById('scrollTop');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('active');
        } else {
            scrollTopBtn.classList.remove('active');
        }
    });

    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ==========================================
    // PARTICLES.JS CONFIGURATION - Lightweight
    // ==========================================
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: { value: 50, density: { enable: true, value_area: 800 } },
                color: { value: '#6366f1' },
                shape: { type: 'circle' },
                opacity: { value: 0.3, random: true },
                size: { value: 3, random: true },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#6366f1',
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: 'none',
                    random: true,
                    straight: false,
                    out_mode: 'out'
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: { enable: true, mode: 'grab' },
                    onclick: { enable: true, mode: 'push' },
                    resize: true
                },
                modes: {
                    grab: { distance: 140, line_linked: { opacity: 0.5 } },
                    push: { particles_nb: 4 }
                }
            },
            retina_detect: true
        });
    }

    // ==========================================
    // TYPED.JS - Typing Animation
    // ==========================================
    if (typeof Typed !== 'undefined') {
        const typed = new Typed('.typed-text', {
            strings: [
                'Digital Marketer',
                'Content Creator',
                'Web Developer',
                'SEO Specialist',
                'Graphic Designer',
                'Future Doctor'
            ],
            typeSpeed: 80,
            backSpeed: 50,
            backDelay: 1500,
            loop: true,
            showCursor: false
        });
    }

    // ==========================================
    // COUNTER ANIMATION - Optimized
    // ==========================================
    const counters = document.querySelectorAll('.counter');
    let counted = false;

    function animateCounters() {
        if (counted) return;
        
        const countersSection = document.querySelector('.hero-stats');
        if (!countersSection) return;
        
        const rect = countersSection.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom >= 0) {
            counters.forEach(counter => {
                const target = +counter.getAttribute('data-target');
                const speed = target > 10 ? 50 : 200;
                
                const updateCount = () => {
                    const count = +counter.innerText;
                    const increment = target / speed;
                    
                    if (count < target) {
                        counter.innerText = Math.ceil(count + increment);
                        setTimeout(updateCount, 1);
                    } else {
                        counter.innerText = target;
                    }
                };
                
                updateCount();
            });
            counted = true;
        }
    }

    window.addEventListener('scroll', animateCounters);
    animateCounters();

    // ==========================================
    // SKILL FILTER
    // ==========================================
    const categoryBtns = document.querySelectorAll('.category-btn');
    const skillCards = document.querySelectorAll('.skill-card');

    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            categoryBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            skillCards.forEach(card => {
                if (category === 'all' || card.getAttribute('data-category') === category) {
                    card.style.display = 'block';
                    setTimeout(() => card.style.opacity = '1', 10);
                } else {
                    card.style.opacity = '0';
                    setTimeout(() => card.style.display = 'none', 300);
                }
            });
        });
    });

    // ==========================================
    // SKILL PROGRESS ANIMATION
    // ==========================================
    const skillSection = document.getElementById('skills');
    let skillsAnimated = false;

    function animateSkills() {
        if (skillsAnimated || !skillSection) return;
        
        const rect = skillSection.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            const progressBars = document.querySelectorAll('.progress');
            progressBars.forEach(bar => {
                const width = bar.getAttribute('data-progress');
                setTimeout(() => {
                    bar.style.width = width + '%';
                }, 100);
            });
            skillsAnimated = true;
        }
    }

    window.addEventListener('scroll', animateSkills);
    animateSkills();

    // ==========================================
    // PROJECT FILTER
    // ==========================================
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            projectItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.classList.remove('hide');
                    item.style.display = 'block';
                } else {
                    item.classList.add('hide');
                    item.style.display = 'none';
                }
            });
        });
    });

    // ==========================================
    // TESTIMONIAL SLIDER - Simple & Fast
    // ==========================================
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.querySelector('.testimonial-prev');
    const nextBtn = document.querySelector('.testimonial-next');
    let currentTestimonial = 0;

    if (testimonialCards.length > 0) {
        function showTestimonial(index) {
            testimonialCards.forEach((card, i) => {
                card.style.display = i === index ? 'block' : 'none';
            });
        }

        prevBtn?.addEventListener('click', () => {
            currentTestimonial = (currentTestimonial - 1 + testimonialCards.length) % testimonialCards.length;
            showTestimonial(currentTestimonial);
        });

        nextBtn?.addEventListener('click', () => {
            currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
            showTestimonial(currentTestimonial);
        });

        // Auto slide
        setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
            showTestimonial(currentTestimonial);
        }, 5000);

        showTestimonial(0);
    }

    // ==========================================
    // CONTACT FORM - With Backend Integration
    // ==========================================
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // Show loading state
            const submitBtn = contactForm.querySelector('.btn-submit');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            try {
                // Option 1: Using Formspree (Simple & Free)
                const response = await fetch('https://formspree.io/f/maqggrjw', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });
                
                if (response.ok) {
                    formStatus.textContent = '✓ Message sent successfully! I\'ll get back to you soon.';
                    formStatus.className = 'form-status success';
                    contactForm.reset();
                } else {
                    throw new Error('Failed to send');
                }
            } catch (error) {
                formStatus.textContent = '✗ Oops! Something went wrong. Please try again.';
                formStatus.className = 'form-status error';
            } finally {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                setTimeout(() => {
                    formStatus.style.display = 'none';
                }, 5000);
            }
        });
    }

    // ==========================================
    // AOS ANIMATION INITIALIZATION
    // ==========================================
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            offset: 100,
            disable: 'mobile' // Disable on mobile for performance
        });
    }

    // ==========================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ==========================================
    // LAZY LOADING IMAGES - Performance Boost
    // ==========================================
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // ==========================================
    // CONSOLE EASTER EGG
    // ==========================================
    console.log(
        '%c👋 Hello Developer!',
        'font-size: 20px; font-weight: bold; color: #6366f1;'
    );
    console.log(
        '%cLooking at my code? Let\'s connect!',
        'font-size: 14px; color: #64748b;'
    );
    console.log(
        '%c📧 tahmid.islam.tamim.09@g0a53.c60',
        'font-size: 12px; color: #ec4899;'
    );

})();
// Skill Bars Animation
const skillSection = document.getElementById('skills');
let skillsAnimated = false;

function animateSkills() {
    if (skillsAnimated || !skillSection) return;
    
    const rect = skillSection.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
        const progressBars = document.querySelectorAll('.progress');
        progressBars.forEach(bar => {
            const width = bar.getAttribute('data-progress');
            setTimeout(() => {
                bar.style.width = width + '%';
            }, 100);
        });
        skillsAnimated = true;
    }
}

window.addEventListener('scroll', animateSkills);
animateSkills();
