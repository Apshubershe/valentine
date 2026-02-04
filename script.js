// Конверт - улучшенная анимация
const envelopeSlider = document.getElementById("envelopeSlider");
const envelopeFlap = document.getElementById("envelopeFlap");
const envelopeText = document.getElementById("envelopeText");
const envelopeContainer = document.getElementById("envelopeContainer");
const sliderHint = document.getElementById("sliderHint");
const step1 = document.getElementById("step1");

envelopeSlider.addEventListener("input", () => {
  const value = Number(envelopeSlider.value);
  
  // Прогресс-бар в ползунке
  envelopeSlider.style.setProperty('--progress', value + '%');
  
  // Плавная анимация клапана
  const rotation = -120 * (value / 100);
  envelopeFlap.style.transform = `rotateX(${rotation}deg) skewY(2deg)`;
  
  // Эффект мерцания текста при открытии
  if (value > 80) {
    envelopeText.classList.add("fade");
    sliderHint.textContent = "Почти открылось! ✨";
  }
  
  if (value >= 100) {
    envelopeFlap.classList.add("open");
    setTimeout(() => {
      envelopeContainer.style.opacity = "0";
      envelopeContainer.style.transform = "scale(0.95)";
      setTimeout(() => {
        envelopeContainer.style.display = "none";
        step1.classList.remove("hidden");
      }, 400);
    }, 600);
  }
});

// Первый экран
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const step2 = document.getElementById("step2");
const step3 = document.getElementById("step3");
const yaySound = document.getElementById("sound");
const happyKit = document.getElementById("happyKit");

// Тексты для кнопки "Нет"
const noTexts = ["Нет 😈", "Ты уверена?", "Точно нет?", "Ну пожалуйста… 😿"];
let noCounter = 0;

function placeNoButtonRandom(btn) {
  const windowWidth = Math.min(window.innerWidth, 500); // Ограничиваем область
  const windowHeight = Math.min(window.innerHeight, 800);
  const btnWidth = 120;
  const btnHeight = 50;
  const padding = 20;

  const x = Math.random() * (windowWidth - btnWidth - padding * 2) + padding;
  const y = Math.random() * (windowHeight - btnHeight - padding * 2) + padding;

  // Перемещаем и уменьшаем кнопку
  const scale = Math.max(0.6 - noCounter * 0.1, 0.3); // Правильно уменьшается
  btn.style.setProperty('--final-scale', scale);
  
  btn.style.position = "fixed";
  btn.style.left = x + "px";
  btn.style.top = y + "px";
  btn.style.width = btnWidth + "px";
  btn.style.height = btnHeight + "px";
  btn.style.transform = `scale(${scale})`;
  btn.classList.add("moving", "no-scale");

  if (noCounter < noTexts.length) {
    btn.textContent = noTexts[noCounter];
    noCounter++;
  }

  // Возвращаем кнопку на место через 2 секунды
  setTimeout(() => {
    btn.style.position = "";
    btn.style.left = "";
    btn.style.top = "";
    btn.style.width = "";
    btn.style.height = "";
    btn.style.transform = "";
    btn.classList.remove("moving", "no-scale");
    btn.style.setProperty('--final-scale', '');
    
    // Возвращаем на исходную позицию
    const buttonsContainer = btn.closest('.buttons');
    buttonsContainer.appendChild(btn);
  }, 2000);
}

// Кнопка "Нет" первого экрана
noBtn.addEventListener("click", (e) => {
  e.preventDefault();
  e.stopPropagation();
  placeNoButtonRandom(noBtn);
});

// Кнопка "Да" первого экрана
yesBtn.addEventListener("click", () => {
  yaySound.currentTime = 0;
  yaySound.play().catch(() => {});
  step1.classList.add("hidden");
  step2.classList.remove("hidden");
});

// Второй экран
const yes2 = document.getElementById("yes2");
const no2 = document.getElementById("no2");

// Кнопка "Нет" второго экрана
no2.addEventListener("click", (e) => {
  e.preventDefault();
  e.stopPropagation();
  placeNoButtonRandom(no2);
});

// Кнопка "Да" второго экрана
yes2.addEventListener("click", () => {
  happyKit.currentTime = 0;
  happyKit.play().catch(() => {});
  step2.classList.add("hidden");
  step3.classList.remove("hidden");
});
