// Course Data - Practical DevSecOps Courses
const coursesData = [
    {
        id: 'devsecops-professional',
        title: 'DevSecOps Professional (CDP)',
        instructor: 'Practical DevSecOps',
        description: 'Practical with 100+ guided hands-on exercises in state-of-the-art online labs. Learn CI/CD pipelines, DevOps, Secure SDLC, and DevSecOps principles.',
        category: 'devsecops',
        icon: '🔒',
        originalPrice: 899,
        salePrice: 899,
        rating: 4.9,
        students: 15000,
        duration: '100+ labs',
        badge: 'BESTSELLER',
        thumbnail: 'https://via.placeholder.com/400x200/1a1a1a/ffd700?text=DevSecOps+Professional',
        partner: 'Practical DevSecOps',
        externalLink: 'https://checkout.practical-devsecops.com/'
    },
    {
        id: 'ai-security-professional',
        title: 'AI Security Professional (CAISP)',
        instructor: 'Practical DevSecOps',
        description: 'Deep understanding of AI security risks, model inversion, evasion attacks, and securing AI infrastructure with 30+ hands-on labs.',
        category: 'ai',
        icon: '🤖',
        originalPrice: 999,
        salePrice: 999,
        rating: 4.7,
        students: 6200,
        duration: '30+ labs',
        badge: 'NEW',
        thumbnail: 'https://via.placeholder.com/400x200/1a1a1a/ffd700?text=AI+Security+Professional',
        partner: 'Practical DevSecOps',
        externalLink: 'https://checkout.practical-devsecops.com/'
    },
    {
        id: 'devsecops-expert',
        title: 'DevSecOps Expert (CDE)',
        instructor: 'Practical DevSecOps',
        description: 'Advanced DevSecOps training with comprehensive coverage of security practices, automation, and compliance in modern development workflows.',
        category: 'devsecops',
        icon: '🛡️',
        originalPrice: 1199,
        salePrice: 1199,
        rating: 4.8,
        students: 8500,
        duration: '120+ labs',
        badge: 'EXPERT',
        thumbnail: 'https://via.placeholder.com/400x200/1a1a1a/ffd700?text=DevSecOps+Expert',
        partner: 'Practical DevSecOps',
        externalLink: 'https://checkout.practical-devsecops.com/'
    }
];

// DOM Elements
const coursesGrid = document.getElementById('coursesGrid');

// Particle Effect System
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random positioning
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 4 + 4) + 's';
        
        particlesContainer.appendChild(particle);
    }
}


// Course rendering with lazy loading
function renderCourses(courses = coursesData) {
    coursesGrid.innerHTML = '';
    
    if (courses.length === 0) {
        coursesGrid.innerHTML = `
            <div class="empty-state">
                <h3>📚 Courses Coming Soon!</h3>
                <p>We're curating the best IT training courses for you. Check back soon for amazing deals!</p>
            </div>
        `;
        return;
    }
    
    courses.forEach((course, index) => {
        const courseCard = document.createElement('div');
        courseCard.className = 'course-card';
        courseCard.setAttribute('data-category', course.category);
        courseCard.innerHTML = `
            <div class="course-content">
                <h3 class="course-title">${course.title}</h3>
                <p class="course-instructor">by ${course.instructor}</p>
                <p class="course-description">${course.description}</p>
                <div class="course-meta">
                    <div class="course-rating">
                        <span class="stars">${'★'.repeat(Math.floor(course.rating))}${'☆'.repeat(5 - Math.floor(course.rating))}</span>
                        <span class="rating-text">${course.rating} (${course.students.toLocaleString()} students)</span>
                    </div>
                    <div class="course-duration">${course.duration}</div>
                </div>
                <div class="course-pricing">
                    ${course.originalPrice === course.salePrice ? 
                        `<span class="sale-price">$${course.salePrice}</span>` :
                        `<span class="original-price">$${course.originalPrice}</span>
                         <span class="sale-price">$${course.salePrice}</span>
                         <span class="discount-percent">${Math.round((1 - course.salePrice / course.originalPrice) * 100)}% OFF</span>`
                    }
                </div>
                <div class="course-partner">
                    <span class="partner-name">${course.partner || 'Premium Partner'}</span>
                </div>
                <button class="get-course-btn" onclick="redirectToCourse('${course.id}')" aria-label="Get ${course.title} from ${course.partner}">
                    ${course.originalPrice === course.salePrice ? 
                        `GET COURSE - $${course.salePrice}` :
                        `GET COURSE - SAVE $${course.originalPrice - course.salePrice}`
                    }
                </button>
            </div>
        `;
        coursesGrid.appendChild(courseCard);
    });
    
    // Add scroll animations
    addScrollAnimations();
}

