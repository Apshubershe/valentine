// Ждём загрузки DOM
document.addEventListener('DOMContentLoaded', function() {
  
  // ================================
  // ЭЛЕМЕНТЫ СТРАНИЦЫ
  // ================================
  const envelopeSlider = document.getElementById("envelopeSlider");
  const envelopeFlap = document.getElementById("envelopeFlap");
  const envelopeText = document.getElementById("envelopeText");
  const envelopeContainer = document.getElementById("envelopeContainer");
  const sliderHint = document.getElementById("sliderHint");
  
  const step1 = document.getElementById("step1");
  const step2 = document.getElementById("step2");
  const step3 = document.getElementById("step3");
  
  const yesBtn = document.getElementById("yesBtn");
  const noBtn = document.getElementById("noBtn");
  const yes2 = document.getElementById("yes2");
  const no2 = document.getElementById("no2");
  
  const yaySound = document.getElementById("sound");
  const happyKit = document.getElementById("happyKit");
  
  // Счетчики для кнопок "Нет"
  let noCounter1 = 0;
  let noCounter2 = 0;
  const noTexts = ["Нет 😈", "Ты уверена?", "Точно нет?", "Ну пожалуйста…", "Последний шанс! 🥺"];
  
  // ================================
  // 1. КОНВЕРТ С ПОЛЗУНКОМ (ОРИГИНАЛ + УЛУЧШЕНИЯ)
  // ================================
  envelopeSlider.addEventListener("input", () => {
    const value = Number(envelopeSlider.value);
    
    // ✅ ОРИГИНАЛЬНАЯ 3D-АНИМАЦИЯ + ПРОГРЕСС-БАР
    envelopeFlap.style.transform = `rotateX(${-90 * (value/100)}deg)`;
    
    // ✅ НОВЫЙ ПРОГРЕСС-БАР
    envelopeSlider.style.background = `linear-gradient(to right, #ff6f91 ${value}%, #e9ecef ${value}%)`;
    
    // ✅ ЭФФЕКТЫ ТЕКСТА
    if (value > 70) {
      envelopeText.style.opacity = '0.3';
      sliderHint.textContent = 'Открывается... ✨';
    }
    
    // ✅ ПЕРЕХОД К ПЕРВОМУ ЭКРАНУ
    if(value >= 100){
      envelopeContainer.style.transition = 'all 0.5s ease';
      envelopeContainer.style.opacity = '0';
      envelopeContainer.style.transform = 'scale(0.95)';
      
      setTimeout(() => {
        envelopeContainer.style.display = "none";
        step1.classList.remove("hidden");
      }, 500);
    }
  });
  
  // ================================
  // 2. ФУНКЦИЯ: КНОПКА "НЕТ" УЛЕТАЕТ (ОРИГИНАЛ + УЛУЧШЕНИЯ)
  // ================================
  function placeNoButtonRandom(btn, counter) {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const btnWidth = btn.offsetWidth;
    const btnHeight = btn.offsetHeight;
    const padding = 10;

    // ✅ ХАОТИЧНЫЕ КООРДИНАТЫ
    const x = Math.random() * (windowWidth - btnWidth - padding*2) + padding;
    const y = Math.random() * (windowHeight - btnHeight - padding*2) + padding;

    // ✅ ФИКСИРУЕМ ПОЗИЦИЮ
    btn.style.position = "fixed";
    btn.style.left = x + "px";
    btn.style.top = y + "px";
    btn.style.zIndex = "9999";
    btn.classList.add("flying");

    // ✅ ТЕКСТ МЕНЯЕТСЯ
    if(counter < noTexts.length){
      btn.textContent = noTexts[counter];
    } else {
      btn.textContent = "😿😿😿";
    }

    // ✅ УМЕНЬШАЕТСЯ С КАЖДЫМ КЛИКОМ
    let scale = Math.max(0.9 - counter * 0.15, 0.25);
    btn.style.transform = `scale(${scale}) rotate(${Math.random()*20-10}deg)`;
    
    // ✅ ЭФФЕКТ ДРОЖАНИЯ
    let shakes = 0;
    const shakeInterval = setInterval(() => {
      shakes++;
      const shakeX = (Math.random() - 0.5) * 15;
      const shakeY = (Math.random() - 0.5) * 15;
      btn.style.transform = `scale(${scale}) rotate(${Math.random()*10-5}deg) translate(${shakeX}px, ${shakeY}px)`;
      if (shakes > 6) clearInterval(shakeInterval);
    }, 100);
  }
  
  // ================================
  // 3. ПЕРВЫЙ ЭКРАН
  // ================================
  noBtn.addEventListener("click", e => {
    e.preventDefault();
    placeNoButtonRandom(noBtn, noCounter1);
    noCounter1++;
    createNewNoButton(1); // Новая кнопка
  });
  
  yesBtn.addEventListener("click", () => {
    yaySound.currentTime = 0;
    yaySound.play().catch(() => {});
    step1.classList.add("hidden");
    setTimeout(() => step2.classList.remove("hidden"), 300);
  });
  
  // ================================
  // 4. ВТОРОЙ ЭКРАН
  // ================================
  no2.addEventListener("click", e => {
    e.preventDefault();
    placeNoButtonRandom(no2, noCounter2);
    noCounter2++;
    createNewNoButton(2); // Новая кнопка
  });
  
  yes2.addEventListener("click", () => {
    happyKit.currentTime = 0;
    happyKit.play().catch(() => {});
    step2.classList.add("hidden");
    setTimeout(() => step3.classList.remove("hidden"), 300);
  });
  
  // ================================
  // 5. СОЗДАНИЕ НОВОЙ КНОПКИ "НЕТ"
  // ================================
  function createNewNoButton(screen) {
    const activeCard = screen === 1 ? step1 : step2;
    const buttonsContainer = activeCard.querySelector('.buttons');
    
    const newBtn = document.createElement('button');
    newBtn.className = 'no';
    newBtn.textContent = 'Нет 😈';
    
    if (screen === 1) {
      newBtn.id = 'noBtn';
      newBtn.addEventListener("click", e => {
        e.preventDefault();
        placeNoButtonRandom(newBtn, noCounter1);
        noCounter1++;
        createNewNoButton(1);
      });
    } else {
      newBtn.id = 'no2';
      newBtn.addEventListener("click", e => {
        e.preventDefault();
        placeNoButtonRandom(newBtn, noCounter2);
        noCounter2++;
        createNewNoButton(2);
      });
    }
    
    // Заменяем старую кнопку
    const oldBtn = screen === 1 ? noBtn : no2;
    buttonsContainer.replaceChild(newBtn, buttonsContainer.querySelector('.no'));
  }
});
