const imageFiles = [
  'assets/pic-1.jpg',
  'assets/pic-2.jpg',
  'assets/pic-3.jpg',
  'assets/pic-4.png',
  'assets/pic-5.jpg',
  'assets/pic-6.jpg'
];

const lyrics = [
  'أنا من غيرك',
  'معك كل حلوة',
  'أحبك أكثر من الكلمات',
  'أنت حياتي',
  'Forever us',
  'My love'
];

const slides = Array.from(document.querySelectorAll('.slide'));
const lyricEl = document.getElementById('lyrics');
const captionEl = document.getElementById('caption-pill');
const togglePlayBtn = document.getElementById('togglePlay');
const nextSlideBtn = document.getElementById('nextSlide');
const audio = document.getElementById('audioPlayer');
const songStatus = document.getElementById('songStatus');
const songFileInput = document.getElementById('songFile');

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

  lyricEl.textContent = lyrics[currentIndex % lyrics.length];
  captionEl.textContent = currentIndex === 0 ? 'Forever story' : 'Our memories';
}

function advanceSlide() {
  updateSlide(currentIndex + 1);
}

function startSlideshow() {
  isPlaying = true;
  togglePlayBtn.textContent = 'Pause';
  slideshowTimer = setInterval(advanceSlide, 4200);
}

function stopSlideshow() {
  isPlaying = false;
  togglePlayBtn.textContent = 'Play';
  clearInterval(slideshowTimer);
}

function setAudioSource() {
  songStatus.textContent = 'Waiting for song';
  audio.removeAttribute('src');
  audio.load();
}

function bindAudioEvents() {
  audio.addEventListener('play', () => {
    songStatus.textContent = 'Playing';
  });

  audio.addEventListener('pause', () => {
    if (!audio.ended) {
      songStatus.textContent = 'Paused';
    }
  });

  audio.addEventListener('error', () => {
    songStatus.textContent = 'Choose a valid song file';
  });
}

songFileInput.addEventListener('change', (event) => {
  const file = event.target.files && event.target.files[0];

  if (!file) {
    return;
  }

  const objectURL = URL.createObjectURL(file);
  audio.src = objectURL;
  audio.load();
  songStatus.textContent = 'Ready to play';
  audio.play().catch(() => {});
});

togglePlayBtn.addEventListener('click', () => {
  if (isPlaying) {
    stopSlideshow();
    if (!audio.paused) {
      audio.pause();
    }
  } else {
    startSlideshow();
    if (audio.src) {
      audio.play().catch(() => {});
    }
  }
});

nextSlideBtn.addEventListener('click', () => {
  advanceSlide();
});

const initialSlide = slides[0];
initialSlide.style.backgroundImage = `url("${imageFiles[0]}")`;
initialSlide.classList.add('active');

const secondSlide = slides[1];
secondSlide.style.backgroundImage = `url("${imageFiles[1]}")`;

startSlideshow();
bindAudioEvents();
setAudioSource();
