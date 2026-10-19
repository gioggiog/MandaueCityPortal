// ==================== NAVIGATION & PAGE ROUTING ==================== //
function showPage(pageId) {
  const pages = [
    'page-home', 
    'page-services', 
    'page-about', 
    'page-barangays', 
    'page-offices', 
    'page-officials', 
    'page-hotlines', 
    'page-department-detail', 
    'page-barangay-detail',
    'page-maps',
    'page-fulldisclosure' //
  ];
  
  pages.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.add('hidden');
  });

  const targetPage = document.getElementById('page-' + pageId);
  if (targetPage) {
    targetPage.classList.remove('hidden');
  }

  window.location.hash = pageId;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

window.addEventListener('DOMContentLoaded', () => {
  const hash = window.location.hash.replace('#', '');
  if (hash && document.getElementById('page-' + hash)) {
    showPage(hash);
  } else {
    showPage('home');
  }
  updateCarousel();
  updateClock();
  updateCalendarTodayDate();
  renderUpcomingHolidays();
  initFadeUpObserver();
});

function toggleMobileMenu() {
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileMenu) {
    mobileMenu.classList.toggle('hidden');
  }
}

// ==================== CAROUSEL SLIDER LOGIC ==================== //
let currentSlideIndex = 0;

function updateCarousel() {
  const slides = document.querySelectorAll('.carousel-slide');
  const dots = document.querySelectorAll('.carousel-dot');
  if (slides.length === 0) return;

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
  const slides = document.querySelectorAll('.carousel-slide');
  if (slides.length > 0) {
    currentSlideIndex = (currentSlideIndex + 1) % slides.length;
    updateCarousel();
  }
}

function prevSlide() {
  const slides = document.querySelectorAll('.carousel-slide');
  if (slides.length > 0) {
    currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
    updateCarousel();
  }
}

function currentSlide(index) {
  currentSlideIndex = index;
  updateCarousel();
}

setInterval(nextSlide, 6000);

// ==================== NEWS TAB SWITCHER ==================== //
function switchNewsTab(tab) {
  const tabAll = document.getElementById('news-tab-all');
  const tabPao = document.getElementById('news-tab-pao');
  const tabTeam = document.getElementById('news-tab-team');
  const card1 = document.getElementById('news-card-1');
  const card2 = document.getElementById('news-card-2');

  [tabAll, tabPao, tabTeam].forEach(t => {
    if (t) t.className = "px-3 py-1.5 rounded-md text-slate-600 hover:text-mandaue-blue transition";
  });

  if (tab === 'all') {
    if (tabAll) tabAll.className = "px-3 py-1.5 rounded-md bg-mandaue-blue text-white transition shadow-sm";
    if (card1) card1.classList.remove('hidden');
    if (card2) card2.classList.remove('hidden');
  } else if (tab === 'pao') {
    if (tabPao) tabPao.className = "px-3 py-1.5 rounded-md bg-mandaue-blue text-white transition shadow-sm";
    if (card1) card1.classList.remove('hidden');
    if (card2) card2.classList.add('hidden');
  } else if (tab === 'team') {
    if (tabTeam) tabTeam.className = "px-3 py-1.5 rounded-md bg-mandaue-blue text-white transition shadow-sm";
    if (card1) card1.classList.add('hidden');
    if (card2) card2.classList.remove('hidden');
  }
}

// ==================== FADE-UP ANIMATION OBSERVER ==================== //
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

  document.querySelectorAll('.fade-up').forEach(element => {
    fadeObserver.observe(element);
  });
}

// ==================== REAL-TIME CLOCK & CALENDAR ==================== //
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
  const clockElement = document.getElementById('real-time-clock');
  if (clockElement) {
    clockElement.textContent = now.toLocaleDateString('en-US', options);
  }
}
setInterval(updateClock, 1000);

function updateCalendarTodayDate() {
  const dateElement = document.getElementById('calendar-today-date');
  if (dateElement) {
    const now = new Date();
    const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
    dateElement.textContent = now.toLocaleDateString('en-US', options);
  }
}

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
  today.setHours(0, 0, 0, 0);

  const upcoming = phHolidays.filter(holiday => new Date(holiday.date) >= today);

  if (upcoming.length === 0) {
    container.innerHTML = `<p class="text-xs text-slate-500 col-span-2">No more upcoming national holidays for this year.</p>`;
    return;
  }

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

