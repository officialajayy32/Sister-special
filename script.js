
const opening = document.getElementById("opening");
const website = document.getElementById("website");

const startBtn = document.getElementById("startBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

const slides = document.querySelectorAll(".slide");
const progress = document.getElementById("progress");
const slideCount = document.getElementById("slideCount");
const dotsContainer = document.getElementById("dots");

let currentSlide = 0;
const totalSlides = slides.length;

// Opening screen
startBtn.addEventListener("click", () => {
  opening.classList.add("hidden");
  website.classList.remove("hidden");
  createDots();
  updateSlide();
});

// Create navigation dots
function createDots() {
  dotsContainer.innerHTML = "";

  slides.forEach((slide, index) => {
    const dot = document.createElement("button");
    dot.className = "dot";

    dot.addEventListener("click", () => {
      currentSlide = index;
      updateSlide();
    });

    dotsContainer.appendChild(dot);
  });
}

// Update slides
function updateSlide() {
  slides.forEach((slide, index) => {
    slide.classList.toggle("active", index === currentSlide);
  });

  const dots = document.querySelectorAll(".dot");

  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === currentSlide);
  });

  prevBtn.disabled = currentSlide === 0;

  nextBtn.textContent =
    currentSlide === totalSlides - 1 ? "Restart ↻" : "Next →";

  progress.style.width =
    ((currentSlide + 1) / totalSlides) * 100 + "%";

  slideCount.textContent =
    String(currentSlide + 1).padStart(2, "0") +
    " / " +
    String(totalSlides).padStart(2, "0");
}

// Next button
nextBtn.addEventListener("click", () => {
  if (currentSlide < totalSlides - 1) {
    currentSlide++;
  } else {
    currentSlide = 0;
  }

  updateSlide();
});

// Previous button
prevBtn.addEventListener("click", () => {
  if (currentSlide > 0) {
    currentSlide--;
    updateSlide();
  }
});

// Secret message
document.getElementById("secretBtn").addEventListener("click", function () {
  const message = document.getElementById("secretMessage");

  message.classList.toggle("show");

  this.textContent = message.classList.contains("show")
    ? "Message Revealed 💗"
    : "Reveal My Message 💜";
});

// Celebration effect
document.getElementById("celebrateBtn").addEventListener("click", () => {
  for (let i = 0; i < 45; i++) {
    createParticle(true);
  }
});

// Floating particles
function createParticle(isCelebration = false) {
  const particle = document.createElement("div");
  particle.className = "sparkle";

  const normalEmojis = ["💜", "✨", "🌸", "🦋", "♡"];
  const partyEmojis = ["🎉", "💖", "✨", "🌸", "🎀"];

  const emojis = isCelebration ? partyEmojis : normalEmojis;

  particle.textContent =
    emojis[Math.floor(Math.random() * emojis.length)];

  particle.style.left = Math.random() * 100 + "vw";
  particle.style.fontSize = (12 + Math.random() * 18) + "px";
  particle.style.animationDuration =
    (isCelebration ? 2 : 5 + Math.random() * 6) + "s";

  document.getElementById("sparkles").appendChild(particle);

  setTimeout(() => {
    particle.remove();
  }, isCelebration ? 2500 : 12000);
}

// Regular background animation
setInterval(() => {
  createParticle();
}, 700);
