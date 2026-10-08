const imageFiles = [
  'assets/pic-1.jpg',
  'assets/pic-2.jpg',
  'assets/pic-3.jpg',
  'assets/pic-4.png',
  'assets/pic-5.jpg',
  'assets/pic-6.jpg'
];

const captions = [
  'بحبك يا حياتى',
  'بموت فيكى يا روح قلبى',
  'بعشق كل حته فيكى و كل حاجه بتعمليه',
  'i love u till the end of the world',
  'i would walk across the galaxies just to see ur face once',
  'بحبك بحبك بحبك يا حته منى'
];

const gestureTitles = [
  'Your tea, just the way you like it',
  'A little love note for your day',
  'Always reaching for your hand',
  'Saving you the sweetest last bite',
  'My hoodie and one more cuddle',
  'A goodnight kiss, every night'
];

const slides = Array.from(document.querySelectorAll('.slide'));
const lyricEl = document.getElementById('lyrics');
const captionEl = document.getElementById('caption-pill');
const togglePlayBtn = document.getElementById('togglePlay');
const nextSlideBtn = document.getElementById('nextSlide');

let currentIndex = 0;
let slideshowTimer = null;
let isPlaying = true;
let activeSlideIndex = 0;

function updateSlide(index) {
  currentIndex = (index + imageFiles.length) % imageFiles.length;

  const previousSlide = slides[activeSlideIndex];
  const nextSlide = slides[(activeSlideIndex + 1) % slides.length];

  previousSlide.classList.remove('active');
  previousSlide.setAttribute('aria-hidden', 'true');

  nextSlide.style.backgroundImage = `url("${imageFiles[currentIndex]}")`;
  nextSlide.classList.add('active');
  nextSlide.setAttribute('aria-hidden', 'false');

  activeSlideIndex = (activeSlideIndex + 1) % slides.length;

  lyricEl.textContent = captions[currentIndex];
  lyricEl.lang = [0, 1, 2, 5].includes(currentIndex) ? 'ar' : 'en';
  lyricEl.dir = lyricEl.lang === 'ar' ? 'rtl' : 'ltr';
  captionEl.textContent = gestureTitles[currentIndex];
}

function advanceSlide() {
  updateSlide(currentIndex + 1);
}

function startSlideshow() {
  isPlaying = true;
  togglePlayBtn.textContent = 'Pause';
  slideshowTimer = setInterval(advanceSlide, 6500);
}

function stopSlideshow() {
  isPlaying = false;
  togglePlayBtn.textContent = 'Play';
  clearInterval(slideshowTimer);
}

togglePlayBtn.addEventListener('click', () => {
  if (isPlaying) {
    stopSlideshow();
  } else {
    startSlideshow();
  }
});

nextSlideBtn.addEventListener('click', () => {
  advanceSlide();
});

const initialSlide = slides[0];
initialSlide.style.backgroundImage = `url("${imageFiles[0]}")`;
initialSlide.classList.add('active');
lyricEl.textContent = captions[0];
lyricEl.lang = 'ar';
lyricEl.dir = 'rtl';
captionEl.textContent = gestureTitles[0];

const secondSlide = slides[1];
secondSlide.style.backgroundImage = `url("${imageFiles[1]}")`;

startSlideshow();
