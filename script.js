// ---------- Footer year ----------
document.getElementById('year').textContent = new Date().getFullYear();

// ---------- Mobile nav toggle ----------
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.classList.toggle('open', isOpen);
  navToggle.setAttribute('aria-expanded', isOpen);
});

navLinks.addEventListener('click', (e) => {
  if (e.target.tagName === 'A') {
    navLinks.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', false);
  }
});

// ---------- Scroll-in fade animations ----------
const fadeEls = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

fadeEls.forEach((el) => observer.observe(el));

// ---------- Testimonial carousel ----------
const track = document.getElementById('carouselTrack');
const slides = Array.from(track.children);
const dotsWrap = document.getElementById('carouselDots');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let current = 0;
let autoTimer;

slides.forEach((_, i) => {
  const dot = document.createElement('button');
  dot.className = 'dot';
  dot.setAttribute('aria-label', `Go to testimonial ${i + 1}`);
  dot.addEventListener('click', () => goToSlide(i));
  dotsWrap.appendChild(dot);
});
const dots = Array.from(dotsWrap.children);

function updateCarousel() {
  track.style.transform = `translateX(-${current * 100}%)`;
  dots.forEach((dot, i) => dot.classList.toggle('active', i === current));
}

function goToSlide(index) {
  current = (index + slides.length) % slides.length;
  updateCarousel();
  restartAutoRotate();
}

function startAutoRotate() {
  autoTimer = setInterval(() => goToSlide(current + 1), 6000);
}

function restartAutoRotate() {
  clearInterval(autoTimer);
  startAutoRotate();
}

prevBtn.addEventListener('click', () => goToSlide(current - 1));
nextBtn.addEventListener('click', () => goToSlide(current + 1));

updateCarousel();
startAutoRotate();

// ---------- Enquiry form ----------
const form = document.getElementById('enquiryForm');
const submitBtn = document.getElementById('submitBtn');
const formStatus = document.getElementById('formStatus');
const formSuccess = document.getElementById('formSuccess');

const fullNameInput = document.getElementById('fullName');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');

const fullNameError = document.getElementById('fullNameError');
const emailError = document.getElementById('emailError');
const messageError = document.getElementById('messageError');

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateForm() {
  let valid = true;

  fullNameError.textContent = '';
  emailError.textContent = '';
  messageError.textContent = '';

  if (!fullNameInput.value.trim()) {
    fullNameError.textContent = 'Please enter your name.';
    valid = false;
  }

  if (!emailInput.value.trim()) {
    emailError.textContent = 'Please enter your email.';
    valid = false;
  } else if (!EMAIL_REGEX.test(emailInput.value.trim())) {
    emailError.textContent = 'Please enter a valid email address.';
    valid = false;
  }

  if (!messageInput.value.trim()) {
    messageError.textContent = 'Please enter a message.';
    valid = false;
  }

  return valid;
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  formStatus.textContent = '';
  formStatus.classList.remove('error');

  if (!validateForm()) return;

  // Honeypot: if filled, silently drop (likely a bot)
  if (document.getElementById('_honey').value) {
    return;
  }

  const payload = {
    fullName: fullNameInput.value.trim(),
    email: emailInput.value.trim(),
    phone: document.getElementById('phone').value.trim(),
    interest: document.getElementById('interest').value,
    message: messageInput.value.trim(),
    _subject: 'New enquiry from Sterling & Vale website',
    _template: 'table',
    _captcha: 'false'
  };

  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending…';

  try {
    // FormSubmit requires a one-time activation: the first submission to this
    // address triggers a confirmation email; click the link there before the
    // form will deliver any further submissions.
    const response = await fetch('https://formsubmit.co/ajax/chiawtzee.tan@gmail.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) throw new Error('Request failed');

    form.hidden = true;
    formSuccess.hidden = false;
  } catch (err) {
    formStatus.textContent = 'Something went wrong sending your message. Please try again or email us directly.';
    formStatus.classList.add('error');
    submitBtn.disabled = false;
    submitBtn.textContent = 'Send Enquiry';
  }
});
