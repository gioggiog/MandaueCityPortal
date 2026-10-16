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

  // Update browser URL hash cleanly without causing a harsh jump
  window.location.hash = pageId;

  // Scroll to top smoothly
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Automatically load page based on URL hash on load or refresh
window.addEventListener('DOMContentLoaded', () => {
  const hash = window.location.hash.replace('#', '');
  if (hash && document.getElementById('page-' + hash)) {
    showPage(hash);
  } else {
    showPage('home');
  }
});

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

// Combined Scroll Fade-Up Animation Observer
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

// Real-Time Clock for Top Ticker Bar
function updateClock() {
  const now = new Date();
  const options = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric', 
    hour: '2-digit', 
    minute: '2-digit', 
    second: '2-digit', 
    hour12: true 
  };
  const formattedString = now.toLocaleDateString('en-US', options);
  const clockElement = document.getElementById('real-time-clock');
  if (clockElement) {
    clockElement.textContent = formattedString;
  }
}

// Initialize clock interval
setInterval(updateClock, 1000);
updateClock();

// Function to update real date on the Calendar section
function updateCalendarTodayDate() {
  const dateElement = document.getElementById('calendar-today-date');
  if (dateElement) {
    const now = new Date();
    const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
    dateElement.textContent = now.toLocaleDateString('en-US', options);
  }
}

// Call on page load
updateCalendarTodayDate();

// Master List of Official Philippine Holidays
const phHolidays = [
  { name: "New Year's Day", date: "2026-01-01", type: "Regular Holiday", month: "Jan", day: "01", style: "blue" },
  { name: "Mawlid / Eid milad-un-Nabi", date: "2026-08-26", type: "Observance", month: "Aug", day: "26", style: "blue" },
  { name: "National Heroes Day", date: "2026-08-31", type: "Regular Holiday", month: "Aug", day: "31", style: "blue" },
  { name: "All Saints' Day", date: "2026-11-01", type: "Special Non-Working", month: "Nov", day: "01", style: "red" },
  { name: "All Souls' Day", date: "2026-11-02", type: "Special Working", month: "Nov", day: "02", style: "red" },
  { name: "Bonifacio Day", date: "2026-11-30", type: "Regular Holiday", month: "Nov", day: "30", style: "blue" },
  { name: "Feast of the Immaculate Conception", date: "2026-12-08", type: "Special Non-Working", month: "Dec", day: "08", style: "red" },
  { name: "Christmas Eve", date: "2026-12-24", type: "Special Non-Working", month: "Dec", day: "24", style: "red" },
  { name: "Christmas Day", date: "2026-12-25", type: "Regular Holiday", month: "Dec", day: "25", style: "blue" },
  { name: "Rizal Day", date: "2026-12-30", type: "Regular Holiday", month: "Dec", day: "30", style: "blue" },
  { name: "Last Day of the Year", date: "2026-12-31", type: "Special Non-Working", month: "Dec", day: "31", style: "red" }
];

function updateCalendarTodayDate() {
  const dateElement = document.getElementById('calendar-today-date');
  if (dateElement) {
    const now = new Date();
    const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
    dateElement.textContent = now.toLocaleDateString('en-US', options);
  }
}

function renderUpcomingHolidays() {
  const container = document.getElementById('ph-holidays-list');
  if (!container) return;

  const today = new Date();
  today.setHours(0, 0, 0, 0); // Reset time to midnight for accurate date comparison

  // Filter out holidays that have already passed
  const upcoming = phHolidays.filter(holiday => {
    const holidayDate = new Date(holiday.date);
    return holidayDate >= today;
  });

  if (upcoming.length === 0) {
    container.innerHTML = `<p class="text-xs text-slate-500 col-span-2">No more upcoming national holidays for this year.</p>`;
    return;
  }

  // Render only upcoming holidays
  container.innerHTML = upcoming.map(holiday => {
    const isRed = holiday.style === 'red';
    const bgBadge = isRed ? 'bg-red-50 border-red-200 text-red-600' : 'bg-blue-50 border-blue-200 text-[#173D9A]';
    const bgBox = isRed ? 'bg-red-100 text-[#C10A20]' : 'bg-blue-100 text-[#173D9A]';

    return `
      <div class="bg-slate-50 border border-slate-200 rounded-lg p-4 flex items-start space-x-3.5 hover:shadow-md transition">
        <div class="${bgBox} font-black rounded-lg p-2.5 text-center shrink-0 w-14">
          <span class="block text-xs uppercase font-bold">${holiday.month}</span>
          <span class="block text-xl leading-none">${holiday.day}</span>
        </div>
        <div>
          <span class="text-[10px] font-bold uppercase tracking-wider ${bgBadge} border px-2 py-0.5 rounded-full inline-block">
            ${holiday.type}
          </span>
          <h4 class="text-sm md:text-base font-bold text-slate-800 mt-1">${holiday.name}</h4>
          <p class="text-xs text-slate-500 mt-0.5">National Holiday</p>
        </div>
      </div>
    `;
  }).join('');
}

// Run functions when the page finishes loading
document.addEventListener('DOMContentLoaded', () => {
  updateCalendarTodayDate();
  renderUpcomingHolidays();
});
