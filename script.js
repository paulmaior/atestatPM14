const imageArrays = {
    red: [],
    blue: [],
    black: [],
    gray: [],
    white: []
};

// Create image arrays for each color
for (let i = 1; i <= 24; i++) {
    imageArrays.red.push(`red/${i}.jpg`);
    imageArrays.blue.push(`blue/${i}.jpg`);
    imageArrays.black.push(`black/${i}.jpg`);
    imageArrays.gray.push(`gray/${i}.jpg`);
    imageArrays.white.push(`white/${i}.jpg`);
}

function initializeViewer(color) {
    $('#carViewer').spritespin({
        source: imageArrays[color],
        width: 1920,
        height: 1080,
        sense: -1,
        frameTime: 60,
        animate: false,
        loop: false,
        responsive: true
    });
    
    // Update active button state
    document.querySelectorAll('.color-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.color === color);
    });
}

// Add event listeners to color buttons
document.querySelectorAll('.color-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        const color = e.target.dataset.color;
        initializeViewer(color);
    });
});

// Initialize with default color (red)
initializeViewer('red');

document.addEventListener('DOMContentLoaded', () => {
    // Car viewer initialization
    // ...existing code...

    // Navigation functionality
    const header = document.querySelector('.top-nav');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.top-nav nav');
    const sections = document.querySelectorAll('section');
    let currentSection = 0;

    // Mobile menu toggle
    mobileMenuBtn?.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        nav.classList.toggle('active');
    });

    // Navigation link handling
    document.querySelectorAll('.top-nav nav a').forEach(link => {
        link.addEventListener('click', (e) => {
            if (link.classList.contains('cta-button')) return;
            
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
                mobileMenuBtn?.classList.remove('active');
                nav.classList.remove('active');
            }
        });
    });

    // Intersection Observer for section visibility
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;
                updateActiveNavItems(sectionId);
                currentSection = Array.from(sections).indexOf(entry.target);
            }
        });
    }, {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    });

    // Observe all sections
    sections.forEach(section => observer.observe(section));

    // Update active navigation items
    function updateActiveNavItems(sectionId) {
        // Update nav links
        document.querySelectorAll('.top-nav nav a, .section-nav a').forEach(item => {
            const href = item.getAttribute('href');
            if (href === '#' + sectionId) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }

    // Handle scroll effects for header
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.pageYOffset > 50);
    });

    // Side navigation dots click handling
    document.querySelectorAll('.section-nav a').forEach(dot => {
        dot.addEventListener('click', (e) => {
            e.preventDefault();
            const targetSection = document.querySelector(dot.getAttribute('href'));
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown' && currentSection < sections.length - 1) {
            e.preventDefault();
            sections[currentSection + 1].scrollIntoView({ behavior: 'smooth' });
        } else if (e.key === 'ArrowUp' && currentSection > 0) {
            e.preventDefault();
            sections[currentSection - 1].scrollIntoView({ behavior: 'smooth' });
        }
    });

    // FAQ functionality
    document.querySelectorAll('.faq-question').forEach(button => {
        button.addEventListener('click', () => {
            const answer = button.nextElementSibling;
            button.classList.toggle('active');
            answer.classList.toggle('active');

            // Close other open FAQs
            document.querySelectorAll('.faq-answer').forEach(item => {
                if (item !== answer && item.classList.contains('active')) {
                    item.classList.remove('active');
                    item.previousElementSibling.classList.remove('active');
                }
            });
        });
    });
});