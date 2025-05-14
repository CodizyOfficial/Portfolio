// Preloader Fade-out
    window.addEventListener('load', () => {
      const preloader = document.querySelector('.preloader');
      preloader.classList.add('fade-out');
      setTimeout(() => { preloader.style.display = 'none'; }, 500);
    });

    // Header Active on Scroll & Section Animation
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('header nav a');
    window.addEventListener('scroll', () => {
      sections.forEach(sec => {
        const top = window.scrollY;
        const offset = sec.offsetTop - 100;
        const height = sec.offsetHeight;
        const id = sec.getAttribute('id');
        if (top >= offset && top < offset + height) {
          navLinks.forEach(link => {
            link.classList.remove('active');
            document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
          });
          sec.classList.add('show-animate');
        } else {
          sec.classList.remove('show-animate');
        }
      });
      const header = document.querySelector('header');
      header.classList.toggle('active', window.scrollY > 100);
      const footer = document.querySelector('footer');
      footer.classList.toggle('show-animate', window.innerHeight + window.scrollY >= document.scrollingElement.scrollHeight);
    });

    // Mobile Menu Toggle
    const menuIcon = document.querySelector('#menu-icon');
    const navbar = document.querySelector('nav');
    menuIcon.addEventListener('click', () => {
      menuIcon.classList.toggle('bx-x');
      navbar.classList.toggle('active');
    });
    document.querySelectorAll('nav a').forEach(link => {
      link.addEventListener('click', () => {
        menuIcon.classList.remove('bx-x');
        navbar.classList.remove('active');
      });
    });

    // Theme Toggle
    const themeToggle = document.querySelector('.theme-toggle');
    const darkMode = localStorage.getItem('darkMode');
    if (darkMode === 'enabled') {
      document.body.classList.add('light-theme');
      themeToggle.querySelector('i').classList.replace('bx-moon', 'bx-sun');
    }
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('light-theme');
      if (document.body.classList.contains('light-theme')) {
        themeToggle.querySelector('i').classList.replace('bx-moon', 'bx-sun');
        localStorage.setItem('darkMode', 'enabled');
      } else {
        themeToggle.querySelector('i').classList.replace('bx-sun', 'bx-moon');
        localStorage.setItem('darkMode', 'disabled');
      }
    });

    // Form Submission Handling
    const form = document.querySelector('form');
    const alertSuccess = document.querySelector('.alert.success');
    const alertError = document.querySelector('.alert.error');
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="bx bx-loader-alt bx-spin"></i> Sending...';
      try {
        const formData = new FormData(form);
        const response = await fetch(form.action, {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' }
        });
        if (response.ok) {
          alertSuccess.style.display = 'block';
          form.reset();
          setTimeout(() => { alertSuccess.style.display = 'none'; }, 5000);
        } else {
          throw new Error('Form submission failed');
        }
      } catch (error) {
        alertError.style.display = 'block';
        setTimeout(() => { alertError.style.display = 'none'; }, 5000);
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = originalBtnText;
      }
    });

    // Initialize Particles.js
    particlesJS('particles-js', {
      "particles": {
        "number": {
          "value": 80,
          "density": { "enable": true, "value_area": 800 }
        },
        "color": { "value": "#1cade4" },
        "shape": {
          "type": "circle",
          "stroke": { "width": 0, "color": "#000000" },
          "polygon": { "nb_sides": 5 }
        },
        "opacity": {
          "value": 0.5,
          "random": false,
          "anim": { "enable": false, "speed": 1, "opacity_min": 0.1, "sync": false }
        },
        "size": {
          "value": 3,
          "random": true,
          "anim": { "enable": false, "speed": 40, "size_min": 0.1, "sync": false }
        },
        "line_linked": {
          "enable": true,
          "distance": 150,
          "color": "#1cade4",
          "opacity": 0.4,
          "width": 1
        },
        "move": {
          "enable": true,
          "speed": 2,
          "direction": "none",
          "random": false,
          "straight": false,
          "out_mode": "out",
          "bounce": false,
          "attract": { "enable": false, "rotateX": 600, "rotateY": 1200 }
        }
      },
      "interactivity": {
        "detect_on": "canvas",
        "events": {
          "onhover": { "enable": true, "mode": "grab" },
          "onclick": { "enable": true, "mode": "push" },
          "resize": true
        },
        "modes": {
          "grab": { "distance": 140, "line_linked": { "opacity": 1 } },
          "bubble": { "distance": 400, "size": 40, "duration": 2, "opacity": 8, "speed": 3 },
          "repulse": { "distance": 200, "duration": 0.4 },
          "push": { "particles_nb": 4 },
          "remove": { "particles_nb": 2 }
        }
      },
      "retina_detect": true
    });

    // ScrollReveal Animations
    const sr = ScrollReveal({ origin: 'top', distance: '80px', duration: 2000, delay: 200, reset: true });
    sr.reveal('.home-content, .heading', { origin: 'top' });
    sr.reveal('.home-img, .services-container, .portfolio-box, .contact form', { origin: 'bottom' });
    sr.reveal('.home-content h1, .about-img', { origin: 'left' });
    sr.reveal('.home-content p, .about-content', { origin: 'right' });

    // Tabs Handling for Resume Section
    const tabBtns = document.querySelectorAll('.vertical-tabs .tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    tabBtns.forEach(btn => {
      btn.addEventListener('click', function () {
        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(tc => tc.classList.remove('active'));
        this.classList.add('active');
        document.getElementById(this.dataset.tab).classList.add('active');
      });
    });

    // Load Blog Posts using JSONP
    function loadBlogPostsJSONP() {
      var callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());
      window[callbackName] = function(data) {
        if (data.feed && data.feed.entry && data.feed.entry.length > 0) {
          var blogCarousel = document.querySelector('.blog-carousel');
          data.feed.entry.forEach(function(entry) {
            var title = entry.title.$t;
            var postUrl = "#";
            if (entry.link) {
              entry.link.forEach(function(linkObj) {
                if (linkObj.rel === "alternate") {
                  postUrl = linkObj.href;
                }
              });
            }
            var coverImg = "";
            if (entry.media$thumbnail && entry.media$thumbnail.url) {
              coverImg = entry.media$thumbnail.url.replace('s72-c', 's640');
            } else {
              coverImg = "https://via.placeholder.com/600x400?text=No+Image";
            }
            var blogCard = document.createElement('a');
            blogCard.href = postUrl;
            blogCard.target = "_blank";
            blogCard.classList.add('blog-card');
            blogCard.innerHTML = `
              <img src="${coverImg}" alt="${title}" loading="lazy">
              <div class="blog-card-content">
                <h4>${title}</h4>
              </div>
            `;
            blogCarousel.appendChild(blogCard);
          });
        }
        document.body.removeChild(script);
        delete window[callbackName];
      };
      var script = document.createElement('script');
      script.src = 'https://codizy.jannat.my.id/feeds/posts/default?alt=json-in-script&callback=' + callbackName + '&max-results=10';
      document.body.appendChild(script);
    }
    loadBlogPostsJSONP();

    // Blog Carousel Auto-Slide & Navigation
    const carousel = document.querySelector('.blog-carousel');
    let slideIndex = 0;
    const visibleCards = 4;
    function autoSlide() {
      const totalCards = carousel.children.length;
      let maxIndex = totalCards - visibleCards;
      if (maxIndex < 0) maxIndex = 0;
      slideIndex = (slideIndex < maxIndex) ? slideIndex + 1 : 0;
      slideCarousel();
    }
    function slideCarousel() {
      const cardWidth = carousel.children[0].offsetWidth;
      const gap = parseFloat(getComputedStyle(carousel).gap) || 0;
      const offset = slideIndex * (cardWidth + gap);
      carousel.style.transform = `translateX(-${offset}px)`;
    }
    let autoSlideInterval = setInterval(autoSlide, 5000);
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    prevBtn.addEventListener('click', () => {
      clearInterval(autoSlideInterval);
      slideIndex = (slideIndex > 0) ? slideIndex - 1 : Math.max(carousel.children.length - visibleCards, 0);
      slideCarousel();
      autoSlideInterval = setInterval(autoSlide, 5000);
    });
    nextBtn.addEventListener('click', () => {
      clearInterval(autoSlideInterval);
      const totalCards = carousel.children.length;
      let maxIndex = totalCards - visibleCards;
      slideIndex = (slideIndex < maxIndex) ? slideIndex + 1 : 0;
      slideCarousel();
      autoSlideInterval = setInterval(autoSlide, 5000);
    });