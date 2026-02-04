document.addEventListener('DOMContentLoaded', function() {
  
  // Элементы
  const envelopeSlider = document.getElementById('envelopeSlider');
  const envelopeFlap = document.getElementById('envelopeFlap');
  const envelopeText = document.getElementById('envelopeText');
  const envelopeContainer = document.getElementById('envelopeContainer');
  const sliderHint = document.getElementById('sliderHint');
  
  const step1 = document.getElementById('step1');
  const step2 = document.getElementById('step2');
  const step3 = document.getElementById('step3');
  
  const yesBtn = document.getElementById('yesBtn');
  const noBtn = document.getElementById('noBtn');
  const yes2 = document.getElementById('yes2');
  const no2 = document.getElementById('no2');
  
  const yaySound = document.getElementById('sound');
  const happyKit = document.getElementById('happyKit');
  
  let noCounter1 = 0;
  let noCounter2 = 0;
  
  const noTexts = ['Нет 😈', 'Ты уверена?', 'Точно нет?', 'Ну пожалуйста… 😿', 'Последний шанс! 🥺'];
  
  // ========== КОНВЕРТ ==========
  envelopeSlider.addEventListener('input', function() {
    const value = parseFloat(this.value);
    
    // Прогресс-бар
    this.style.setProperty('--progress', value + '%');
    
    // Анимация клапана
    const rotation = -120 * (value / 100);
    envelopeFlap.style.transform = `rotateX(${rotation}deg)`;
    
    // Эффекты текста
    if (value > 70) {
      envelopeText.style.opacity = '0.3';
      sliderHint.textContent = 'Открывается... ✨';
    }
    
    if (value >= 98) {
      envelopeFlap.style.transition = 'all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
    }
    
    if (value === 100) {
      setTimeout(() => {
        envelopeContainer.style.transition = 'all 0.5s ease';
        envelopeContainer.style.opacity = '0';
        envelopeContainer.style.transform = 'scale(0.95)';
        
        setTimeout(() => {
          envelopeContainer.style.display = 'none';
          step1.classList.remove('hidden');
        }, 500);
      }, 800);
    }
  });
  
  // ========== ПЕРВЫЙ ЭКРАН ==========
  yesBtn.addEventListener('click', function() {
    yaySound.currentTime = 0;
    yaySound.play().catch(() => {});
    
    step1.classList.add('hidden');
    setTimeout(() => {
      step2.classList.remove('hidden');
    }, 400);
  });
  
  noBtn.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    moveNoButton(this, noCounter1);
    noCounter1++;
    
    // ✅ Создаём НОВУЮ кнопку "Нет" на месте старой
    createNewNoButton('noBtn');
  });
  
  // ========== ВТОРОЙ ЭКРАН ==========
  yes2.addEventListener('click', function() {
    happyKit.currentTime = 0;
    happyKit.play().catch(() => {});
    
    step2.classList.add('hidden');
    setTimeout(() => {
      step3.classList.remove('hidden');
    }, 400);
  });
  
  no2.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    moveNoButton(this, noCounter2);
    noCounter2++;
    
    // ✅ Создаём НОВУЮ кнопку "Нет" на месте старой
    createNewNoButton('no2');
  });
  
  // ========== ЛОГИКА КНОПКИ "НЕТ" ==========
  function moveNoButton(button, counter) {
    // Полностью фиксируем кнопку
    button.style.transition = 'none';
    button.style.position = 'fixed';
    button.style.zIndex = '9999';
    button.classList.add('no-button-flying');
    
    // ✅ ХАОТИЧНЫЕ КООРДИНАТЫ ПО ВСЕМУ ЭКРАНУ
    const x = Math.random() * (window.innerWidth - 140);
    const y = Math.random() * (window.innerHeight - 80);
    
    // ✅ УМЕНЬШАЕТСЯ С КАЖДЫМ НАЖАТИЕМ (не возвращается!)
    const scale = Math.max(0.92 - (counter * 0.16), 0.2);
    
    button.style.left = x + 'px';
    button.style.top = y + 'px';
    button.style.transform = `scale(${scale}) rotate(${Math.random() * 30 - 15}deg)`;
    
    // Меняем текст
    if (counter < noTexts.length) {
      button.textContent = noTexts[counter];
    } else {
      button.textContent = '😿😿😿';
    }
    
    // Эффект дрожания
    let shake = 0;
    const shakeInterval = setInterval(() => {
      shake += Math.random() * 4 - 2;
      button.style.transform = `scale(${scale}) rotate(${Math.random() * 10 - 5}deg) translate(${shake}px, ${shake}px)`;
      
      if (shake > 20) clearInterval(shakeInterval);
    }, 80);
  }
  
  // ✅ СОЗДАЁМ НОВУЮ КНОПКУ "НЕТ" НА МЕСТЕ СТАРОЙ
  function createNewNoButton(originalId) {
    const buttonsContainer = document.querySelector('.card:not(.hidden) .buttons');
    const newBtn = document.createElement('button');
    
    newBtn.className = 'no';
    newBtn.id = originalId;
    newBtn.textContent = 'Нет 😈';
    
    // Копируем обработчики событий
    if (originalId === 'noBtn') {
      newBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        moveNoButton(this, noCounter1);
        noCounter1++;
        createNewNoButton('noBtn');
      });
    } else {
      newBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        moveNoButton(this, noCounter2);
        noCounter2++;
        createNewNoButton('no2');
      });
    }
    
    // Вставляем на место старой
    buttonsContainer.appendChild(newBtn);
  }
});
