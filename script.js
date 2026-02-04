// Звуки
const sound = document.getElementById("sound");       // первый звук "yepiii"
const happyKit = document.getElementById("happyKit"); // второй звук "happykit"

// Шаги/экраны
const step1 = document.getElementById("step1");
const step2 = document.getElementById("step2");
const step3 = document.getElementById("step3");

// Кнопки
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

const yes2 = document.getElementById("yes2");
const no2 = document.getElementById("no2");

// Контейнер для салюта сердечек
const heartsContainer = document.getElementById("hearts-container");

// Состояние кнопки "Нет"
let noClickCount = 0;
const noTexts = ["Нет","Ты уверена?","Точно нет?","Ну пожалуйста…"];

// Функция убегания кнопки "Нет"
function runAway(btn) {
  noClickCount++;
  if(noClickCount <= noTexts.length){
    btn.innerText = noTexts[noClickCount-1];
  }

  // уменьшаем кнопку "Нет"
  btn.style.transform = "scale("+(1 - 0.1*noClickCount)+")";

  // Случайная позиция на экране
  const padding = 10;
  const maxX = window.innerWidth - btn.offsetWidth - padding;
  const maxY = window.innerHeight - btn.offsetHeight - padding;

  const x = Math.random() * maxX;
  const y = Math.random() * maxY;

  btn.style.position = "fixed";
  btn.style.left = x + "px";
  btn.style.top = y + "px";
  btn.style.transition = "all 0.5s ease"; // плавное движение
}

// Салют сердечек
function createHearts() {
  for(let i=0; i<10; i++){
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.innerText = "💖";
    heart.style.left = Math.random() * window.innerWidth + "px";
    heart.style.fontSize = (12 + Math.random()*18) + "px";
    heartsContainer.appendChild(heart);
    setTimeout(()=>heart.remove(), 1200);
  }
}

// Обработчики кнопок "Нет"
noBtn.onclick = ()=>runAway(noBtn);
no2.onclick = ()=>runAway(no2);

// Первая кнопка "Да"
yesBtn.onclick = ()=>{
  yesBtn.style.transform = "scale(1.2)"; // растём
  sound.currentTime = 0;
  sound.play().catch(()=>{});
  createHearts();
  step1.classList.add("hidden");
  step2.classList.remove("hidden");
};

// Вторая кнопка "Да"
yes2.onclick = ()=>{
  createHearts();
  step2.classList.add("hidden");
  step3.classList.remove("hidden");

  // проигрываем звук happykit
  happyKit.currentTime = 0;
  happyKit.play().catch(()=>{});
};
