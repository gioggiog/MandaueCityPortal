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

function scrollToHotlines() {
  // 1. Switch back to the Home page view if on a different page
  showPage('home');

  // 2. Locate the Emergency Hotlines section and scroll smoothly to it
  setTimeout(() => {
    const hotlinesSection = document.getElementById('emergency-hotlines-section');
    if (hotlinesSection) {
      hotlinesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, 100); // Short delay ensures the home view DOM is rendered before scrolling
}

// Intersection Observer for Selected Sections Fade-Up Animation
document.addEventListener("DOMContentLoaded", function () {
  initFadeUpObserver();
});

function initFadeUpObserver() {
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.1
  };

  const fadeObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe only elements with the 'fade-up' class
  document.querySelectorAll('.fade-up').forEach(element => {
    fadeObserver.observe(element);
  });
}

function switchDeptTab(tabName) {
  // Hide all contents
  document.querySelectorAll('.dept-content').forEach(el => el.classList.add('hidden'));
  // Reset all tabs style
  document.querySelectorAll('.dept-tab').forEach(el => {
    el.classList.remove('bg-white', 'text-mandaue-blue', 'shadow-sm', 'border', 'border-slate-200');
    el.classList.add('text-slate-600', 'bg-slate-200/60', 'font-semibold');
  });

  // Show active content & style active tab
  const activeContent = document.getElementById(`dept-content-${tabName}`);
  const activeTab = document.getElementById(`dept-tab-${tabName}`);

  if (activeContent) activeContent.classList.remove('hidden');
  if (activeTab) {
    activeTab.classList.remove('text-slate-600', 'bg-slate-200/60', 'font-semibold');
    activeTab.classList.add('bg-white', 'text-mandaue-blue', 'font-bold', 'shadow-sm', 'border', 'border-slate-200');
  }
}

// Shared Citizen's Charter file for all city departments
const sharedCitizensCharterUrl = "https://drive.google.com/file/d/1ivSyy7l_4eequYi6SE4w8G2r4vu8PIRn/view?usp=sharing";

// Organizational Chart links database for all departments
const departmentOrgCharts = {
  // Initial Batch
  "Mandaue City Substance Abuse and Mental Health Services Office": "https://drive.google.com/file/d/1MBFZPHNbjLxVipHyn0vTm1TjRwb6818b/view?usp=sharing",
  "Gender and Development": "https://drive.google.com/file/d/1yvs3ORdaoL4RrrxITYi5GKMclUcKwdO_/view?usp=sharing",
  "Office of the Building Official": "https://drive.google.com/file/d/1nGjICirOXpy9mpHsVaTINV58E1rL9Psk/view?usp=sharing",
  "Mandaue City Environmental & Natural Resource Office": "https://drive.google.com/file/d/1Sk9p4kib27wkiabr3zgzUhDPhQs0ZUlI/view?usp=sharing",
  "Public Information Office": "https://drive.google.com/file/d/1ikABTZBgGQflsaO0ImI0kBVUQKzDZ38D/view?usp=sharing",
  "Office of Senior Citizens Affairs": "https://drive.google.com/file/d/19gZvYVCBRt4hPaZB0OzzH52g971Fhg77/view?usp=sharing",

  // New Batch
  "Housing and Urban Development Office": "https://drive.google.com/file/d/1d7CQEKBVOZWjRH3j_YZ8kkZDAKPIm3f5/view?usp=sharing",
  "Local Civil Registrar": "https://drive.google.com/file/d/1xg1FNgYr0_dX24R_A8tZys53YX3I5jVj/view?usp=sharing",
  "Office of Strategy Management": "https://drive.google.com/file/d/12N4ZUeZNH9qlSjNDyPF5TWCHMAPAbLN9/view?usp=sharing",
  "Traffic Enforcement Agency of Mandaue": "https://drive.google.com/file/d/1ZCHGCMkOroBstUr-y9iu7a7Rdw5WnIWV/view?usp=sharing",
  "City Vice Mayor": "https://drive.google.com/file/d/16mAYD5wE5nzQ5HVb4SbkLngQckvUBryY/view?usp=sharing",
  "City Veterinary": "https://drive.google.com/file/d/1hERS3XUyGT_NQk9pcuwG-vpjfrZgsv0Z/view?usp=sharing",
  "Department of General Services": "https://drive.google.com/file/d/11aNCf73_S2UTcgeA1PBLbIQU0gKn8wlH/view?usp=sharing",
  "City Disaster Risk Reduction Management Office": "https://drive.google.com/file/d/1yFzOc0UtYK0aEfUkIl7y0zuq59puRVEx/view?usp=sharing",
  "Mandaue City Slaughter House": "https://drive.google.com/file/d/1NQakXiIsw4x6g1Cw1ZKpvHpFb7Sf15lA/view?usp=sharing",
  "City Budget Office": "https://drive.google.com/file/d/1j_wOS_OuhVUCJqBdja_MqkhdTfy0dXGl/view?usp=sharing",
  "City Nutrition Office": "https://drive.google.com/file/d/1znKuwqyP__0SelKZPKZ9OrORI1uRqmLm/view?usp=sharing",
  "City Health Office": "https://drive.google.com/file/d/1JexIAyKyWvVcuj3RytEmeDPvqTxMjLoe/view?usp=sharing",
  "Bids and Awards Committee": "https://drive.google.com/file/d/1ABHTbgwXJG_72SppRTXfLMJ9E7ZDdher/view?usp=sharing",
  "MCCTEST": "https://drive.google.com/file/d/1WgXkW7V_RV5T42SPmqHEGgLVW8isdD_d/view?usp=sharing",
  "Public Employment Services Office": "https://drive.google.com/file/d/1A1Hp802W6RaxK3ZYu0kSI0_iG4t9HIVQ/view?usp=sharing",
  "City Planning and Development Office": "https://drive.google.com/file/d/1AwwcirdYWg_cPnjnYuvCV00Qw0vuOrlu/view?usp=sharing",
  "Mandaue Investments Promotion and Action Center": "https://drive.google.com/file/d/1VCGRphLWKt_GEiwpPJxLhGsWsvpIl0HZ/view?usp=sharing",
  "Mandaue City Youth Development Office": "https://drive.google.com/file/d/1GNb9qmzICCXf8Dk0bjwUn8QEKYnWYxSq/view?usp=sharing",
  "City Public Market": "https://drive.google.com/file/d/1K5qCgjHpg6TDr12qT4Rfi9le91V1oXe_/view?usp=sharing",
  "Mandaue City Hospital": "https://drive.google.com/file/d/1iLvWcnV3FkSDWEfWv26sVJGtGc6ezeua/view?usp=sharing",
  "City Sports Commission": "https://drive.google.com/file/d/13NhdqSp5bcCqnhxEfaw_wRc3M6Ff0zoQ/view?usp=sharing",
  "Mandaue City College": "https://drive.google.com/file/d/1ytedE3XlXGZwVLKs1TCrqb3L8Ag7Lzwv/view?usp=sharing",
  "City Cooperative Office": "https://drive.google.com/file/d/1UvgVEK1k1GWh7sB2qeD6i9yptzsaOeWz/view?usp=sharing",
  "Internal Audit Service Unit": "https://drive.google.com/file/d/17zuZAsYEs9m5pTrYl6rjNdawuFFlW0hz/view?usp=sharing",
  "City Legal Office": "https://drive.google.com/file/d/1xAsmfrPoyYfgtZYqVC8vC85fE9TvNKWQ/view?usp=sharing",
  "Mandaue City Public Library": "https://drive.google.com/file/d/1jzftUWSZBZv0Bn1g0dbs0wPWscxcfW6K/view?usp=sharing",
  "City Engineering Office": "https://drive.google.com/file/d/1D4R906BmL_F70C0qY-ZdMcTkbkFyKE_p/view?usp=sharing",
  "Human Resource Management Office": "https://drive.google.com/file/d/1j3Zu0iXKmGZVqiG3AwpMwV0akmcNmzwq/view?usp=sharing",
  "City Accounting Office": "https://drive.google.com/file/d/1fdbYMscuZmpc2ToZOaD5MRvN0bY0NsrW/view?usp=sharing",
  "City Assessor Office": "https://drive.google.com/file/d/1cOO_--xFevz49gMmEL8QsY94MFov7ibk/view?usp=sharing",
  "Business Permit and Licensing Office": "https://drive.google.com/file/d/183wdCX1Ku7RbjQ_M6PJEp3hL6u1PVF0R/view?usp=sharing",
  "Management Information Systems Office": "https://drive.google.com/file/d/1M0ogWC_Vxf7diuY6rumQI9uITA21VCjf/view?usp=sharing"
};

function openDepartment(deptName) {
  // 1. Switch to Department Detail View
  showPage('department-detail');

  // 2. Update Header & Subtitle Titles dynamically
  const headerTitle = document.getElementById('dept-title-header');
  const barTitle = document.getElementById('dept-title-bar');
  if (headerTitle) headerTitle.innerText = deptName;
  if (barTitle) barTitle.innerText = deptName;

  // 3. Set the specific Org Chart link (falls back to a default folder if any name doesn't match)
  const orgChartUrl = departmentOrgCharts[deptName] || "https://drive.google.com/drive/u/0/folders/1sL5vyEwNW86kGW6vDkGF1O0iHT6_aYpa";
  const orgBtn = document.getElementById('dept-org-pdf-link');
  if (orgBtn) {
    orgBtn.href = orgChartUrl;
  }

  // 4. Set the shared Citizen's Charter button link
  const charterBtn = document.getElementById('dept-charter-pdf-link');
  if (charterBtn) {
    charterBtn.href = sharedCitizensCharterUrl;
  }

  // 5. Default to showing the Citizen's Charter tab first
  switchDeptTab('charter');
}

  // 5. Default to showing the Citizen's Charter tab first
  switchDeptTab('charter');
}
