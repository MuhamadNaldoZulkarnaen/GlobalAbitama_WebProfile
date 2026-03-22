// Enhanced Mobile-First JavaScript for Construction Company Website - Complete Fixed Version

document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Menu Elements - ENHANCED VERSION
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileNav = document.getElementById('mobile-nav');
    
    console.log('Mobile Menu Button:', mobileMenuBtn); // Debug
    console.log('Mobile Nav:', mobileNav); // Debug
    
    if (mobileMenuBtn && mobileNav) {
        // Toggle Mobile Menu
        mobileMenuBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            console.log('Mobile menu button clicked'); // Debug
            
            // Toggle classes
            this.classList.toggle('active');
            mobileNav.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            if (mobileNav.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
            
            // Update aria-expanded for accessibility
            const isExpanded = this.classList.contains('active');
            this.setAttribute('aria-expanded', isExpanded);
            
            console.log('Menu active:', isExpanded); // Debug
        });

        // Close mobile menu when clicking on links
        const mobileNavLinks = document.querySelectorAll('.mobile-nav a');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenuBtn.classList.remove('active');
                mobileNav.classList.remove('active');
                document.body.style.overflow = '';
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileMenuBtn.contains(e.target) && !mobileNav.contains(e.target)) {
                mobileMenuBtn.classList.remove('active');
                mobileNav.classList.remove('active');
                document.body.style.overflow = '';
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
            }
        });
    } else {
        console.error('Mobile menu elements not found!');
        console.error('Make sure your HTML has elements with IDs: mobile-menu-btn and mobile-nav');
    }

    // Smooth Scrolling for Navigation Links
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    smoothScrollLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update active navigation
                updateActiveNav(targetId);
            }
        });
    });

    // Enhanced Header Scroll Effect
    let lastScrollTop = 0;
    const header = document.querySelector('.header');
    
    if (header) {
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Backdrop blur effect based on scroll
            if (scrollTop > 50) {
                header.style.background = 'rgba(255, 255, 255, 0.98)';
                header.style.backdropFilter = 'blur(20px)';
                header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.15)';
            } else {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
                header.style.backdropFilter = 'blur(10px)';
                header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
            }
            
            // Hide header on scroll down, show on scroll up (mobile)
            if (window.innerWidth <= 768) {
                if (scrollTop > lastScrollTop && scrollTop > 100) {
                    header.style.transform = 'translateY(-100%)';
                } else {
                    header.style.transform = 'translateY(0)';
                }
            }
            
            lastScrollTop = scrollTop;
        });
    }

    // Active Navigation Update
    function updateActiveNav(targetId) {
        const navLinks = document.querySelectorAll('.nav a, .mobile-nav a');
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === targetId) {
                link.classList.add('active');
            }
        });
    }

    // Intersection Observer for Section-based Navigation
    const sections = document.querySelectorAll('section[id]');
    const navObserverOptions = {
        rootMargin: '-50% 0px -50% 0px',
        threshold: 0
    };

    if (sections.length > 0) {
        const navObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateActiveNav('#' + entry.target.id);
                }
            });
        }, navObserverOptions);

        sections.forEach(section => navObserver.observe(section));
    }

    // Enhanced Intersection Observer for Animations
    const animationObserverOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const animationObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Remove observer after animation to improve performance
                animationObserver.unobserve(entry.target);
            }
        });
    }, animationObserverOptions);

    // Staggered Animation for Service Cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        // Set initial state
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        
        // Observe for animation
        animationObserver.observe(card);
    });

    // Staggered Animation for Project Items
    const projectItems = document.querySelectorAll('.project-item');
    projectItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'scale(0.9)';
        item.style.transition = `opacity 0.5s ease ${index * 0.05}s, transform 0.5s ease ${index * 0.05}s`;
        
        animationObserver.observe(item);
    });

    // Testimonial Cards Animation
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    testimonialCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateX(-30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.15}s, transform 0.6s ease ${index * 0.15}s`;
        
        animationObserver.observe(card);
    });

    // Project Filter Functionality (if exists)
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectGrid = document.querySelector('.projects-grid');
    
    if (filterButtons.length > 0 && projectGrid) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Filter logic would go here
                const filter = this.getAttribute('data-filter') || 'all';
                filterProjects(filter);
            });
        });
    }

    function filterProjects(filter) {
        const projectItems = document.querySelectorAll('.project-item');
        
        projectItems.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.8)';
            
            setTimeout(() => {
                if (filter === 'all' || item.classList.contains(filter)) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.style.display = 'none';
                }
            }, 300);
        });
    }

    // Enhanced Touch Feedback for Mobile
    if ('ontouchstart' in window) {
        const touchElements = document.querySelectorAll('.service-card, .cta-button, .project-item, .testimonial-card');
        
        touchElements.forEach(element => {
            element.addEventListener('touchstart', function(e) {
                this.style.transform = this.style.transform.replace('translateY(0px)', 'translateY(2px)');
                this.style.transition = 'transform 0.1s ease';
            }, { passive: true });
            
            element.addEventListener('touchend', function(e) {
                setTimeout(() => {
                    this.style.transform = this.style.transform.replace('translateY(2px)', 'translateY(0px)');
                    this.style.transition = '';
                }, 100);
            }, { passive: true });
        });
    }

    // Form Enhancement (if contact form exists)
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Add loading state
            const submitButton = this.querySelector('button[type="submit"], input[type="submit"]');
            if (submitButton) {
                const originalText = submitButton.textContent || submitButton.value;
                
                submitButton.disabled = true;
                submitButton.textContent = 'Sending...';
                submitButton.innerHTML = '<span class="loading"></span> Sending...';
                
                // Simulate form submission (replace with actual form handling)
                setTimeout(() => {
                    // Reset button
                    submitButton.disabled = false;
                    submitButton.textContent = originalText;
                    submitButton.innerHTML = originalText;
                    
                    // Show success message
                    showAlert('Message sent successfully!', 'success');
                    
                    // Reset form
                    this.reset();
                }, 2000);
            }
        });
    }

    // Alert System
    function showAlert(message, type = 'info') {
        // Remove existing alerts
        const existingAlert = document.querySelector('.alert');
        if (existingAlert) {
            existingAlert.remove();
        }
        
        // Create new alert
        const alert = document.createElement('div');
        alert.className = `alert alert-${type}`;
        alert.textContent = message;
        
        // Insert alert at top of contact form or page
        const contactSection = document.querySelector('.contact');
        if (contactSection) {
            contactSection.insertBefore(alert, contactSection.firstChild);
        } else {
            document.body.insertBefore(alert, document.body.firstChild);
        }
        
        // Auto remove alert after 5 seconds
        setTimeout(() => {
            if (alert.parentNode) {
                alert.style.opacity = '0';
                alert.style.transform = 'translateY(-20px)';
                setTimeout(() => alert.remove(), 300);
            }
        }, 5000);
    }

    // Performance: Debounced Resize Handler
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            // Recalculate layouts if needed
            if (window.innerWidth > 768) {
                // Close mobile menu if open
                if (mobileMenuBtn && mobileNav) {
                    mobileMenuBtn.classList.remove('active');
                    mobileNav.classList.remove('active');
                    document.body.style.overflow = '';
                    mobileMenuBtn.setAttribute('aria-expanded', 'false');
                }
                
                // Reset header transform
                if (header) {
                    header.style.transform = 'translateY(0)';
                }
            }
        }, 250);
    });

    // Lazy Loading for Images (if needed)
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window && lazyImages.length > 0) {
        const imageObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    }

    // Accessibility: Keyboard Navigation Enhancement
    document.addEventListener('keydown', function(e) {
        // Escape key closes mobile menu
        if (e.key === 'Escape' && mobileNav && mobileNav.classList.contains('active')) {
            mobileMenuBtn.classList.remove('active');
            mobileNav.classList.remove('active');
            document.body.style.overflow = '';
            mobileMenuBtn.focus();
        }
    });

    // Print Optimization
    window.addEventListener('beforeprint', function() {
        // Expand all collapsed content
        if (mobileNav && mobileNav.classList.contains('active')) {
            mobileNav.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Add click-to-call functionality for phone numbers
    const phoneNumbers = document.querySelectorAll('.phone-number');
    phoneNumbers.forEach(phone => {
        const phoneText = phone.textContent || phone.innerText;
        const cleanNumber = formatPhoneNumber(phoneText);
        
        if (cleanNumber) {
            phone.style.cursor = 'pointer';
            phone.addEventListener('click', function() {
                window.location.href = `tel:${cleanNumber}`;
            });
        }
    });

    // Console log for debugging (remove in production)
    console.log('🏗️ Construction Company Website Initialized');
    console.log('📱 Mobile-first enhancements loaded');
    console.log('♿ Accessibility features enabled');
    console.log('🔧 Mobile menu debug mode active');
});

// // Alternative jQuery Implementation (Backup)
// // This will run if jQuery is available and provides backup functionality
// if (typeof jQuery !== 'undefined') {
//     $(document).ready(function() {
//         console.log('jQuery version loaded as backup'); // Debug
        
//         // Backup mobile menu dengan jQuery (jika DOM method gagal)
//         $('#mobile-menu-btn').on('click', function(e) {
//             e.preventDefault();
//             console.log('jQuery mobile menu clicked');
            
//             $(this).toggleClass('active');
//             $('#mobile-nav').toggleClass('active');
            
//             if ($('#mobile-nav').hasClass('active')) {
//                 $('body').css('overflow', 'hidden');
//                 $(this).attr('aria-expanded', 'true');
//             } else {
//                 $('body').css('overflow', '');
//                 $(this).attr('aria-expanded', 'false');
//             }
//         });

//         // Close mobile menu when clicking on mobile nav links
//         $('.mobile-nav a').on('click', function() {
//             $('#mobile-menu-btn').removeClass('active');
//             $('#mobile-nav').removeClass('active');
//             $('body').css('overflow', '');
//             $('#mobile-menu-btn').attr('aria-expanded', 'false');
//         });
//     });
// }

// Utility Functions

// Throttle function for performance
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Format phone number for click-to-call
function formatPhoneNumber(phoneStr) {
    return phoneStr.replace(/\D/g, '');
}

// Additional Mobile Menu Debugging Function
function debugMobileMenu() {
    console.group('🔧 Mobile Menu Debug Info');
    console.log('Mobile Menu Button Element:', document.getElementById('mobile-menu-btn'));
    console.log('Mobile Nav Element:', document.getElementById('mobile-nav'));
    console.log('Window Width:', window.innerWidth);
    console.log('Is Mobile?', window.innerWidth <= 768);
    
    const btn = document.getElementById('mobile-menu-btn');
    const nav = document.getElementById('mobile-nav');
    
    if (btn) {
        console.log('Button Classes:', btn.className);
        console.log('Button Aria-Expanded:', btn.getAttribute('aria-expanded'));
    }
    
    if (nav) {
        console.log('Nav Classes:', nav.className);
        console.log('Nav Display Style:', window.getComputedStyle(nav).display);
        console.log('Nav Transform:', window.getComputedStyle(nav).transform);
    }
    
    console.groupEnd();
}

// Call debug function in console to troubleshoot
// debugMobileMenu();

// Window load event for final checks
window.addEventListener('load', function() {
    console.log('✅ All resources loaded');
    
    // Final check for mobile menu elements
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileNav = document.getElementById('mobile-nav');
    
    if (!mobileMenuBtn) {
        console.warn('⚠️ Mobile menu button not found! Check your HTML for id="mobile-menu-btn"');
    }
    
    if (!mobileNav) {
        console.warn('⚠️ Mobile nav not found! Check your HTML for id="mobile-nav"');
    }
    
    if (mobileMenuBtn && mobileNav) {
        console.log('✅ Mobile menu elements found and ready');
    }
});