function scrollToHotlines() {
  showPage('home');
  setTimeout(() => {
    const hotlinesSection = document.getElementById('emergency-hotlines-section');
    if (hotlinesSection) {
      hotlinesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, 100);
}

// ==================== DEPARTMENT VIEWS & TABS ==================== //
function switchDeptTab(tabName) {
  document.querySelectorAll('.dept-content').forEach(el => el.classList.add('hidden'));
  document.querySelectorAll('.dept-tab').forEach(el => {
    el.classList.remove('bg-white', 'text-mandaue-blue', 'shadow-sm', 'border', 'border-slate-200');
    el.classList.add('text-slate-600', 'bg-slate-200/60', 'font-semibold');
  });

  const activeContent = document.getElementById(`dept-content-${tabName}`);
  const activeTab = document.getElementById(`dept-tab-${tabName}`);

  if (activeContent) activeContent.classList.remove('hidden');
  if (activeTab) {
    activeTab.classList.remove('text-slate-600', 'bg-slate-200/60', 'font-semibold');
    activeTab.classList.add('bg-white', 'text-mandaue-blue', 'font-bold', 'shadow-sm', 'border', 'border-slate-200');
  }
}

const sharedCitizensCharterUrl = "https://drive.google.com/file/d/1ivSyy7l_4eequYi6SE4w8G2r4vu8PIRn/view?usp=sharing";

const departmentOrgCharts = {
  "Mandaue City Substance Abuse and Mental Health Services Office": "https://drive.google.com/file/d/1MBFZPHNbjLxVipHyn0vTm1TjRwb6818b/view?usp=sharing",
  "Gender and Development": "https://drive.google.com/file/d/1yvs3ORdaoL4RrrxITYi5GKMclUcKwdO_/view?usp=sharing",
  "Office of the Building Official": "https://drive.google.com/file/d/1nGjICirOXpy9mpHsVaTINV58E1rL9Psk/view?usp=sharing",
  "Mandaue City Environmental & Natural Resource Office": "https://drive.google.com/file/d/1Sk9p4kib27wkiabr3zgzUhDPhQs0ZUlI/view?usp=sharing",
  "Public Information Office": "https://drive.google.com/file/d/1ikABTZBgGQflsaO0ImI0kBVUQKzDZ38D/view?usp=sharing",
  "Office of Senior Citizens Affairs": "https://drive.google.com/file/d/19gZvYVCBRt4hPaZB0OzzH52g971Fhg77/view?usp=sharing",
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
  showPage('department-detail');

  const headerTitle = document.getElementById('dept-title-header');
  const barTitle = document.getElementById('dept-title-bar');
  if (headerTitle) headerTitle.innerText = deptName;
  if (barTitle) barTitle.innerText = deptName;

  const orgChartUrl = departmentOrgCharts[deptName];
  const orgBtn = document.getElementById('dept-org-pdf-link');
  const orgNoLinkMsg = document.getElementById('dept-org-missing-msg');

  if (orgChartUrl) {
    if (orgBtn) {
      orgBtn.href = orgChartUrl;
      orgBtn.style.display = 'inline-flex';
    }
    if (orgNoLinkMsg) orgNoLinkMsg.classList.add('hidden');
  } else {
    if (orgBtn) {
      orgBtn.style.display = 'none';
    }
    if (orgNoLinkMsg) orgNoLinkMsg.classList.remove('hidden');
  }

  const charterBtn = document.getElementById('dept-charter-pdf-link');
  if (charterBtn) {
    charterBtn.href = sharedCitizensCharterUrl;
  }

  switchDeptTab('org');
}

// ==================== COMPLETE MANDAUE CITY BARANGAY DATA (ALL 27 BARANGAYS) ==================== //
const barangayData = {
  "Alang-alang": {
    history: "<strong>Alang-alang.</strong> Old Cebuano for <em>ylang-ylang</em>. It got its name from its closeness to the town center, Poblacion or Centro. The name from the Visayan denotes middling distance from one point to the other. Before it had become an independent sitio, it was at the boundary of barangays Ibabao and Opao. When substantial population could justify its separation, people who came from there began to refer to it as \"<em>Alang-alang sa Ibabao ug sa Opao</em>\" (somewhere between Ibabao and Opao), which would later be contracted to \"Alang-alang\".",
    captain: "Go, Jesse James L.",
    councilors: [
      "Alimpangog, Dennis V.",
      "Cuizon, Jeric Mikhail",
      "Saladaga, Amedello",
      "Sanchez, Myles Arri",
      "Cortes, Kristian P.",
      "Jundos, Joseph R.",
      "Soco, Genaro C. Jr."
    ],
    skChairman: "Soco, Gabrielle Val T.",
    skCouncilors: [
      "Ortega, Marjorie Rose",
      "Cuizon, Luther Ian F.",
      "Sumalinog, Ivan P.",
      "Sayson, Justine Y.",
      "Opura, Leandro",
      "Nieves, Jan Michael B.",
      "Basaca, Ritz Eal"
    ],
    directUrl: "https://maps.app.goo.gl/bqGH6aYesDnv3R8P9"
  },
  "Bakilid": {
    history: "<strong>Bakilid.</strong> The people who lived in this place called it bakilid for its very steep topography, as opposed to a gently rolling terrain of a hill. “Diha’s dapit sa bakilid nga bungtod” (near the very steep hill) was how they would locate their village. Mrs. Corazon B. Ruelan and her group spearheaded the separation of Bakilid carved out from Maguikay and Tipolo in the 1970s. She became the first Barangay Captain of Bakilid. The steep topography can still be discerned along A.S. Fortuna street.",
    captain: "Lumapas, Roy C.",
    councilors: [
      "Flores, Samuel S.",
      "Lumapas, James Martin U.",
      "Baretto, Gloria G.",
      "Seno, Pablito S.",
      "Orlanes, Restituto A.",
      "Petancio, Jose J."
    ],
    skChairman: "Ardon, Janelle O.",
    skCouncilors: [
      "Avila, Edsel John",
      "Ruizo, Shaira",
      "Perez, Beatrice O.",
      "Estrera, Erika Mae",
      "Soroño, Jhon Mike",
      "Pilapil, Allyssa Ashley",
      "Comajig, Jan Louie"
    ]
  },
  "Banilad": {
    history: "<strong>Banilad.</strong> Named after the endemic tree <em>Sterculia philippinensis</em>, locally known as Banilad. Spanish-era accounts recall a farmer replying \"banilad\" when asked for the name of the place, assuming the explorer was asking about the shade tree he was resting under. The tree's bark fiber was historically used as a substitute for artwork brushes and chewed for medicinal purposes.",
    captain: "Yap, Greg B.",
    councilors: [
      "Baga, Alexis A.",
      "Saberon, Leo B.",
      "Seno, Harold D.",
      "Gabuya, Edgar M.",
      "Oporto, Antonieta S.",
      "Ouano, Rudolfo B.",
      "Buenavista, Doris Y."
    ],
    skChairman: "Omolon, Margut Ann",
    skCouncilors: [
      "Seno, Shiera",
      "Cabellon, Zylle",
      "Oporto, Clyde",
      "Caballes, Kevin",
      "Buenavista, Estelito",
      "Azura, Christian",
      "Talle, Charisse"
    ]
  },
  "Basak": {
    history: "<strong>Basak.</strong> Derived from the Cebuano word for wet or swampy land (<em>basakan</em>). In early times, water abounded even during droughts, making it an ideal wet cultivation area for rice, <em>tangkong</em> (swamp cabbage), and livestock fodder. The contraction from \"Didto’s basakan nga dapit\" led to the name Basak.",
    captain: "Diano, Felipe M.",
    councilors: [
      "Franza, Junrel D.",
      "Catayas, Roberta G.",
      "Gocotano, Mary Jean M.",
      "Escoton, Herminio I.",
      "Dayanan, Vicente C.",
      "Franza, Flordelisa L.",
      "Escoton, Milagros G."
    ],
    skChairman: "Macasero, Gwyneth",
    skCouncilors: [
      "Franza, Joseph",
      "Ortega, April Marie",
      "Jemina, Kimberly Joe",
      "Nario, Jairo",
      "Aligno, Ritchelle Honey",
      "Mantalaba, Rose Ann",
      "Villacampa, Ray Ann"
    ]
  },
  "Cabancalan": {
    history: "<strong>Cabancalan.</strong> Named after the <em>bangcal</em> or Leichhardt trees (<em>Nauclea orientalis</em>) that once surrounded a mossy 20-foot deep spring cave called \"Bito\". Farmers resting under these trees when asked where they were would say \"Diha ra gyud sa may ka bancal-an\". Cabancalan was established as a barrio as early as 1602.",
    captain: "Remedio, Francis Karlo C.",
    councilors: [
      "Bellen, Jonathan R.",
      "Adolfo, Glen C.",
      "Remedio, Irish Dwight L.",
      "Borbajo, Marck Philippe C.",
      "Ceniza, Jose Jefferson C.",
      "Remedio, Luke R."
    ],
    skChairman: "Adolfo, Daniella",
    skCouncilors: [
      "Remedio, Chenny",
      "Millor, Quennie",
      "Neis, Zara Amira",
      "Oliveros, Kirstine",
      "Bangquerigo, MJ-Jean",
      "Gellanga, Jefferson"
    ]
  },
  "Cambaro": {
    history: "<strong>Cambaro.</strong> Derived from the practice of early residents borrowing items and money, referred to in English as \"Come and borrow\" or \"Can borrow\" (<em>makahulam</em>). Formerly a sitio of Looc, Cambaro was formally created as an independent barangay in 1969 when Mandaue was preparing for cityhood chartering.",
    captain: "Cañete, Maricar S.",
    councilors: [
      "Almodiel, Junil A.",
      "Alindajao, Wernher Yul S.",
      "Alindajao, Erwin C.",
      "Heyrosa, Rico A.",
      "Quino, Daniel Jr. A.",
      "Omolon, Hernan F.",
      "Salazar, Nera B."
    ],
    skChairman: "Antigua, Charles Louie",
    skCouncilors: [
      "Lumapas, Trixie",
      "Ejares, Ken Angela",
      "Oncenes, Charlie L.",
      "Cortes, Adrian Matthew",
      "Branzuela, Julia Rae G.",
      "Parba, Chaela Marie A.",
      "Macalolo-oy, Kyle Jasper Q."
    ]
  },
  "Canduman": {
    history: "<strong>Canduman.</strong> Traces back to a wealthy and generous landowner named Duman (or Do Oman) who helped residents survive the great famine of 1842. People traveling to his vast agricultural lands would say \"Kang Do Oman\" or \"Do Oman's place\", which morphed into Canduman during American registration.",
    captain: "Borbajo, Dante A.",
    councilors: [
      "Jabas, Leo C.",
      "Mangubat, Alden E.",
      "Zanoria, Dalmacio S.",
      "Comiso, Doris A.",
      "Antolijao, Wendell P.",
      "Zanoria, Adele C.",
      "Toring, Mardonia P."
    ],
    skChairman: "Asibuque, Kyla Marie B.",
    skCouncilors: [
      "Beldad, Romel",
      "Pradilla, Danamar D.",
      "Polison, Abegail P.",
      "Bacaron, Astir Sheery",
      "Bathan, Christian Philip",
      "Salandron, Kaylle M.",
      "Melendres, Kian A."
    ]
  },
  "Casili": {
    history: "<strong>Casili.</strong> Named after the creek bisecting Mandaue and Consolacion where freshwater eels (<em>kasili</em>) were abundant. Alternative historical records note it was derived from <em>sili</em> (chili peppers) growing plentifully in the area. Casili has been documented as a distinct barrio since at least 1868.",
    captain: "Santillana, Robert S.",
    councilors: [
      "Seno, Lourde Mae S.",
      "Cabatingan, Edwin T.",
      "Libardo, Randolf S.",
      "Valle, Dennis M.",
      "Isok, John Paul T.",
      "Monsanto, Charlie M.",
      "Gerona, Inocencia C."
    ],
    skChairman: "Nerona, Aaliyah Mei T.",
    skCouncilors: [
      "Santillana, Stephany S.",
      "Romero, Cesar Junior S. III",
      "Quiño, Kyla Shane N.",
      "Heyrana, Alyssa Mae S.",
      "Cabisan, Joyce Anne B.",
      "Panangin, Pearl Noelle E.",
      "Dela Vega, John Paul S."
    ]
  },
  "Casuntingan": {
    history: "<strong>Casuntingan.</strong> Named after the wild medicinal plant <em>Sunting</em> or <em>Asunting</em> (<em>Cassia alata Linn</em>) that grew abundantly in the area. Early elders used the prefix \"Ka\" to designate the area (\"Ka-suntingan\") to distinguish it from the neighboring bangkal groves of Cabancalan.",
    captain: "Ranile, Jose Ronnie S.",
    councilors: [
      "Del Castillo, Louie S.",
      "Ale, Amelia B.",
      "Monsanto, Jesus Edward P.",
      "Cortes, Eriberto D.",
      "Baclaan, Caroline C.",
      "Vega, Marcial S.",
      "Albaño, Alfonso Jr. S."
    ],
    skChairman: "Martinez, Jose C.",
    skCouncilors: [
      "Arranchado, Gryka Krissen A.",
      "Torion, Niño",
      "Sanchez, John Arvin",
      "Trapero, Chenie",
      "Cantalejo, Marjorie",
      "Balatayo, Vince Silver",
      "Pareja, Shanil Louise"
    ]
  },
  "Centro (Poblacion)": {
    history: "<strong>Centro.</strong> The historic town center of Mandaue where St. Joseph Parish was founded in the 17th century. It served as the central meeting place (\"sentro\") for community gatherings, civic governance, trade, and politics. In 1937, the municipal hall and public plaza were established here.",
    captain: "Cortes, Ignacio G. II",
    councilors: [
      "Latonio, Eric P.",
      "Alesna, David Jim M.",
      "Seno, Ira Noemi N.",
      "Heyrosa, Alexander Joshua P.",
      "Pesons, Carlo D.",
      "Taghoy, Chona D."
    ],
    skChairman: "Malig-on, Bianca Leighne A.",
    skCouncilors: [
      "Mañago, Joseph G.",
      "Andales, Melord Kent M.",
      "Espinosa, John Kyle G.",
      "Ehurango, Samantha T.",
      "Batulan, Jancris A.",
      "Arlan, Mary Odette Y."
    ]
  },
  "Cubacub": {
    history: "<strong>Cubacub.</strong> Takes its name from the Cebuano word <em>cubcub</em> (to dig/excavate), referring to the massive earthworks and road cutting operations commissioned by Mayor Demetrio Cortes in the mid-1960s to connect the once-isolated hinterland to H. Abellana Street.",
    captain: "Borbajo, Alex V.",
    councilors: [
      "Vega, Celso B.",
      "Sicad, Aserio B.",
      "Bihag, Arpie Pol C.",
      "Gogo, Sherwin O.",
      "Alivio, Elsa J.",
      "Alivio, Emmanuel A."
    ],
    skChairman: "Agbon, Lovely Mae B.",
    skCouncilors: [
      "Borbajo, Niña Hope",
      "Bontuyan, Glenn Harvey B.",
      "Flores, Michael Y.",
      "Vega, Jay Calvin",
      "Borbajo, Amiel Rufaus",
      "Nuñez Jr., Vianney Sepe",
      "Ancajas, Marco"
    ]
  },
  "Guizo": {
    history: "<strong>Guizo.</strong> Local lore tells of a laborer carrying white clay earth (<em>giso</em>) who misunderstood a Spaniard's question regarding the location's name and answered \"Giso\". Another account attributes the name to the <em>Gisok</em> or Balau Red tree (<em>Shorea guiso</em>) which grew plentifully in the area.",
    captain: "Neri Sr., Jesus C.",
    councilors: [
      "Capacite, Arnulfo S.",
      "Bejo, Jesus A.",
      "Espina, Lydia C.",
      "Flores, Pureza T.",
      "Carba, Shiela Paz E.",
      "Marababol, Alenton G.",
      "Seno, Art-Wen C."
    ],
    skChairman: "Marababol, Sophia Jane C.",
    skCouncilors: [
      "Arceo, Mariell N.",
      "Lanza, Christine Deah M.",
      "Batulan, Melvin",
      "Lapiña, Sophia C.",
      "Musa, Aiza U.",
      "Porlas, John Ivan C.",
      "Estrobo, Ronan Khen M."
    ]
  },
  "Ibabao-Estancia": {
    history: "<strong>Ibabao-Estancia.</strong> Formed by merging Ibabao (meaning \"upper part\", referring to its position north of Centro) and Estancia (meaning \"residence/ranch\", historically linked to a land grant donated to the Jesuits in 1599).",
    captain: "Echavez, Romulo P. Jr.",
    councilors: [
      "Soco, Jose Wendell L.",
      "Cabahug, Abner Lou S.",
      "Ygay, Eric Bernard S.",
      "Ouano, Alfredo C.",
      "Del Mar, Arcille E.",
      "Quimque, Noel F.",
      "Villamor, Marcos C. Jr."
    ],
    skChairman: "Tinio, Genesis Q.",
    skCouncilors: [
      "Obenza, Glaizza Mae P.",
      "Lepiten, Nico",
      "Mendoza, Jian D.",
      "Cortes, Margarette Justice",
      "Cortes, Johannah D.",
      "Mandawe, JM",
      "Palco, Jay Ver S."
    ]
  },
  "Jagobiao": {
    history: "<strong>Jagobiao.</strong> Derived from a combination of Cebuano words <em>Hago</em> (tiresome) and <em>Biao</em> (river). Washerwomen carrying wet laundry uphill from the deep riverbank frequently complained \"Pwerting ka hagong bi-aoa\". The moniker eventually contracted to Jagobiao.",
    captain: "Merino, Marydith M.",
    councilors: [
      "Alburo, Emilio L.",
      "Alegre, Estrella G.",
      "Godinez, Elsa J.",
      "Ledris, Lino G.",
      "Montesa, Maria Edita M.",
      "Rivera, Noel Angelo V.",
      "Lim, Elsa C."
    ],
    skChairman: "Ligaray, Ian Bruce",
    skCouncilors: [
      "Gagarani, Jericho A.",
      "Mondares, Vincent",
      "Rondina, Klendy P.",
      "Lamela, Karl Roland B.",
      "Mondejar, Shaira Mae B.",
      "Garing Jr., Joel B.",
      "Olivar, Jonas S."
    ]
  },
  "Labogon": {
    history: "<strong>Labogon.</strong> According to oral tradition, the name originates from a local seafood delicacy made from stingray (<em>pagui</em>) cooked in coconut milk (<em>tinonoan</em>), locally called <em>labog</em>. Over time, the area where people enjoyed the dish became known as Labogon.",
    captain: "Nejana, Helbert B.",
    councilors: [
      "Lloren, Reynaldo B.",
      "Gitgano, Nelson B.",
      "Suson, Renato P.",
      "Sarausad, Lyndelia",
      "Bayon-on Jr., Mariano S.",
      "Tumulak, Corazon D.",
      "Ermac, Agnes I."
    ],
    skChairman: "Mondares, Janice M.",
    skCouncilors: [
      "Fuentes, Niña Mae G.",
      "Mandaue, Jhon Mar",
      "Narra, Abigail S.",
      "Manatad, Roxanne",
      "Maluya, Christian B.",
      "Bo-oc, John Carlo C.",
      "Gumabras, Jade L."
    ]
  },
  "Looc": {
    history: "<strong>Looc.</strong> Derived from the Cebuano word <em>su-ok</em> or <em>lu-uk</em>, meaning a narrow nook or corner of land. Located at the easternmost point of Mandaue near the historic watchtower <em>Bantayan sa Hari</em>, it was historically a dense merchant and fishing enclave.",
    captain: "Cabahug, Edelito P. Jr.",
    councilors: [
      "Cabahug, Raul IV",
      "Ceniza, Goldie",
      "Flores, Christopher",
      "Ouano, Francisco",
      "Lozano, Jose Jr."
    ],
    skChairman: "Ouano, Francis Maxi N.",
    skCouncilors: [
      "Naparate, Junel",
      "Go, Jhuniel",
      "Agustin, Stanley",
      "Boc, Cherry Ann",
      "Añoza, Jasmin Hazel V.",
      "Baclohan, Swera Mae"
    ]
  },
  "Maguikay": {
    history: "<strong>Maguikay.</strong> Evolved from the Cebuano word <em>maghikay</em> (to prepare or cook delicacies). Maguikay's early residents were famous for producing Mandaue's classic delicacies such as <em>bud-bud</em>, <em>bibingka</em>, <em>puto</em>, <em>tagaktak</em>, and <em>masareal</em>.",
    captain: "Gumera, Eduardo B.",
    councilors: [
      "Omolon, Victoria C.",
      "Cabahug, Edgar S.",
      "King, Winston E.",
      "Espina, Jojie I.",
      "Menchavez, Yance L.",
      "Ceniza, Mark Joseph C."
    ],
    skChairman: "Oplado, Jacquardole T.",
    skCouncilors: [
      "Cortes, Sophia G.",
      "Judilla, Jasper",
      "Abing, Hannah L.",
      "Mangoba, Aljon B.",
      "Buante, Gewelyn Y.",
      "Cortes, Jun Glendeel",
      "Albaño, Sophia G."
    ]
  },
  "Mantuyong": {
    history: "<strong>Mantuyong.</strong> Named in honor of an early intelligent community leader named Mantu. Respected as a father figure by his people, he was given the honorific title <em>Uyong</em>. Following his death, the settlement was named Mantuyong (combining Mantu and Uyong).",
    captain: "Areopagita, Julius Ceasar L.",
    councilors: [
      "Sanchez, Joseph Bryan A.",
      "Pepito, Jose A.",
      "Ramos, Rizza P.",
      "Heyrosa, Jiovanni B.",
      "Pono, D 'Andrei Christan",
      "Batistis, Randy Dennis"
    ],
    skChairman: "Dela Rama, Daisy",
    skCouncilors: [
      "Frias, John Vincent",
      "Lopez, Carlos George",
      "Abrantes, Claire",
      "Cabrido, Nica",
      "Gonzales, Lean Louise Tyra",
      "Garciano, Rica Lyn",
      "Pepito, Honey Roseann"
    ]
  },
  "Opao": {
    history: "<strong>Opao.</strong> Derived from the Cebuano word <em>opao</em> (bare), describing the barren coastal flats devoid of vegetation during low tide. Between 1947 and 1956, Secretary Sotero Cabahug constructed the Butuanon River diversion dike, protecting Opao permanently from flash floods.",
    captain: "Dizon, Nixon T.",
    councilors: [
      "Frias, Allan B.",
      "Regudo, Rene M.",
      "Icalina, Adonis O.",
      "Macalolooy, Joannah Marie B.",
      "Naparate, Dexter P.",
      "Cuizon, Fedelis O."
    ],
    skChairman: "Semblante, Kyle Andreev H.",
    skCouncilors: [
      "Requiso, Jhon Lloyd",
      "Frias, Jaycee R.",
      "Baunsit, Mitz M.",
      "Yapha, Khayecee Marie M."
    ]
  },
  "Pagsabungan": {
    history: "<strong>Pagsabungan.</strong> Named after <em>sabung</em> (cockfighting). In early times, this venue in northern Mandaue was the primary center for game fowl breeding, training, and blade-less cockfights, drawing enthusiasts from across Mandaue and Consolacion.",
    captain: "Suson, Asterio J.",
    councilors: [
      "Elbina, Maxima J.",
      "Montecillo, Raquel B.",
      "Yares, Elizabeth M.",
      "Goc-ong, Catalino P. Jr.",
      "Cabahug, Leonherdt John C.",
      "Booc, Ericson M."
    ],
    skChairman: "Tibon, Keith Justine A.",
    skCouncilors: [
      "Adong, Aubrey Karylle J.",
      "Enero, Janelle S.",
      "Asufra, Christian Fate M.",
      "Dizon, Jhanine C.",
      "Judilla, Karylle",
      "Rosal, Trescia C.",
      "Cescar, Marco"
    ]
  },
  "Paknaan": {
    history: "<strong>Paknaan.</strong> Traces its origin to a traditional bow-and-arrow defense weapon called <em>pana</em> used during Spanish colonial times. The area was initially known as Pana-an before evolving into Paknaan.",
    captain: "Ulgasan, Marisa Fe Tecling",
    councilors: [
      "Sanchez, Mark Anthony A.",
      "Cortes, Eric Jefferson A.",
      "Bongo, Francisco E.",
      "Mag-isa, Marilou S.",
      "Diano, Ariel Ian M.",
      "Mangubat Sr., Diosdado G."
    ],
    skChairman: "Jumao-as, Fleuritz Gayle T.",
    skCouncilors: [
      "Tecling, Kyla R.",
      "Diano, Darvin Judilla",
      "Diano, Adrian L.",
      "Basaca, Troy Joshua A.",
      "Arnado, Joshuel M.",
      "Bongo, John Henry D.",
      "Bantilan, Jeffrey A."
    ]
  },
  "Subangdaku": {
    history: "<strong>Subangdaku.</strong> Derived from the Cebuano phrase <em>suba nga daku</em> (big river). Local legend tells of a traveler who lost his way in the lush jungle and described his origin near the wide Butuanon river mouth. Established as an official barrio in 1918.",
    captain: "Manatad, Ramonita R.",
    councilors: [
      "Ouano, Edgar R.",
      "Albaño, Benedicto R.",
      "Manatad, Ernie N.",
      "Del Mar, Sylvie C.",
      "Colina, Glen T.",
      "Tecson, Rene C.",
      "Luchavez Jr., Santiago N."
    ],
    skChairman: "Dy, Robeanne",
    skCouncilors: [
      "Bartolini, Franceil",
      "Tecson, Kassandra Miles",
      "Osabel, Hanah Marie",
      "Hong, Mark Joseph",
      "Ponce, Rhay Mar",
      "Roble, Vincent",
      "Estabillo, Jellus"
    ]
  },
  "Tabok": {
    history: "<strong>Tabok.</strong> Named after the Cebuano word <em>tabok</em> (to cross over). Located at the northern bank of the Butuanon River, residents in early times had to cross the river on foot before bridges were built.",
    captain: "Tarriman, Dario S.",
    councilors: [
      "Vega, Julieto M.",
      "Suico, Edgar C.",
      "Cabatingan, Viel T.",
      "Cortes, Nestor C.",
      "Rosal, Emiliano M.",
      "Rivera, Elmer T.",
      "Tarriman Jr. Tranquilino S."
    ],
    skChairman: "Perez, Christella",
    skCouncilors: [
      "Abantao, Arbel A.",
      "Avila, Raymund",
      "Mendoza, Arianna Renee",
      "Monguez, Shane Ann",
      "Garcia, Mariel",
      "Alcos, Karylle Mae C.",
      "Malingin, Harvey C."
    ]
  },
  "Tawason": {
    history: "<strong>Tawason.</strong> Named after the abundance of <em>tawas</em> (alum crystals) that were once harvested directly from the ground for medicinal, antiseptic, and deodorizing uses before natural reserves were depleted.",
    captain: "Bordario, Glenn S.",
    councilors: [
      "Arcilla, Chris Andrey I.",
      "Loyola, Jovelyn A.",
      "Bilocura, Roselyn B.",
      "Tibon, Rico H.",
      "Tibon, Roberto V. Jr.",
      "Heyrana, Wenjay C.",
      "Seno, Dulcisima Q."
    ],
    skChairman: "Sungahid, Jes Vincent A.",
    skCouncilors: [
      "Arcilla, Khyce T.",
      "Arcilla, Jhon Khenjie T.",
      "Dabalos, Kent S.",
      "Mendoza, Crissa Jane S.",
      "Opo, Hanz Kristian",
      "Ducante, Jovyll A.",
      "Ibañez, Shainna Fhaye"
    ]
  },
  "Tingub": {
    history: "<strong>Tingub.</strong> Named after the accumulation (<em>tingub</em>) of converging streams from Canduman, Tabok, and Pagsabungan into a local creek. During World War II, its dense bamboo groves served as a major hiding sanctuary for evacuees.",
    captain: "Bihag, Mario B.",
    councilors: [
      "Curay, Mark P.",
      "Daso, Randy C.",
      "Ceniza, Jaime P.",
      "Antolihao, Jose C.",
      "Ouano, Oliver C.",
      "Bihag, Ariel J.",
      "Saraosos Jr., Buenaventura R."
    ],
    skChairman: "Jayme, Kate Francis B.",
    skCouncilors: [
      "Dabon, Dwight Kent",
      "Paway, Faith Geralyn P.",
      "Ouano, Sean Dominique R.",
      "Castro, Bea B.",
      "Capol, Ella Jean T.",
      "Ates, Jeselle Mae",
      "Ylanan, Trisha Mae D."
    ]
  },
  "Tipolo": {
    history: "<strong>Tipolo.</strong> Named after the imposing groves of Tipolo trees (<em>Artocarpus bancoi</em>) that once grew around a popular fresh spring where locals gathered to bathe and do laundry along the old railway line.",
    captain: "Villanueva, Restituto",
    councilors: [
      "Alimpangog, Ramon V.",
      "Villanueva, Procopio R.",
      "Paciencia, Sercia M.",
      "Grafe, Kevin Djon J.",
      "Cortes, Jessica C.",
      "Retuya, Brendo M.",
      "Cuizon, Philip Richard J. II."
    ],
    skChairman: "Jayme, Rodnie B.",
    skCouncilors: [
      "Cuizon, Pearl Andrea A.",
      "Bernales, Florey Mae",
      "Avila, Maureen G.",
      "Daymiel, Rey C.",
      "Bacatan, Syndy M.",
      "Sansub, Baron James",
      "Bacatan, Kenji Maurice C."
    ]
  },
  "Umapad": {
    history: "<strong>Umapad.</strong> Derived from combining <em>umahan</em> (farmlands) and <em>lapad</em> (vast). Once an uninhabited marshland called Pilapil, the area was transformed into extensive agricultural paddies, giving birth to the name Umapad.",
    captain: "Cortes, Reb V.",
    councilors: [
      "Lumapas, Libertine J.",
      "Alilin, Avelino S.",
      "Agacita, Ronnie J.",
      "Candazo, Sarah Jean C.",
      "Baylon Jr., Bernardo J.",
      "Entrampas, Josefina V.",
      "Quindao, Arlou T."
    ],
    skChairman: "Largo, Kurt Louie",
    skCouncilors: [
      "Duarte, Kyla Faith C.",
      "Alilin, Angel Kate",
      "Baclay, Marc Louie",
      "Sortones, Jemuel",
      "Abrigana, Zyrik",
      "Cortes, Chaz Stephen G.",
      "Abraham, Glazelle Anne"
    ]
  }
};

function openBarangay(brgyName) {
  showPage('barangay-detail');

  const data = barangayData[brgyName];

  // Header Title
  const header = document.getElementById('brgy-title-header');
  if (header) header.innerText = "Barangay " + brgyName;

  // History Lore Text (Enlarged inside HTML template)
  const historyEl = document.getElementById('brgy-history-text');
  if (historyEl) {
    historyEl.innerHTML = data && data.history 
      ? data.history 
      : "Historical background for this barangay is currently being updated.";
  }

  // Captain & SK Chairman
  const captainEl = document.getElementById('brgy-captain-name');
  if (captainEl) {
    captainEl.innerText = data && data.captain ? data.captain : "Information being updated.";
  }

  const skChairmanEl = document.getElementById('sk-chairman-name');
  if (skChairmanEl) {
    skChairmanEl.innerText = data && data.skChairman ? data.skChairman : "Information being updated.";
  }

  // Dynamic Map Handler
  const mapFrame = document.getElementById('brgy-map-iframe');
  const directLink = document.getElementById('brgy-map-direct-link');

  const queryEmbedUrl = `https://www.google.com/maps?q=Barangay+${encodeURIComponent(brgyName)}+Mandaue+City&output=embed`;
  
  if (mapFrame) {
    mapFrame.src = queryEmbedUrl;
  }

  if (directLink) {
    directLink.href = data && data.directUrl ? data.directUrl : `https://www.google.com/maps/search/Barangay+${encodeURIComponent(brgyName)}+Mandaue+City`;
  }

  // Render Barangay Councilors Grid (With enlarged text: text-sm sm:text-base font-bold)
  const councilGrid = document.getElementById('brgy-councilors-grid');
  if (councilGrid) {
    if (data && data.councilors && data.councilors.length > 0) {
      councilGrid.innerHTML = data.councilors.map((cName, idx) => `
        <div class="bg-slate-50 border border-slate-200 rounded-lg p-3.5 flex items-center space-x-3.5 shadow-sm">
          <span class="text-xs font-black text-slate-400 shrink-0">#${idx + 1}</span>
          <p class="text-sm sm:text-base font-bold text-slate-800">${cName}</p>
        </div>
      `).join('');
    } else {
      councilGrid.innerHTML = `<p class="text-sm text-slate-500 col-span-full">Barangay councilor list currently unavailable.</p>`;
    }
  }

  // Render SK Councilors Grid (With enlarged text: text-sm sm:text-base font-bold)
  const skCouncilGrid = document.getElementById('sk-councilors-grid');
  if (skCouncilGrid) {
    if (data && data.skCouncilors && data.skCouncilors.length > 0) {
      skCouncilGrid.innerHTML = data.skCouncilors.map((cName, idx) => `
        <div class="bg-slate-50 border border-slate-200 rounded-lg p-3.5 flex items-center space-x-3.5 shadow-sm">
          <span class="text-xs font-black text-amber-500 shrink-0">#${idx + 1}</span>
          <p class="text-sm sm:text-base font-bold text-slate-800">${cName}</p>
        </div>
      `).join('');
    } else {
      skCouncilGrid.innerHTML = `<p class="text-sm text-slate-500 col-span-full">SK councilor list currently unavailable.</p>`;
    }
  }
}

// ==================== SEARCH MODAL LOGIC ==================== //

// Indexable Portal Items Database
const portalSearchData = [
  // Barangays
  { title: "Barangay Alang-alang", category: "Barangay", action: () => openBarangay('Alang-alang') },
  { title: "Barangay Bakilid", category: "Barangay", action: () => openBarangay('Bakilid') },
  { title: "Barangay Banilad", category: "Barangay", action: () => openBarangay('Banilad') },
  { title: "Barangay Basak", category: "Barangay", action: () => openBarangay('Basak') },
  { title: "Barangay Cabancalan", category: "Barangay", action: () => openBarangay('Cabancalan') },
  { title: "Barangay Cambaro", category: "Barangay", action: () => openBarangay('Cambaro') },
  { title: "Barangay Canduman", category: "Barangay", action: () => openBarangay('Canduman') },
  { title: "Barangay Casili", category: "Barangay", action: () => openBarangay('Casili') },
  { title: "Barangay Casuntingan", category: "Barangay", action: () => openBarangay('Casuntingan') },
  { title: "Barangay Centro (Poblacion)", category: "Barangay", action: () => openBarangay('Centro (Poblacion)') },
  { title: "Barangay Cubacub", category: "Barangay", action: () => openBarangay('Cubacub') },
  { title: "Barangay Guizo", category: "Barangay", action: () => openBarangay('Guizo') },
  { title: "Barangay Ibabao-Estancia", category: "Barangay", action: () => openBarangay('Ibabao-Estancia') },
  { title: "Barangay Jagobiao", category: "Barangay", action: () => openBarangay('Jagobiao') },
  { title: "Barangay Labogon", category: "Barangay", action: () => openBarangay('Labogon') },
  { title: "Barangay Looc", category: "Barangay", action: () => openBarangay('Looc') },
  { title: "Barangay Maguikay", category: "Barangay", action: () => openBarangay('Maguikay') },
  { title: "Barangay Mantuyong", category: "Barangay", action: () => openBarangay('Mantuyong') },
  { title: "Barangay Opao", category: "Barangay", action: () => openBarangay('Opao') },
  { title: "Barangay Pagsabungan", category: "Barangay", action: () => openBarangay('Pagsabungan') },
  { title: "Barangay Paknaan", category: "Barangay", action: () => openBarangay('Paknaan') },
  { title: "Barangay Subangdaku", category: "Barangay", action: () => openBarangay('Subangdaku') },
  { title: "Barangay Tabok", category: "Barangay", action: () => openBarangay('Tabok') },
  { title: "Barangay Tawason", category: "Barangay", action: () => openBarangay('Tawason') },
  { title: "Barangay Tingub", category: "Barangay", action: () => openBarangay('Tingub') },
  { title: "Barangay Tipolo", category: "Barangay", action: () => openBarangay('Tipolo') },
  { title: "Barangay Umapad", category: "Barangay", action: () => openBarangay('Umapad') },

  // Online Services
  { title: "Business Permit & Licensing (BPLO)", category: "Online Service", url: "https://www.sites.google.com/view/bplomandaue/home" },
  { title: "Real Property Tax Assessment & Payment", category: "Online Service", url: "https://mandauecity.online/WebPortal/Register.aspx" },
  { title: "Delivery Permit Application", category: "Online Service", url: "https://sites.google.com/view/bplomandaue/services/delivery-permit" },
  { title: "Traffic Violation System (TEAM)", category: "Online Service", url: "http://team.mandauecity.ph/login.aspx" },
  { title: "Safety Seal Certification", category: "Online Service", url: "https://docs.google.com/forms/d/e/1FAIpQLSdRCrFoB--zBkwSN0fooJ1PL9koSXWO-LeK3nFJXY93cVOPnQ/viewform" },
  { title: "License to Sell/Serve Liquor", category: "Online Service", url: "https://docs.google.com/forms/d/e/1FAIpQLSd1oQ01f2FrsC9KDLQkjQlxvRUsWaeakKZYteEHDpgpQMoanA/closedform" },
  
  // Quick Navigation Pages
  { title: "City Officials Directory", category: "Navigation", action: () => showPage('officials') },
  { title: "Offices & Departments Directory", category: "Navigation", action: () => showPage('offices') },
  { title: "Interactive City Maps", category: "Navigation", action: () => showPage('maps') },
  { title: "Full Disclosure Policy Documents", category: "Navigation", action: () => showPage('fulldisclosure') },
  { title: "Emergency Hotlines", category: "Navigation", action: () => scrollToHotlines() }
];

function openSearchModal() {
  const modal = document.getElementById('search-modal');
  const input = document.getElementById('search-input');
  if (modal) {
    modal.classList.remove('hidden');
    if (input) {
      input.value = '';
      input.focus();
    }
    handleSearch(); // Reset view
  }
}

function closeSearchModal() {
  const modal = document.getElementById('search-modal');
  if (modal) modal.classList.add('hidden');
}

// Close Modal on ESC key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeSearchModal();
});

