const slider = document.getElementById("slider");
const envelope = document.getElementById("envelope");
const step1 = document.getElementById("step1");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const sound = document.getElementById("sound");

const noTexts = ["Нет 😈", "Ты уверена?", "Точно нет?", "Ну пожалуйста…"];
let noCounter = 0;
const minScale = 0.5;

// Отслеживаем движение ползунка
slider.addEventListener("input", () => {
  if (Number(slider.value) >= 90) { // конверт открыт
    envelope.style.display = "none";
    step1.classList.remove("hidden");
  }
});

// Функция для случайного положения кнопки "Нет"
function placeNoButtonRandom() {
  const btn = noBtn;
  const btnWidth = btn.offsetWidth;
  const btnHeight = btn.offsetHeight;

  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  const padding = 10;

  const x = Math.random() * (windowWidth - btnWidth - padding * 2) + padding;
  const y = Math.random() * (windowHeight - btnHeight - padding * 2) + padding;

  btn.style.position = "fixed";
  btn.style.left = `${x}px`;
  btn.style.top = `${y}px`;

  if (noCounter < noTexts.length) {
    btn.textContent = noTexts[noCounter];
    noCounter++;
  }

  let scale = 1 - noCounter * 0.15;
  if (scale < minScale) scale = minScale;
  btn.style.transform = `scale(${scale})`;
}

// Кнопка "Нет"
noBtn.addEventListener("click", (e) => {
  e.preventDefault();
  placeNoButtonRandom();
});

// Кнопка "Да"
yesBtn.addEventListener("click", () => {
  sound.currentTime = 0;
  sound.play().catch(() => {});
  alert("Спасибо за твой ответ! 💖");
});
