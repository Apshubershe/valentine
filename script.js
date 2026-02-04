// Аудио при нажатии "Да"
const sound = document.getElementById("sound");

// Шаги
const step1 = document.getElementById("step1");
const step2 = document.getElementById("step2");
const step3 = document.getElementById("step3");

// Кнопки "Нет"
const no1 = document.getElementById("no1");
const no2 = document.getElementById("no2");

// Функция убегания по всему экрану
function runAway(btn) {
  const padding = 10; // отступы от краев окна

  const maxX = window.innerWidth - btn.offsetWidth - padding;
  const maxY = window.innerHeight - btn.offsetHeight - padding;

  const x = Math.random() * maxX;
  const y = Math.random() * maxY;

  btn.style.position = "fixed"; // фиксированная позиция относительно окна
  btn.style.left = x + "px";
  btn.style.top = y + "px";
}

// Привязываем к кнопкам "Нет"
no1.onclick = () => runAway(no1);
no2.onclick = () => runAway(no2);

// Кнопки "Да" — переход на следующий шаг
document.getElementById("yes1").onclick = () => {
  // проигрываем звук
  sound.currentTime = 0;
  sound.play().catch(() => {});

  // скрываем шаг 1, показываем шаг 2
  step1.classList.add("hidden");
  step2.classList.remove("hidden");
};

document.getElementById("yes2").onclick = () => {
  // скрываем шаг 2, показываем финальный экран
  step2.classList.add("hidden");
  step3.classList.remove("hidden");
};
