// === BLUE BIRD SALON - VIDEO SMOKE ANIMATION CONTROLLER ===
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎬 Blue Bird Salon - Video Smoke Animation Loading...');
    
    // Animation Elements
    const loadingSequence = document.getElementById('loadingSequence');
    const frameVoid = document.getElementById('frameVoid');
    const frameSmoke = document.getElementById('frameSmoke');
    const frameLogoReveal = document.getElementById('frameLogoReveal');
    const frameStatic = document.getElementById('frameStatic');
    const logoGlow = document.getElementById('logoGlow');
    const navbar = document.getElementById('navbar');
    const mainContent = document.getElementById('mainContent');
    const smokeVideo = document.getElementById('smokeVideo');
    
    // Precise Animation Timeline (in milliseconds)
    const TIMELINE = {
        VOID_PHASE: 0,          // 00:00:00 - The Void with spinner
        SMOKE_START: 1000,      // 00:00:01 - Video smoke begins
        LOGO_GLOW: 2000,        // 00:00:02 - Logo glow appears
        LOGO_REVEAL: 3000,      // 00:00:03 - Full logo focus
        STATIC_SCREEN: 4000,    // 00:00:04 - Black screen static
        SLIDE_UP: 6000,         // 00:00:06 - Content slide-up
        COMPLETE: 6800          // Animation complete
    };
    
    // Animation state tracking
    let animationStartTime = Date.now();
    let currentPhase = 'void';
    let videoReady = false;
    
    // Preload and setup video
    function setupSmokeVideo() {
        if (smokeVideo) {
            // Video event listeners
            smokeVideo.addEventListener('loadeddata', function() {
                console.log('🎥 Smoke video loaded successfully');
                videoReady = true;
            });
            
            smokeVideo.addEventListener('canplaythrough', function() {
                console.log('🎥 Smoke video ready to play');
                videoReady = true;
            });
            
            smokeVideo.addEventListener('error', function(e) {
                console.error('🚫 Smoke video error:', e);
                // Fallback: continue animation without video
                videoReady = false;
            });
            
            smokeVideo.addEventListener('ended', function() {
                console.log('🎥 Smoke video ended');
                // Video has finished playing
            });
            
            // Set video properties
            smokeVideo.muted = true;
            smokeVideo.playsInline = true;
            smokeVideo.preload = 'auto';
            
            // Try to load the video
            smokeVideo.load();
        }
    }
    
    // Initialize the frame-by-frame animation
    function initFrameByFrameAnimation() {
        console.log('🎬 Starting Frame-by-Frame Video Sequence');
        
        // Hide main content initially
        mainContent.style.display = 'none';
        mainContent.classList.remove('show');
        
        // Make sure loading sequence is visible
        loadingSequence.style.display = 'block';
        loadingSequence.style.opacity = '1';
        
        // Setup video first
        setupSmokeVideo();
        
        // Start the precise timeline
        executeAnimationTimeline();
    }
    
    // Execute the precise animation timeline
    function executeAnimationTimeline() {
        
        // PHASE 0: THE VOID (00:00:00)
        setTimeout(() => {
            console.log('🎬 Phase 0: The Void');
            currentPhase = 'void';
            activateFrame(frameVoid);
            deactivateFrames([frameSmoke, frameLogoReveal, frameStatic]);
            
            // Ensure navbar is transparent for dark background
            navbar.style.background = 'rgba(0, 0, 0, 0.6)';
        }, TIMELINE.VOID_PHASE);
        
        // PHASE 1: VIDEO SMOKE BEGINS (00:00:01)
        setTimeout(() => {
            console.log('🎬 Phase 1: Video Smoke Animation');
            currentPhase = 'smoke';
            deactivateFrame(frameVoid);
            activateFrame(frameSmoke);
            
            // Start video smoke animation
            playVideoSmoke();
        }, TIMELINE.SMOKE_START);
        
        // PHASE 2: LOGO GLOW EFFECT (00:00:02)
        setTimeout(() => {
            console.log('🎬 Phase 2: Logo Glow Effect');
            if (logoGlow) {
                logoGlow.classList.add('active');
            }
        }, TIMELINE.LOGO_GLOW);
        
        // PHASE 3: FULL LOGO REVEAL (00:00:03)
        setTimeout(() => {
            console.log('🎬 Phase 3: Full Logo Focus');
            currentPhase = 'logo';
            deactivateFrame(frameSmoke);
            if (logoGlow) {
                logoGlow.classList.remove('active');
            }
            
            // Pause video
            if (smokeVideo && !smokeVideo.paused) {
                smokeVideo.pause();
            }
            
            activateFrame(frameLogoReveal);
        }, TIMELINE.LOGO_REVEAL);
        
        // PHASE 4: STATIC BLACK SCREEN (00:00:04-00:00:05)
        setTimeout(() => {
            console.log('🎬 Phase 4: Static Black Screen');
            currentPhase = 'static';
            deactivateFrame(frameLogoReveal);
            activateFrame(frameStatic);
        }, TIMELINE.STATIC_SCREEN);
        
        // PHASE 5: SLIDE-UP TRANSITION (00:00:06)
        setTimeout(() => {
            console.log('🎬 Phase 5: Slide-Up Transition');
            currentPhase = 'slideup';
            
            // Add slide-up animation class
            loadingSequence.classList.add('slide-up');
            
            // Start revealing main content
            setTimeout(() => {
                revealMainContent();
            }, 300);
            
        }, TIMELINE.SLIDE_UP);
        
        // ANIMATION COMPLETE (00:00:06.8)
        setTimeout(() => {
            console.log('🎬 Animation Complete - Initializing Dark Website');
            completeAnimationSequence();
        }, TIMELINE.COMPLETE);
    }
    
    // Play video smoke animation
    function playVideoSmoke() {
        if (smokeVideo && videoReady) {
            console.log('🎥 Playing smoke video');
            
            // Reset video to start
            smokeVideo.currentTime = 0;
            
            // Show video with fade in
            smokeVideo.style.opacity = '0';
            smokeVideo.classList.add('playing');
            
            // Play video
            const playPromise = smokeVideo.play();
            
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    // Video started playing successfully
                    console.log('🎥 Video playing successfully');
                    
                    // Fade in video
                    setTimeout(() => {
                        smokeVideo.style.opacity = '1';
                    }, 100);
                    
                }).catch(error => {
                    console.error('🚫 Video play failed:', error);
                    // Continue animation even if video fails
                });
            }
        } else {
            console.log('🎥 Video not ready, continuing animation');
            // Continue animation without video
        }
    }
    
    // Activate a specific frame
    function activateFrame(frame) {
        if (frame) {
            frame.classList.add('active');
            frame.style.opacity = '1';
            frame.style.zIndex = '100';
        }
    }
    
    // Deactivate a specific frame
    function deactivateFrame(frame) {
        if (frame) {
            frame.classList.remove('active');
            frame.style.opacity = '0';
            frame.style.zIndex = '1';
        }
    }
    
    // Deactivate multiple frames
    function deactivateFrames(frames) {
        frames.forEach(frame => {
            if (frame) {
                deactivateFrame(frame);
            }
        });
    }
    
    // Reveal main dark content
    function revealMainContent() {
        console.log('🌟 Revealing Dark Main Content');
        
        // Stop and hide video
        if (smokeVideo) {
            smokeVideo.pause();
            smokeVideo.style.opacity = '0';
            smokeVideo.classList.remove('playing');
        }
        
        // Show main content with dark theme
        mainContent.style.display = 'block';
        
        setTimeout(() => {
            mainContent.classList.add('show');
            
            // Update navbar for dark content
            navbar.style.background = 'rgba(0, 0, 0, 0.8)';
            navbar.style.backdropFilter = 'blur(15px)';
        }, 100);
        
        // Animate content sections
        animateContentSections();
    }
    
    // Animate content sections with staggered effect
    function animateContentSections() {
        const sections = mainContent.querySelectorAll('.dark-content-section');
        
        sections.forEach((section, index) => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(50px)';
            section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, index * 150);
        });
    }
    
    // Complete animation sequence and cleanup
    function completeAnimationSequence() {
        console.log('✅ Animation Sequence Complete');
        
        // Clean up video
        if (smokeVideo) {
            smokeVideo.pause();
            smokeVideo.currentTime = 0;
        }
        
        // Remove loading sequence
        if (loadingSequence) {
            loadingSequence.style.display = 'none';
            loadingSequence.remove();
        }
        
        // Initialize main website functionality
        initializeDarkWebsite();
    }
    
    // Initialize dark website functionality
    function initializeDarkWebsite() {
        console.log('🚀 Initializing Dark Theme Website');
        
        // Initialize navigation
        initDarkNavigation();
        
        // Initialize forms
        initDarkContactForm();
        
        // Initialize scroll effects
        initDarkScrollEffects();
        
        // Initialize mobile optimizations
        initMobileOptimizations();
        
        // Initialize interactive elements
        initInteractiveElements();
    }
    
    // === DARK NAVIGATION SYSTEM ===
    function initDarkNavigation() {
        const mobileMenu = document.getElementById('mobile-menu');
        const navMenu = document.getElementById('nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');
        
        // Mobile menu toggle
        if (mobileMenu && navMenu) {
            mobileMenu.addEventListener('click', function() {
                mobileMenu.classList.toggle('active');
                navMenu.classList.toggle('active');
                
                // Prevent body scroll when menu is open
                document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
            });
        }
        
        // Close mobile menu on link click and smooth scroll
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Close mobile menu
                if (mobileMenu && navMenu) {
                    mobileMenu.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.style.overflow = 'auto';
                }
                
                // Smooth scroll to section
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - navbar.offsetHeight;
                    smoothScrollTo(offsetTop, 900);
                }
            });
        });
        
        // Update active navigation on scroll
        window.addEventListener('scroll', throttle(updateActiveNavigation, 100));
    }
    
    // Update active navigation highlighting
    function updateActiveNavigation() {
        const sections = document.querySelectorAll('.dark-content-section[id]');
        const scrollPos = window.scrollY + navbar.offsetHeight + 50;
        const navLinks = document.querySelectorAll('.nav-link');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const correspondingNavLink = document.querySelector(`a[href="#${sectionId}"]`);
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (correspondingNavLink) {
                    correspondingNavLink.classList.add('active');
                }
            }
        });
    }
    
    // === DARK CONTACT FORM ===
    function initDarkContactForm() {
        const contactForm = document.getElementById('contactForm');
        
        if (!contactForm) return;
        
        // Form input animations
        const formInputs = contactForm.querySelectorAll('input, textarea');
        formInputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', function() {
                if (!this.value.trim()) {
                    this.parentElement.classList.remove('focused');
                }
            });
            
            // Check if input has value on load
            if (input.value.trim()) {
                input.parentElement.classList.add('focused');
            }
        });
        
        // Form submission
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            
            // Validation
            if (!name || name.length < 2) {
                showDarkNotification('Please enter your full name', 'error');
                return;
            }
            
            if (!email || !isValidEmail(email)) {
                showDarkNotification('Please enter a valid email address', 'error');
                return;
            }
            
            if (!message || message.length < 10) {
                showDarkNotification('Please provide more details in your message', 'error');
                return;
            }
            
            // Submit form
            const submitButton = contactForm.querySelector('.dark-submit-btn');
            const originalText = submitButton.textContent;
            
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            try {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 2000));
                
                showDarkNotification(`Thank you ${name}! We'll contact you within 2 hours.`, 'success');
                contactForm.reset();
                
                // Reset form labels
                const formGroups = contactForm.querySelectorAll('.dark-form-group');
                formGroups.forEach(group => {
                    group.classList.remove('focused');
                });
                
            } catch (error) {
                showDarkNotification('Error sending message. Please try again.', 'error');
            } finally {
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }
        });
    }
    
    // === DARK SCROLL EFFECTS ===
    function initDarkScrollEffects() {
        // Navbar scroll effects
        window.addEventListener('scroll', throttle(function() {
            const scrollTop = window.pageYOffset;
            
            if (scrollTop > 100) {
                navbar.style.background = 'rgba(0, 0, 0, 0.95)';
                navbar.style.backdropFilter = 'blur(20px)';
            } else {
                navbar.style.background = 'rgba(0, 0, 0, 0.8)';
                navbar.style.backdropFilter = 'blur(15px)';
            }
        }, 100));
        
        // Intersection Observer for dark theme animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };
        
        const fadeInObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    fadeInObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        // Observe elements for animations
        const animateElements = document.querySelectorAll(`
            .dark-service-card,
            .dark-gallery-item,
            .dark-contact-item,
            .dark-feature-item
        `);
        
        animateElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(40px)';
            el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            fadeInObserver.observe(el);
        });
    }
    
    // === INTERACTIVE ELEMENTS ===
    function initInteractiveElements() {
        // CTA button interactions
        const ctaButtons = document.querySelectorAll('.luxury-cta-primary, .luxury-cta-secondary');
        
        ctaButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                // Create ripple effect
                createRippleEffect(e, this);
                
                // Navigate to contact section
                setTimeout(() => {
                    const contactSection = document.getElementById('contact');
                    if (contactSection) {
                        const offsetTop = contactSection.offsetTop - navbar.offsetHeight;
                        smoothScrollTo(offsetTop, 900);
                    }
                }, 200);
            });
        });
        
        // Card hover effects
        const cards = document.querySelectorAll('.dark-service-card, .dark-gallery-item, .dark-contact-item');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-8px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
    }
    
    // === MOBILE OPTIMIZATIONS ===
    function initMobileOptimizations() {
        // Touch feedback for mobile
        const touchElements = document.querySelectorAll('button, .dark-service-card, .dark-gallery-item');
        
        touchElements.forEach(element => {
            element.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.98)';
            });
            
            element.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 150);
            });
        });
        
        // Handle viewport changes
        window.addEventListener('resize', debounce(function() {
            const mobileMenu = document.getElementById('mobile-menu');
            const navMenu = document.getElementById('nav-menu');
            
            if (mobileMenu && navMenu && window.innerWidth > 768) {
                mobileMenu.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        }, 250));
    }
    
    // === UTILITY FUNCTIONS ===
    
    // Smooth scrolling
    function smoothScrollTo(targetY, duration) {
        const startY = window.pageYOffset;
        const distance = targetY - startY;
        const startTime = performance.now();
        
        function scrollAnimation(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function
            const ease = progress < 0.5 
                ? 4 * progress * progress * progress 
                : (progress - 1) * (2 * progress - 2) * (2 * progress - 2) + 1;
            
            window.scrollTo(0, startY + distance * ease);
            
            if (progress < 1) {
                requestAnimationFrame(scrollAnimation);
            }
        }
        
        requestAnimationFrame(scrollAnimation);
    }
    
    // Email validation
    function isValidEmail(email) {
        const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        return emailRegex.test(email);
    }
    
    // Dark theme notification system
    function showDarkNotification(message, type = 'info') {
        const existingNotifications = document.querySelectorAll('.dark-notification');
        existingNotifications.forEach(notification => notification.remove());
        
        const notification = document.createElement('div');
        notification.className = `dark-notification ${type}`;
        
        const icons = {
            success: 'fas fa-check-circle',
            error: 'fas fa-exclamation-triangle',
            info: 'fas fa-info-circle'
        };
        
        notification.innerHTML = `
            <i class="${icons[type] || icons.info}"></i>
            <span>${message}</span>
            <button class="dark-notification-close">&times;</button>
        `;
        
        // Add dark notification styles
        if (!document.querySelector('#dark-notification-styles')) {
            const notificationStyles = `
                .dark-notification {
                    position: fixed;
                    top: 100px;
                    right: 2rem;
                    background: rgba(30, 42, 58, 0.95);
                    backdrop-filter: blur(15px);
                    border: 1px solid rgba(212, 175, 55, 0.3);
                    padding: 1.2rem 1.8rem;
                    border-radius: 15px;
                    box-shadow: 0 8px 30px rgba(0,0,0,0.4);
                    z-index: 10000;
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    max-width: 400px;
                    font-size: 0.95rem;
                    font-weight: 500;
                    animation: slideInDarkNotification 0.5s ease-out;
                    color: rgba(255, 255, 255, 0.9);
                }
                
                .dark-notification.success {
                    border-left: 4px solid #10b981;
                }
                
                .dark-notification.error {
                    border-left: 4px solid #ef4444;
                }
                
                .dark-notification.info {
                    border-left: 4px solid #3b82f6;
                }
                
                .dark-notification i {
                    font-size: 1.2rem;
                    color: #d4af37;
                }
                
                .dark-notification-close {
                    background: none;
                    border: none;
                    font-size: 1.5rem;
                    cursor: pointer;
                    color: rgba(255, 255, 255, 0.7);
                    margin-left: auto;
                    transition: color 0.3s ease;
                }
                
                .dark-notification-close:hover {
                    color: #d4af37;
                }
                
                @keyframes slideInDarkNotification {
                    from {
                        opacity: 0;
                        transform: translateX(100%);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }
                
                @media (max-width: 768px) {
                    .dark-notification {
                        top: 80px;
                        left: 1rem;
                        right: 1rem;
                        max-width: none;
                    }
                }
            `;
            
            const style = document.createElement('style');
            style.id = 'dark-notification-styles';
            style.textContent = notificationStyles;
            document.head.appendChild(style);
        }
        
        // Close functionality
        const closeButton = notification.querySelector('.dark-notification-close');
        closeButton.addEventListener('click', function() {
            notification.style.animation = 'slideInDarkNotification 0.3s ease-out reverse';
            setTimeout(() => notification.remove(), 300);
        });
        
        document.body.appendChild(notification);
        
        // Auto remove
        setTimeout(() => {
            if (notification.parentElement) {
                notification.style.animation = 'slideInDarkNotification 0.3s ease-out reverse';
                setTimeout(() => notification.remove(), 300);
            }
        }, type === 'success' ? 5000 : 3000);
    }
    
    // Create ripple effect
    function createRippleEffect(event, element) {
        const ripple = document.createElement('div');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: radial-gradient(circle, rgba(212,175,55,0.4) 0%, transparent 70%);
            border-radius: 50%;
            pointer-events: none;
            z-index: 100;
            animation: rippleExpand 0.6s ease-out;
        `;
        
        const rippleCSS = `
            @keyframes rippleExpand {
                0% {
                    transform: scale(0);
                    opacity: 1;
                }
                100% {
                    transform: scale(2);
                    opacity: 0;
                }
            }
        `;
        
        if (!document.querySelector('#ripple-styles')) {
            const style = document.createElement('style');
            style.id = 'ripple-styles';
            style.textContent = rippleCSS;
            document.head.appendChild(style);
        }
        
        element.style.position = element.style.position || 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    }
    
    // Throttle function
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }
    
    // Debounce function
    function debounce(func, wait) {
        let timeout;
        return function executedFunction() {
            const context = this;
            const args = arguments;
            const later = function() {
                timeout = null;
                func.apply(context, args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // === SKIP ANIMATION (ESC key or accessibility) ===
    function skipAnimation() {
        console.log('⏭️ Skipping Animation');
        
        // Stop video
        if (smokeVideo) {
            smokeVideo.pause();
            smokeVideo.currentTime = 0;
        }
        
        if (loadingSequence) {
            loadingSequence.style.display = 'none';
        }
        
        mainContent.style.display = 'block';
        mainContent.classList.add('show');
        navbar.style.background = 'rgba(0, 0, 0, 0.8)';
        
        initializeDarkWebsite();
    }
    
    // Skip animation on ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && currentPhase !== 'complete') {
            skipAnimation();
        }
    });
    
    // Check for reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        skipAnimation();
        return;
    }
    
    // === INITIALIZE ANIMATION ===
    setTimeout(() => {
        initFrameByFrameAnimation();
    }, 150);
    
    // === ERROR HANDLING ===
    window.addEventListener('error', function(e) {
        console.error('Animation Error:', e.error);
        skipAnimation();
    });
    
    // Handle video errors specifically
    window.addEventListener('unhandledrejection', function(e) {
        if (e.reason && e.reason.name === 'NotAllowedError') {
            console.log('🎥 Video autoplay blocked, continuing animation');
            // Continue animation without video
        }
    });
    
    console.log('🎉 Blue Bird Salon - Video Smoke Animation System Loaded');
});

console.log('🌟 Blue Bird Salon - Dark Theme Premium Website Ready');
