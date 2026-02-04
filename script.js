const sound = document.getElementById("sound");

const step1 = document.getElementById("step1");
const step2 = document.getElementById("step2");
const step3 = document.getElementById("step3");

const no1 = document.getElementById("no1");
const no2 = document.getElementById("no2");

// Функция убегания по всему экрану
function runAway(btn) {
  const padding = 10;

  const maxX = window.innerWidth - btn.offsetWidth - padding;
  const maxY = window.innerHeight - btn.offsetHeight - padding;

  const x = Math.random() * maxX;
  const y = Math.random() * maxY;

  btn.style.position = "fixed";
  btn.style.left = x + "px";
  btn.style.top = y + "px";
}

// Кнопки "Нет" убегают при клике
no1.onclick = () => runAway(no1);
no2.onclick = () => runAway(no2);

// Кнопки "Да" — переход на следующий шаг
document.getElementById("yes1").onclick = () => {
  sound.currentTime = 0;
  sound.play().catch(()=>{});

  step1.classList.add("hidden");
  step2.classList.remove("hidden");
};

document.getElementById("yes2").onclick = () => {
  step2.classList.add("hidden");
  step3.classList.remove("hidden");
};
