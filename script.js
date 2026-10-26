
const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

const lightbox = document.getElementById("lightbox");
const largePhoto = document.getElementById("largePhoto");
const photoCaption = document.getElementById("photoCaption");
const closePhoto = document.getElementById("closePhoto");

const surpriseBtn = document.getElementById("surpriseBtn");
const surpriseModal = document.getElementById("surpriseModal");
const closeModal = document.getElementById("closeModal");
const sendLove = document.getElementById("sendLove");
const hearts = document.getElementById("hearts");

// MOBILE NAVIGATION

menuBtn.addEventListener("click", function () {
  nav.classList.toggle("open");

  menuBtn.textContent = nav.classList.contains("open")
    ? "×"
    : "☰";
});

nav.querySelectorAll("a").forEach(function (link) {
  link.addEventListener("click", function () {
    nav.classList.remove("open");
    menuBtn.textContent = "☰";
  });
});

// ANIMATE ELEMENTS WHEN THEY ENTER THE SCREEN

const observer = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12
});

document.querySelectorAll(".reveal").forEach(function (element) {
  observer.observe(element);
});

// OPEN PHOTOS WHEN CLICKED

document.querySelectorAll(
  ".photo img, .story-image img, .memory img, .letter-photo img"
).forEach(function (img) {

  img.addEventListener("click", function () {
    largePhoto.src = img.src;
    largePhoto.alt = img.alt;

    photoCaption.textContent = img.alt;

    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  });

});

// CLOSE PHOTO VIEWER

function closePhotoViewer() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

closePhoto.addEventListener("click", closePhotoViewer);

lightbox.addEventListener("click", function (event) {
  if (event.target === lightbox) {
    closePhotoViewer();
  }
});

// OPEN THE LOVE SURPRISE

surpriseBtn.addEventListener("click", function () {
  surpriseModal.classList.add("open");
  surpriseModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
});

// CLOSE THE SURPRISE

function closeSurprise() {
  surpriseModal.classList.remove("open");
  surpriseModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

closeModal.addEventListener("click", closeSurprise);

surpriseModal.addEventListener("click", function (event) {
  if (event.target === surpriseModal) {
    closeSurprise();
  }
});

// CREATE FLOATING HEARTS

function createHearts() {
  const symbols = ["♥", "♡", "❤", "💕", "✦"];

  for (let i = 0; i < 28; i++) {
    const heart = document.createElement("span");

    heart.classList.add("heart-particle");

    heart.textContent =
      symbols[Math.floor(Math.random() * symbols.length)];

    heart.style.setProperty(
      "--x",
      Math.random() * 90 + "vw"
    );

    heart.style.setProperty(
      "--y",
      45 + Math.random() * 35 + "vh"
    );

    heart.style.setProperty(
      "--drift",
      Math.random() * 180 - 90 + "px"
    );

    heart.style.setProperty(
      "--size",
      14 + Math.random() * 22 + "px"
    );

    heart.style.animationDelay =
      Math.random() * 0.4 + "s";

    hearts.appendChild(heart);

    setTimeout(function () {
      heart.remove();
    }, 2500);
  }
}

// SURPRISE BUTTON ACTION

sendLove.addEventListener("click", function () {
  createHearts();

  sendLove.textContent = "Love sent! ❤️";
});

// CLOSE WINDOWS WITH ESCAPE

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closePhotoViewer();
    closeSurprise();
  }
});