// Redirect to external course provider
function redirectToCourse(courseId) {
    const course = coursesData.find(c => c.id === courseId);
    if (!course) return;

    // Show loading state
    const button = event.target;
    const originalText = button.textContent;
    button.innerHTML = '<span class="loading"></span> Redirecting...';
    button.disabled = true;

    // Simulate loading delay for better UX
    setTimeout(() => {
        if (course.externalLink) {
            // For Practical DevSecOps courses, always redirect to checkout
            if (course.category === 'practical-devsecops') {
                window.open('https://checkout.practical-devsecops.com/', '_blank', 'noopener,noreferrer');
            } else {
                window.open(course.externalLink, '_blank', 'noopener,noreferrer');
            }
        } else {
            // Fallback to partner-specific URLs
            const partnerUrls = {
                'Udemy': 'https://www.udemy.com/',
                'Coursera': 'https://www.coursera.org/',
                'edX': 'https://www.edx.org/',
                'Skillshare': 'https://www.skillshare.com/',
                'LinkedIn Learning': 'https://www.linkedin.com/learning/',
                'Practical DevSecOps': 'https://checkout.practical-devsecops.com/'
            };
            const url = partnerUrls[course.partner] || 'https://www.udemy.com/';
            window.open(url, '_blank', 'noopener,noreferrer');
        }
        
        // Reset button
        button.textContent = originalText;
        button.disabled = false;
    }, 1000);
}

// Bundle deals redirect function
function addToCart(courseId) {
    // No bundles available yet
    console.log('No bundles available yet');
}




// Filter courses by category
function filterCourses(category) {
    // Update active filter button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-filter="${category}"]`).classList.add('active');
    
    if (category === 'all') {
        renderCourses();
    } else {
        const filteredCourses = coursesData.filter(course => course.category === category);
        renderCourses(filteredCourses);
    }
    
    // Smooth scroll to courses section
    document.getElementById('courses').scrollIntoView({ behavior: 'smooth' });
}

// Smooth scrolling functions
function scrollToCourses() {
    document.getElementById('courses').scrollIntoView({ behavior: 'smooth' });
}

function scrollToDeals() {
    document.getElementById('deals').scrollIntoView({ behavior: 'smooth' });
}

// Checkout function

// Search functionality
function searchCourses(query) {
    const filteredCourses = coursesData.filter(course => 
        course.title.toLowerCase().includes(query.toLowerCase()) ||
        course.instructor.toLowerCase().includes(query.toLowerCase()) ||
        course.description.toLowerCase().includes(query.toLowerCase())
    );
    renderCourses(filteredCourses);
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Add animation to elements when they come into view
function addScrollAnimations() {
    const animatedElements = document.querySelectorAll('.course-card, .category-card, .deal-card');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Newsletter subscription
function subscribeNewsletter() {
    const emailInput = document.querySelector('.newsletter input');
    const email = emailInput.value.trim();
    
    if (!email || !isValidEmail(email)) {
        alert('Please enter a valid email address');
        return;
    }

    const subscribeBtn = document.querySelector('.newsletter button');
    const originalText = subscribeBtn.textContent;
    subscribeBtn.textContent = 'Subscribing...';
    subscribeBtn.disabled = true;

    setTimeout(() => {
        alert('Thank you for subscribing! You\'ll receive our latest deals and updates.');
        emailInput.value = '';
        subscribeBtn.textContent = originalText;
        subscribeBtn.disabled = false;
    }, 1500);
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Create particle effect
    createParticles();
    
    // Render initial courses
    renderCourses();
    
    // Add scroll animations
    addScrollAnimations();
    
    // Event listeners
    
    // Newsletter subscription
    const newsletterBtn = document.querySelector('.newsletter button');
    if (newsletterBtn) {
        newsletterBtn.addEventListener('click', subscribeNewsletter);
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
    });
    
    // Header scroll effect - simplified to prevent scrolling issues
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(0, 0, 0, 0.98)';
        } else {
            header.style.background = 'rgba(0, 0, 0, 0.95)';
        }
        // Removed header hide/show animation that was causing scrolling issues
    });
    
    // Add loading states to buttons
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            if (this.classList.contains('deal-btn') || this.classList.contains('get-course-btn')) {
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 150);
            }
        });
    });
    
    // Remove parallax effect that causes scrolling issues
    // Parallax effect removed to prevent scrolling problems
    
    // Add hover effects to course cards
    const courseCards = document.querySelectorAll('.course-card');
    courseCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    
    // Lazy loading for images
    const images = document.querySelectorAll('img[loading="lazy"]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    console.log('🎉 BFCM Sale Website Loaded Successfully!');
    console.log(`📚 ${coursesData.length} courses available`);
    console.log('✅ Course marketplace ready');
    console.log('⏰ Countdown timer active');
    console.log('✨ Particle effects initialized');
});

// Utility functions
function formatPrice(price) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(price);
}

function formatNumber(num) {
    return new Intl.NumberFormat('en-US').format(num);
}

// Performance optimization
function debounce(func, wait) {
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

// Search with debounce
const debouncedSearch = debounce(searchCourses, 300);

// Add search input if needed
function addSearchFunctionality() {
    const searchHTML = `
        <div class="search-container" style="margin-bottom: 2rem; text-align: center;">
            <input type="text" id="searchInput" placeholder="Search courses..." 
                   style="padding: 1rem; border: 1px solid var(--border-gray); border-radius: 10px; 
                          background: var(--tertiary-black); color: var(--text-white); 
                          width: 100%; max-width: 400px; font-size: 1rem;">
        </div>
    `;
    
    const coursesSection = document.querySelector('.courses .container');
    const sectionHeader = coursesSection.querySelector('.section-header');
    sectionHeader.insertAdjacentHTML('afterend', searchHTML);
    
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', (e) => {
        debouncedSearch(e.target.value);
    });
}

// Initialize search functionality
setTimeout(addSearchFunctionality, 1000);
