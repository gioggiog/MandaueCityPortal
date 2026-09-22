// Auto-slide every 5 seconds
setInterval(() => {
  let nextIndex = (currentIndex + 1) % slides.length;
  updateSlide(nextIndex);
}, 5000);