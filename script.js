const slider = document.getElementById("slider");
const envelope = document.getElementById("envelope");
const step1 = document.getElementById("step1");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const sound = document.getElementById("sound");

const noTexts = ["Нет 😈", "Ты уверена?", "Точно нет?", "Ну пожалуйста…"];
let noCounter = 0;
const minScale = 0.5;

slider.addEventListener("input", () => {
  if (+slider.value >= 90) {
    // Скрываем конверт и показываем первый экран
    envelope.style.display = "none";
    step1.classList.remove("hidden");
  }
});

// Функция для случайного положения кнопки "Нет" по всему окну
function placeNoButtonRandom() {
  const btn = noBtn;
  const btnWidth = btn.offsetWidth;
  const btnHeight = btn.offsetHeight;

  // Размеры окна браузера
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  // Отступы, чтобы кнопка не ушла за пределы экрана
  const padding = 10;

  // Случайные координаты в пределах окна с учётом размера кнопки и отступа
  const x = Math.random() * (windowWidth - btnWidth - padding * 2) + padding;
  const y = Math.random() * (windowHeight - btnHeight - padding * 2) + padding;

  // Устанавливаем позицию и уменьшаем размер кнопки
  btn.style.position = "fixed";
  btn.style.left = `${x}px`;
  btn.style.top = `${y}px`;

  // Меняем текст кнопки по шагам
  if (noCounter < noTexts.length) {
    btn.textContent = noTexts[noCounter];
    noCounter++;
  }

  // Уменьшаем кнопку
  let scale = 1 - noCounter * 0.15;
  if (scale < minScale) scale = minScale;
  btn.style.transform = `scale(${scale})`;
}

noBtn.addEventListener("click", (e) => {
  e.preventDefault();
  placeNoButtonRandom();
});

yesBtn.addEventListener("click", () => {
  sound.currentTime = 0;
  sound.play().catch(() => {});
  alert("Спасибо за твой ответ! 💖"); // Тут ты можешь сделать следующий шаг
  // Например, открыть второе окно с видео или финальное сообщение
});
