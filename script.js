const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const step1 = document.getElementById("step1");

const step2 = document.getElementById("step2");
const yes2 = document.getElementById("yes2");
const no2 = document.getElementById("no2");

const step3 = document.getElementById("step3");

const yaySound = document.getElementById("sound");
const happyKit = document.getElementById("happyKit");

const heartsContainer = document.getElementById("hearts-container");

const noTexts = ["Нет 😈", "Ты уверена?", "Точно нет?", "Ну пожалуйста…"];
let noCounter = 0;
const minScale = 0.7;

// Функция случайного расположения кнопки "Нет" в контейнере с плавным позиционированием
function placeNoButtonRandom(btn) {
  const container = btn.parentElement;
  const containerRect = container.getBoundingClientRect();
  const btnRect = btn.getBoundingClientRect();
  const padding = 8;

  const maxX = containerRect.width - btnRect.width - padding;
  const maxY = containerRect.height - btnRect.height - padding;

  const x = Math.random() * maxX + padding / 2;
  const y = Math.random() * maxY + padding / 2;

  btn.style.position = "absolute";
  btn.style.left = x + "px";
  btn.style.top = y + "px";

  if (noCounter < noTexts.length) {
    btn.textContent = noTexts[noCounter];
    noCounter++;
  }

  // Уменьшаем кнопку "Нет" и увеличиваем "Да"
  let scaleNo = 1 - noCounter * 0.1;
  if (scaleNo < minScale) scaleNo = minScale;

  let scaleYes = 1 - (scaleNo - minScale); // Инверсия для "Да"

  btn.style.transform = `scale(${scaleNo})`;
  yesBtn.style.transform = `scale(${scaleYes})`;
}

// Обработчик кнопки "Нет" первого экрана
noBtn.addEventListener("click", e => {
  e.preventDefault();
  placeNoButtonRandom(noBtn);
});

// При нажатии "Да" первого экрана
yesBtn.addEventListener("click", () => {
  yaySound.currentTime = 0;
  yaySound.play().catch(() => {});
  step1.classList.add("hidden");
  step2.classList.remove("hidden");
  noCounter = 0; // сброс для второго этапа, если надо
});

// Обработчик кнопки "Нет" второго экрана
no2.addEventListener("click", e => {
  e.preventDefault();
  placeNoButtonRandom(no2);
});

// При нажатии "Да" второго экрана
yes2.addEventListener("click", () => {
  happyKit.currentTime = 0;
  happyKit.play().catch(() => {});
  step2.classList.add("hidden");
  step3.classList.remove("hidden");
  launchHearts();
});

// Функция салюта сердечек
function launchHearts() {
  for (let i = 0; i < 15; i++) {
    const heart = document.createElement("div");
    heart.textContent = "💖";
    heart.style.position = "absolute";
    heart.style.fontSize = `${12 + Math.random() * 20}px`;
    heart.style.left = `${50 + Math.random() * 100}px`;
    heart.style.top = `60px`;
    heart.style.opacity = 1;
    heart.style.pointerEvents = "none";
    heart.style.userSelect = "none";
    heart.style.animation = `floatUp 2s ease forwards`;
    heart.style.animationDelay = `${i * 0.1}s`;

    heartsContainer.appendChild(heart);

    setTimeout(() => {
      heartsContainer.removeChild(heart);
    }, 2000);
  }
}
