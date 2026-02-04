document.addEventListener('DOMContentLoaded', function() {
  // ================================
  // 1. ПОЛУЧАЕМ ВСЕ ЭЛЕМЕНТЫ СТРАНИЦЫ
  // ================================
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
  
  // Счетчики для кнопок "Нет" (отдельно для каждого экрана)
  let noCounter1 = 0;  // Первый экран
  let noCounter2 = 0;  // Второй экран
  
  // Тексты для меняющейся кнопки "Нет"
  const noTexts = ['Нет 😈', 'Ты уверена?', 'Точно нет?', 'Ну пожалуйста… 😿', 'Последний шанс! 🥺'];
  
  // ================================
  // 2. АНИМАЦИЯ КОНВЕРТА (ПОЛЗУНОК)
  // ================================
  envelopeSlider.addEventListener('input', function() {
    const value = parseFloat(this.value); // 0-100%
    
    // Обновляем прогресс-бар в ползунке
    this.style.setProperty('--progress', value + '%');
    
    // Поворачиваем клапан конверта (от 0° до -120°)
    const rotation = -120 * (value / 100);
    envelopeFlap.style.transform = `rotateX(${rotation}deg)`;
    
    // Эффекты при открытии
    if (value > 70) {
      envelopeText.style.opacity = '0.3';        // Текст бледнеет
      sliderHint.textContent = 'Открывается... ✨'; // Меняем подсказку
    }
    
    // Финальная bounce-анимация при 98%
    if (value >= 98) {
      envelopeFlap.style.transition = 'all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
    }
    
    // ✅ ПОЛНОЕ ОТКРЫТИЕ при 100%
    if (value === 100) {
      setTimeout(() => {
        // Исчезновение конверта
        envelopeContainer.style.transition = 'all 0.5s ease';
        envelopeContainer.style.opacity = '0';
        envelopeContainer.style.transform = 'scale(0.95)';
        
        // Показываем первый экран
        setTimeout(() => {
          envelopeContainer.style.display = 'none';
          step1.classList.remove('hidden');
        }, 500);
      }, 800);
    }
  });
  
  // ================================
  // 3. ПЕРВЫЙ ЭКРАН (Да/Нет)
  // ================================
  yesBtn.addEventListener('click', function() {
    // Звук + переход ко второму экрану
    yaySound.currentTime = 0;
    yaySound.play().catch(() => {});
    
    step1.classList.add('hidden');
    setTimeout(() => {
      step2.classList.remove('hidden');
    }, 300);
  });
  
  // КНОПКА "НЕТ" - ПЕРВЫЙ ЭКРАН
  noBtn.addEventListener('click', function(e) {
    e.preventDefault();
    flyAwayNoButton(this, noCounter1, 1); // Улетает!
    noCounter1++;
    createNewNoButton(1); // Новая кнопка на месте
  });
  
  // ================================
  // 4. ВТОРОЙ ЭКРАН (Да/Нет)
  // ================================
  yes2.addEventListener('click', function() {
    // Финальный звук + экран
    happyKit.currentTime = 0;
    happyKit.play().catch(() => {});
    
    step2.classList.add('hidden');
    setTimeout(() => {
      step3.classList.remove('hidden');
    }, 300);
  });
  
  // КНОПКА "НЕТ" - ВТОРОЙ ЭКРАН
  no2.addEventListener('click', function(e) {
    e.preventDefault();
    flyAwayNoButton(this, noCounter2, 2); // Улетает!
    noCounter2++;
    createNewNoButton(2); // Новая кнопка на месте
  });
  
  // ================================
  // 5. ФУНКЦИЯ: КНОПКА "НЕТ" УЛЕТАЕТ
  // ================================
  function flyAwayNoButton(button, counter, screenNumber) {
    // Фиксируем позицию
    button.style.transition = 'none';
    button.style.position = 'fixed';
    button.style.zIndex = '9999';
    button.classList.add('no-button-flying');
    
    // ✅ ХАОТИЧНЫЕ КООРДИНАТЫ (0-100% экрана)
    const x = Math.random() * (window.innerWidth - 150);
    const y = Math.random() * (window.innerHeight - 100);
    
    // ✅ УМЕНЬШЕНИЕ (0.92 → 0.76 → 0.60 → 0.44 → 0.28...)
    const scale = Math.max(0.92 - (counter * 0.16), 0.2);
    
    // Применяем стили
    button.style.left = x + 'px';
    button.style.top = y + 'px';
    button.style.transform = `scale(${scale}) rotate(${Math.random() * 30 - 15}deg)`;
    
    // Меняем текст
    if (counter < noTexts.length) {
      button.textContent = noTexts[counter];
    } else {
      button.textContent = '😿😿😿';
    }
    
    // Дрожание
    let shakes = 0;
    const shakeInterval = setInterval(() => {
      shakes++;
      const shakeX = (Math.random() - 0.5) * 20;
      const shakeY = (Math.random() - 0.5) * 20;
      button.style.transform = `scale(${scale}) rotate(${Math.random() * 10 - 5}deg) translate(${shakeX}px, ${shakeY}px)`;
      
      if (shakes > 8) {
        clearInterval(shakeInterval);
      }
    }, 100);
  }
  
  // ================================
  // 6. ФУНКЦИЯ: НОВАЯ КНОПКА "НЕТ"
  // ================================
  function createNewNoButton(screenNumber) {
    // Находим активный контейнер кнопок
    const activeCard = document.querySelector('.card:not(.hidden)');
    const buttonsContainer = activeCard.querySelector('.buttons');
    
    // Создаём новую кнопку
    const newBtn = document.createElement('button');
    newBtn.className = 'no';
    newBtn.textContent = 'Нет 😈';
    newBtn.style.transition = 'all 0.3s ease';
    
    // Обработчик для первой кнопки
    if (screenNumber === 1) {
      newBtn.id = 'noBtn';
      newBtn.addEventListener('click', function(e) {
        e.preventDefault();
        flyAwayNoButton(this, noCounter1, 1);
        noCounter1++;
        createNewNoButton(1);
      });
    } 
    // Обработчик для второй кнопки
    else {
      newBtn.id = 'no2';
      newBtn.addEventListener('click', function(e) {
        e.preventDefault();
        flyAwayNoButton(this, noCounter2, 2);
        noCounter2++;
        createNewNoButton(2);
      });
    }
    
    // Добавляем на место старой кнопки
    buttonsContainer.appendChild(newBtn);
  }
});
