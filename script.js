(function() {
  // Smooth scroll for all anchor links with hash
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === "#" || targetId === "") return;
      const targetElem = document.querySelector(targetId);
      if (targetElem) {
        e.preventDefault();
        targetElem.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Progress bar animation on scroll (skills section)
  const progressBars = document.querySelectorAll('.progress-fill');
  let animated = false;

  function animateProgressBars() {
    if (animated) return;
    const darkSection = document.querySelector('.dark-section');
    if (darkSection) {
      const rect = darkSection.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      if (rect.top <= windowHeight - 100) {
        progressBars.forEach(bar => {
          const widthVal = bar.getAttribute('data-width');
          if (widthVal && bar.style.width !== widthVal + '%') {
            bar.style.width = widthVal + '%';
          }
        });
        animated = true;
      }
    }
  }

  // Initialize progress bars width 0 and animate on load + scroll
  window.addEventListener('scroll', animateProgressBars);
  window.addEventListener('load', () => {
    // Set initial width to 0 for all progress fills
    progressBars.forEach(bar => bar.style.width = '0%');
    // Trigger animation after a short delay to ensure layout
    setTimeout(() => {
      animateProgressBars();
    }, 200);
  });

  // Contact Form Handling with validation and simulated submission
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();

      // Validation
      if (!name || !email || !message) {
        formStatus.innerHTML = '<span style="color:#dc2626;">❌ Please fill all fields.</span>';
        return;
      }

      const emailPattern = /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/;
      if (!emailPattern.test(email)) {
        formStatus.innerHTML = '<span style="color:#dc2626;">❌ Enter a valid email address.</span>';
        return;
      }

      // Simulate successful message sending
      formStatus.innerHTML = '<span style="color:#059669;">✅ Message sent! I’ll get back to you shortly.</span>';
      contactForm.reset();

      // Clear status after 4 seconds
      setTimeout(() => {
        formStatus.innerHTML = '';
      }, 4000);
    });
  }

  // Add hover effect class consistently for glassmorphism cards
  const glassCards = document.querySelectorAll('.service-card, .testimonial-card');
  glassCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transition = 'all 0.2s ease';
    });
  });

  // Add a subtle intersection observer for additional animations if needed
  // Observe testimonial cards for fade-in (lightweight enhancement)
  const fadeElements = document.querySelectorAll('.service-card, .testimonial-card');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0px)';
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -20px 0px' });

  fadeElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(12px)';
    el.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    observer.observe(el);
  });

  // Ensure contact and hero sections are visible directly
  window.dispatchEvent(new Event('load'));
})();
