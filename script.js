document.addEventListener('DOMContentLoaded', () => {
    const intro = document.getElementById('intro');
    const mainContent = document.getElementById('mainContent');

    // 1. Start the slide-up animation after a short delay
    setTimeout(() => {
        intro.classList.add('show-text');
    }, 500);

    // 2. After a period, fade out the entire intro screen
    setTimeout(() => {
        intro.classList.add('fade-out');
    }, 4000);

    // 3. Listen for the end of the fade-out transition
    intro.addEventListener('transitionend', (event) => {
        if (event.propertyName === 'opacity' && intro.classList.contains('fade-out')) {
            intro.style.display = 'none';
            mainContent.style.visibility = 'visible';
            
            // Now that the intro is gone, initialize the main website animations
            initMainWebsiteAnimations();
        }
    });

    // --- Main Website Animation Logic ---
    function initMainWebsiteAnimations() {
        // Scroll-to-Top Button Functionality
        const scrollTopBtn = document.getElementById('scrollTopBtn');
        window.onscroll = () => {
            if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
                scrollTopBtn.style.opacity = '1';
                scrollTopBtn.style.transform = 'scale(1)';
            } else {
                scrollTopBtn.style.opacity = '0';
                scrollTopBtn.style.transform = 'scale(0.8)';
            }
        };

        // Scroll-triggered Animations for main content
        const animatedElements = document.querySelectorAll('.scroll-animate');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });

        animatedElements.forEach(el => {
            observer.observe(el);
        });

        // Marquee infinite loop fix
        const marqueeContent = document.querySelector('.marquee-content');
        if (marqueeContent) {
            const marqueeWidth = marqueeContent.scrollWidth;
            const containerWidth = marqueeContent.parentElement.offsetWidth;

            // Duplicate the content to ensure a seamless loop
            if (marqueeWidth < containerWidth * 2) {
                marqueeContent.innerHTML += marqueeContent.innerHTML;
            }
        }

        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });
    }
});