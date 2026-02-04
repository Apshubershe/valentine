const sound = document.getElementById("sound");

const step1 = document.getElementById("step1");
const step2 = document.getElementById("step2");
const step3 = document.getElementById("step3");

const no1 = document.getElementById("no1");
const no2 = document.getElementById("no2");

// Убегание по X, Y фиксированная
function runAway(btn) {
  const container = btn.parentElement;
  const rect = container.getBoundingClientRect();
  const padding = 10;

  const maxX = rect.width - btn.offsetWidth - padding;
  const y = btn.offsetTop; // фиксированная высота Y
  const x = Math.random() * maxX;

  btn.style.position = "absolute";
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
