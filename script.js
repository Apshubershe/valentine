// Конверт
const envelopeSlider = document.getElementById("envelopeSlider");
const envelopeFlap = document.querySelector(".envelope-flap");
const envelopeContainer = document.getElementById("envelopeContainer");
const step1 = document.getElementById("step1");

envelopeSlider.addEventListener("input", () => {
  const value = envelopeSlider.value;
  envelopeFlap.style.transform = `rotateX(${-90 * (value/100)}deg)`;
  if(value >= 100){
    envelopeContainer.style.display = "none";
    step1.classList.remove("hidden");
  }
});

// Первый экран кнопки
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
  const rect = btn.parentElement.getBoundingClientRect();
  const btnRect = btn.getBoundingClientRect();
  const padding = 5;
  const maxX = rect.width - btnRect.width - padding;
  const maxY = rect.height - btnRect.height - padding;
  const x = Math.random() * maxX + padding/2;
  const y = Math.random() * maxY + padding/2;
  btn.style.left = x + "px";
  btn.style.top = y + "px";
  if(noCounter < noTexts.length){
    btn.textContent = noTexts[noCounter];
    noCounter++;
  }
  yesBtn.style.transform = `scale(${1 + noCounter*0.05})`;
}

noBtn.addEventListener("click", e=>{
  e.preventDefault();
  placeNoButtonRandom(noBtn);
});

yesBtn.addEventListener("click", ()=>{
  yaySound.currentTime = 0;
  yaySound.play().catch(()=>{});
  step1.classList.add("hidden");
  step2.classList.remove("hidden");
});

// Второй экран кнопки
const yes2 = document.getElementById("yes2");
const no2 = document.getElementById("no2");

no2.addEventListener("click", e=>{
  e.preventDefault();
  placeNoButtonRandom(no2);
});

yes2.addEventListener("click", ()=>{
  happyKit.currentTime = 0;
  happyKit.play().catch(()=>{});
  step2.classList.add("hidden");
  step3.classList.remove("hidden");
});
