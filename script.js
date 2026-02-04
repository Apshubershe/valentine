const noBtn = document.getElementById("noBtn");

// начальная позиция кнопки "Нет"
noBtn.style.top = "55%";
noBtn.style.left = "55%";

// функция случайного перемещения по экрану
function moveNoButton() {
  const padding = 20;

  const maxX = window.innerWidth - noBtn.offsetWidth - padding;
  const maxY = window.innerHeight - noBtn.offsetHeight - padding;

  const x = Math.random() * maxX;
  const y = Math.random() * maxY;

  noBtn.style.left = x + "px";
  noBtn.style.top = y + "px";
}

// убегает при наведении и клике
noBtn.addEventListener("mouseover", moveNoButton);
noBtn.addEventListener("click", moveNoButton);
