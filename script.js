function showPage(pageId) {
  // Hide all page containers
  const pages = ['page-home', 'page-services', 'page-about', 'page-barangays', 'page-offices', 'page-officials', 'page-hotlines', 'page-department-detail'];
  pages.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.add('hidden');
  });

  // Show selected page
  const targetPage = document.getElementById('page-' + pageId);
  if (targetPage) {
    targetPage.classList.remove('hidden');
  }

  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function openDepartment(deptName) {
  showPage('department-detail');
  document.getElementById('dept-title-header').innerText = deptName;
  document.getElementById('dept-title-bar').innerText = deptName;
}

function switchDeptTab(tab) {
  const tabs = ['org', 'charter', 'services'];
  tabs.forEach(t => {
    const tabBtn = document.getElementById('dept-tab-' + t);
    const contentEl = document.getElementById('dept-content-' + t);
    if (t === tab) {
      if (tabBtn) tabBtn.className = "dept-tab px-4 py-2 rounded-lg bg-white text-mandaue-blue font-bold text-xs sm:text-sm shadow-sm transition border border-slate-200";
      if (contentEl) contentEl.classList.remove('hidden');
    } else {
      if (tabBtn) tabBtn.className = "dept-tab px-4 py-2 rounded-lg text-slate-600 hover:text-mandaue-blue font-semibold text-xs sm:text-sm transition bg-slate-200/60 border border-transparent";
      if (contentEl) contentEl.classList.add('hidden');
    }
  });
}

function toggleMobileMenu() {
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileMenu) {
    mobileMenu.classList.toggle('hidden');
  }
}

// Carousel Slider Logic
let currentSlideIndex = 0;
const slides = document.querySelectorAll('.carousel-slide');
const dots = document.querySelectorAll('.carousel-dot');

function updateCarousel() {
  slides.forEach((slide, index) => {
    if (index === currentSlideIndex) {
      slide.classList.remove('opacity-0', 'pointer-events-none');
      slide.classList.add('opacity-100');
    } else {
      slide.classList.remove('opacity-100');
      slide.classList.add('opacity-0', 'pointer-events-none');
    }
  });
  dots.forEach((dot, index) => {
    if (index === currentSlideIndex) {
      dot.classList.remove('bg-white/60');
      dot.classList.add('bg-white', 'w-6');
    } else {
      dot.classList.remove('bg-white', 'w-6');
      dot.classList.add('bg-white/60');
    }
  });
}

function nextSlide() {
  if (slides.length > 0) {
    currentSlideIndex = (currentSlideIndex + 1) % slides.length;
    updateCarousel();
  }
}

function prevSlide() {
  if (slides.length > 0) {
    currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
    updateCarousel();
  }
}

function currentSlide(index) {
  currentSlideIndex = index;
  updateCarousel();
}

// Auto Advance Carousel Every 6 seconds
setInterval(nextSlide, 6000);

document.addEventListener("DOMContentLoaded", () => {
  updateCarousel();
});

// News Tab Switcher Logic
function switchNewsTab(tab) {
  const tabAll = document.getElementById('news-tab-all');
  const tabPao = document.getElementById('news-tab-pao');
  const tabTeam = document.getElementById('news-tab-team');
  const card1 = document.getElementById('news-card-1');
  const card2 = document.getElementById('news-card-2');

  [tabAll, tabPao, tabTeam].forEach(t => {
    if(t) t.className = "px-3 py-1.5 rounded-md text-slate-600 hover:text-mandaue-blue transition";
  });

  if (tab === 'all') {
    if(tabAll) tabAll.className = "px-3 py-1.5 rounded-md bg-mandaue-blue text-white transition shadow-sm";
    if(card1) card1.classList.remove('hidden');
    if(card2) card2.classList.remove('hidden');
  } else if (tab === 'pao') {
    if(tabPao) tabPao.className = "px-3 py-1.5 rounded-md bg-mandaue-blue text-white transition shadow-sm";
    if(card1) card1.classList.remove('hidden');
    if(card2) card2.classList.add('hidden');
  } else if (tab === 'team') {
    if(tabTeam) tabTeam.className = "px-3 py-1.5 rounded-md bg-mandaue-blue text-white transition shadow-sm";
    if(card1) card1.classList.add('hidden');
    if(card2) card2.classList.remove('hidden');
  }
}

// Scroll Fade-Up Animation Observer
document.addEventListener("DOMContentLoaded", () => {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15 // Triggers when 15% of the element is visible on screen
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.remove('opacity-0', 'translate-y-8');
        entry.target.classList.add('opacity-100', 'translate-y-0');
        observer.unobserve(entry.target); // Animate only once
      }
    });
  }, observerOptions);

  const newsSection = document.getElementById('news-fade-section');
  if (newsSection) {
    observer.observe(newsSection);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.remove('opacity-0', 'translate-y-8');
        entry.target.classList.add('opacity-100', 'translate-y-0');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe News Section
  const newsSection = document.getElementById('news-fade-section');
  if (newsSection) observer.observe(newsSection);

  // Observe Vision, Mission, Values Section
  const vmvSection = document.getElementById('vmv-fade-section');
  if (vmvSection) observer.observe(vmvSection);
});
