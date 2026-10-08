const sparkleContainer = document.getElementById('sparkles');
const petalField = document.getElementById('petalField');

function createSparkles() {
  for (let i = 0; i < 18; i++) {
    const sparkle = document.createElement('span');
    sparkle.className = 'sparkle';
    sparkle.style.left = `${Math.random() * 100}%`;
    sparkle.style.top = `${Math.random() * 100}%`;
    sparkle.style.animationDelay = `${Math.random() * 2.5}s`;
    sparkle.style.animationDuration = `${1.6 + Math.random() * 2.5}s`;
    sparkleContainer.appendChild(sparkle);
  }
}

function createPetals() {
  const count = 38;
  for (let i = 0; i < count; i++) {
    const petal = document.createElement('span');
    petal.className = 'petal';
    const startX = 18 + Math.random() * 64;
    const size = 10 + Math.random() * 18;
    petal.style.left = `${startX}%`;
    petal.style.top = `${-8 - Math.random() * 16}%`;
    petal.style.width = `${size}px`;
    petal.style.height = `${size * 1.6}px`;
    petal.style.setProperty('--dx', `${(Math.random() - 0.5) * 200}px`);
    petal.style.setProperty('--rot', `${(Math.random() - 0.5) * 700}deg`);
    petal.style.animationDelay = `${Math.random() * 3.2}s`;
    petal.style.animationDuration = `${6 + Math.random() * 5}s`;
    petal.style.opacity = '0';
    petalField.appendChild(petal);
  }
}

createSparkles();
createPetals();
