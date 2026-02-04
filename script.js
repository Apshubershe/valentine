// Конверт
const envelopeSlider = document.getElementById("envelopeSlider");
const envelopeFlap = document.getElementById("envelopeFlap");
const envelopeContainer = document.getElementById("envelopeContainer");
const step1 = document.getElementById("step1");

envelopeSlider.addEventListener("input", () => {
  const value = Number(envelopeSlider.value);
  envelopeFlap.style.transform = `rotateX(${-90 * (value/100)}deg)`;
  if(value >= 100){
    envelopeContainer.style.display = "none";
    step1.classList.remove("hidden");
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
const noTexts = ["Нет 😈", "Ты уверена?", "Точно нет?", "Ну пожалуйста…"];
let noCounter = 0;

function placeNoButtonRandom(btn){
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  const btnWidth = btn.offsetWidth;
  const btnHeight = btn.offsetHeight;
  const padding = 10;

  const x = Math.random() * (windowWidth - btnWidth - padding*2) + padding;
  const y = Math.random() * (windowHeight - btnHeight - padding*2) + padding;

  btn.style.position = "fixed";
  btn.style.left = x + "px";
  btn.style.top = y + "px";

  if(noCounter < noTexts.length){
    btn.textContent = noTexts[noCounter];
    noCounter++;
  }

  // "Да" растёт с каждым "Нет"
  let scale = 1 + noCounter * 0.05;
  yesBtn.style.transform = `scale(${scale})`;
}

// Кнопка "Нет" первого экрана
noBtn.addEventListener("click", e=>{
  e.preventDefault();
  placeNoButtonRandom(noBtn);
});

// Кнопка "Да" первого экрана
yesBtn.addEventListener("click", ()=>{
  yaySound.currentTime = 0;
  yaySound.play().catch(()=>{});
  step1.classList.add("hidden");
  step2.classList.remove("hidden");
});

// Второй экран
const yes2 = document.getElementById("yes2");
const no2 = document.getElementById("no2");

// Кнопка "Нет" второго экрана
no2.addEventListener("click", e=>{
  e.preventDefault();
  placeNoButtonRandom(no2);
});

// Кнопка "Да" второго экрана
yes2.addEventListener("click", ()=>{
  happyKit.currentTime = 0;
  happyKit.play().catch(()=>{});
  step2.classList.add("hidden");
  step3.classList.remove("hidden");
});
