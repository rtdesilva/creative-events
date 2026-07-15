/* ==========================================================================
   Creative Events - Interactivity & UI Controller
   Exact Replica of UI Mockup Layout & Interactions
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // Initialize premium Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // ==========================================
    // 1. Navigation Scroll Effect
    // ==========================================
    const header = document.getElementById('main-header');
    const scrollThreshold = 50;

    const handleHeaderScroll = () => {
        if (window.scrollY > scrollThreshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleHeaderScroll);
    handleHeaderScroll();


    // ==========================================
    // 2. Mobile Menu Toggle
    // ==========================================
    const menuToggle = document.getElementById('menu-toggle');
    const body = document.body;
    const navLinks = document.querySelectorAll('.nav-link');

    const toggleMobileMenu = () => {
        body.classList.toggle('mobile-menu-active');
    };

    const closeMobileMenu = () => {
        body.classList.remove('mobile-menu-active');
    };

    menuToggle.addEventListener('click', toggleMobileMenu);

    navLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });


    // ==========================================
    // 3. Active Link Observer on Scroll
    // ==========================================
    const sections = document.querySelectorAll('section[id]');
    
    const observerOptions = {
        root: null,
        rootMargin: '-30% 0px -60% 0px',
        threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });


    // ==========================================
    // 4. Showreel Video Lightbox Modal
    // ==========================================
    const showreelModal = document.getElementById('video-lightbox');
    const playShowreelBtn = document.getElementById('play-showreel-btn');
    const closeShowreelBtn = document.getElementById('close-lightbox-btn');
    const playPauseBtn = document.getElementById('modal-play-pause');
    const progressFill = document.querySelector('.progress-bar-fill');
    const timeStamp = document.querySelector('.time-stamp');
    
    let isPlaying = true;
    let progressPercent = 30;
    let videoTimer;

    const openShowreel = () => {
        showreelModal.classList.add('active');
        body.style.overflow = 'hidden';
        startMockVideoProgress();
    };

    const closeShowreel = () => {
        showreelModal.classList.remove('active');
        body.style.overflow = 'auto';
        stopMockVideoProgress();
    };

    const startMockVideoProgress = () => {
        isPlaying = true;
        playPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
        videoTimer = setInterval(() => {
            if (isPlaying) {
                progressPercent += 0.5;
                if (progressPercent >= 100) {
                    progressPercent = 0;
                }
                progressFill.style.width = `${progressPercent}%`;
                
                const currentSeconds = Math.floor((progressPercent / 100) * 150);
                const min = Math.floor(currentSeconds / 60);
                const sec = currentSeconds % 60;
                timeStamp.textContent = `${min}:${sec < 10 ? '0' : ''}${sec} / 2:30`;
            }
        }, 300);
    };

    const stopMockVideoProgress = () => {
        clearInterval(videoTimer);
    };

    playShowreelBtn.addEventListener('click', openShowreel);
    closeShowreelBtn.addEventListener('click', closeShowreel);
    
    playPauseBtn.addEventListener('click', () => {
        isPlaying = !isPlaying;
        if (isPlaying) {
            playPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
        } else {
            playPauseBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
        }
    });

    showreelModal.addEventListener('click', (e) => {
        if (e.target === showreelModal) {
            closeShowreel();
        }
    });


    // ==========================================
    // 5. Booking Modal (Get in Touch Triggers)
    // ==========================================
    const inquiryModal = document.getElementById('inquiry-modal');
    const headerCtaBtn = document.getElementById('header-inquiry-btn');
    const ctaInquiryBtn = document.getElementById('cta-inquiry-btn');
    const viewGalleryBtn = document.getElementById('view-gallery-btn');
    const closeInquiryModalBtn = document.getElementById('close-inquiry-modal-btn');

    const openInquiryModal = () => {
        inquiryModal.classList.add('active');
        body.style.overflow = 'hidden';
    };

    const closeInquiryModal = () => {
        inquiryModal.classList.remove('active');
        if (!showreelModal.classList.contains('active')) {
            body.style.overflow = 'auto';
        }
        resetFormState(document.getElementById('modal-event-form'), document.getElementById('m-form-success-overlay'));
    };

    headerCtaBtn.addEventListener('click', openInquiryModal);
    ctaInquiryBtn.addEventListener('click', openInquiryModal);
    viewGalleryBtn.addEventListener('click', openInquiryModal); // Open form on Gallery View trigger too
    closeInquiryModalBtn.addEventListener('click', closeInquiryModal);

    inquiryModal.addEventListener('click', (e) => {
        if (e.target === inquiryModal) {
            closeInquiryModal();
        }
    });


    // ==========================================
    // 6. Form Validation & Submission
    // ==========================================
    const isValidEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };

    // Sri Lanka phone formatting checker (+94 / 07)
    const isValidPhone = (phone) => {
        const re = /^(?:\+94|0)?7[0-9]{8}$/;
        return re.test(phone.replace(/\s+/g, ''));
    };

    const validateField = (inputEl, errorEl, validatorFn, errorMsg) => {
        const value = inputEl.value.trim();
        const parent = inputEl.parentElement;
        
        if (value === '') {
            parent.classList.add('has-error');
            errorEl.textContent = 'This field is required.';
            errorEl.style.display = 'block';
            return false;
        } else if (validatorFn && !validatorFn(value)) {
            parent.classList.add('has-error');
            errorEl.textContent = errorMsg;
            errorEl.style.display = 'block';
            return false;
        } else {
            parent.classList.remove('has-error');
            errorEl.textContent = '';
            errorEl.style.display = 'none';
            return true;
        }
    };

    const resetFormState = (formEl, successOverlayEl) => {
        formEl.reset();
        const formGroups = formEl.querySelectorAll('.form-group');
        formGroups.forEach(group => group.classList.remove('has-error'));
        const errors = formEl.querySelectorAll('.form-error-msg');
        errors.forEach(err => {
            err.textContent = '';
            err.style.display = 'none';
        });
        successOverlayEl.classList.remove('active');
    };

    const modalForm = document.getElementById('modal-event-form');
    const modalSuccessOverlay = document.getElementById('m-form-success-overlay');
    const modalCloseBtn = document.getElementById('m-success-close-btn');

    modalForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const nameInput = document.getElementById('m-client-name');
        const emailInput = document.getElementById('m-client-email');
        const phoneInput = document.getElementById('m-client-phone');
        const typeInput = document.getElementById('m-event-type');

        const nameError = document.getElementById('m-name-error');
        const emailError = document.getElementById('m-email-error');
        const phoneError = document.getElementById('m-phone-error');
        const typeError = document.getElementById('m-type-error');

        const isNameValid = validateField(nameInput, nameError, null, '');
        const isEmailValid = validateField(emailInput, emailError, isValidEmail, 'Please enter a valid email address.');
        const isPhoneValid = validateField(phoneInput, phoneError, isValidPhone, 'Please enter a valid Sri Lankan phone number.');
        const isTypeValid = validateField(typeInput, typeError, null, '');

        if (isNameValid && isEmailValid && isPhoneValid && isTypeValid) {
            modalSuccessOverlay.classList.add('active');
        }
    });

    modalCloseBtn.addEventListener('click', () => {
        closeInquiryModal();
    });


    // ==========================================
    // 7. Magic Mirror Interactive Photo Booth
    // ==========================================
    const mirrorTile = document.getElementById('tile-mirror-booth');
    if (mirrorTile) {
        const mirrorPrompt = mirrorTile.querySelector('.mirror-prompt');
        const touchBtn = mirrorTile.querySelector('.mirror-touch-btn');
        const countdownLayer = mirrorTile.querySelector('.mirror-countdown-layer');
        const countdownNum = mirrorTile.querySelector('.mirror-countdown-num');
        const flashLayer = mirrorTile.querySelector('.mirror-flash-layer');
        const processingLayer = mirrorTile.querySelector('.mirror-processing-layer');
        const stripLayer = mirrorTile.querySelector('.mirror-strip-layer');
        const stripClose = mirrorTile.querySelector('.mirror-strip-close');

        const startMirrorSequence = (e) => {
            e.stopPropagation(); // Prevent trigger events bubbling up
            
            // Activate state & hide start button
            mirrorTile.classList.add('mirror-active');
            mirrorPrompt.style.opacity = '0';
            setTimeout(() => {
                mirrorPrompt.style.display = 'none';
            }, 300);

            // Start countdown sequence
            countdownLayer.style.display = 'flex';
            let count = 3;
            countdownNum.textContent = count;

            const countdownInterval = setInterval(() => {
                count--;
                if (count > 0) {
                    countdownNum.textContent = count;
                } else {
                    clearInterval(countdownInterval);
                    triggerCameraShutter();
                }
            }, 1000);
        };

        const triggerCameraShutter = () => {
            countdownLayer.style.display = 'none';
            
            // Trigger visual flash
            flashLayer.classList.add('flash-active');
            
            // Mock audio shutter click if supported (optional visual flash does most heavy lifting)
            setTimeout(() => {
                flashLayer.classList.remove('flash-active');
                showProcessingState();
            }, 500);
        };

        const showProcessingState = () => {
            processingLayer.style.display = 'flex';
            
            // Simulate photo processing/printing for 2.5 seconds
            setTimeout(() => {
                processingLayer.style.display = 'none';
                showPhotoStrip();
            }, 2500);
        };

        const showPhotoStrip = () => {
            stripLayer.style.display = 'flex';
        };

        const resetMirrorState = (e) => {
            e.stopPropagation();
            
            // Hide strip layer and remove active visual classes
            stripLayer.style.display = 'none';
            mirrorTile.classList.remove('mirror-active');
            
            // Restore start prompt
            mirrorPrompt.style.display = 'flex';
            setTimeout(() => {
                mirrorPrompt.style.opacity = '1';
            }, 50);
        };

        // Attach event listeners
        touchBtn.addEventListener('click', startMirrorSequence);
        mirrorPrompt.addEventListener('click', startMirrorSequence);
        stripClose.addEventListener('click', resetMirrorState);
    }

});