// Real-time filtering function
function handleSearch() {
  const query = document.getElementById('search-input').value.toLowerCase().trim();
  const resultsContainer = document.getElementById('search-results');

  if (!query) {
    resultsContainer.innerHTML = `<div class="text-center py-8 text-slate-400 text-sm">Type something above to search across the portal...</div>`;
    return;
  }

  const matches = portalSearchData.filter(item => item.title.toLowerCase().includes(query));

  if (matches.length === 0) {
    resultsContainer.innerHTML = `<div class="text-center py-8 text-slate-500 text-sm">No results found for "<strong>${query}</strong>".</div>`;
    return;
  }

  resultsContainer.innerHTML = matches.map((item, index) => `
    <div onclick="executeSearchResult(${index})" class="p-3 hover:bg-blue-50 rounded-lg cursor-pointer flex items-center justify-between transition group">
      <div>
        <p class="text-sm font-bold text-slate-800 group-hover:text-[#173D9A]">${item.title}</p>
        <span class="text-[10px] uppercase font-black tracking-wider text-slate-400 bg-slate-100 px-2 py-0.5 rounded">${item.category}</span>
      </div>
      <i class="fa-solid fa-arrow-right text-xs text-slate-300 group-hover:text-[#173D9A] group-hover:translate-x-1 transition-transform"></i>
    </div>
  `).join('');
  
  // Store current matches in window for index reference
  window.currentSearchMatches = matches;
}

function executeSearchResult(index) {
  const item = window.currentSearchMatches[index];
  closeSearchModal();
  if (item.action) {
    item.action();
  } else if (item.url) {
    window.open(item.url, '_blank');
  }
}
