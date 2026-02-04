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
          step1.style.animation = 'fadeInUp 0.6s ease';
        }, 500);
      }, 800);
    }
  });
  
  // ========== ПЕРВЫЙ ЭКРАН ==========
  yesBtn.addEventListener('click', function() {
    yaySound.currentTime = 0;
    yaySound.play().catch(() => {});
    
    step1.style.animation = 'fadeOutDown 0.4s ease';
    setTimeout(() => {
      step1.classList.add('hidden');
      step2.classList.remove('hidden');
      step2.style.animation = 'fadeInUp 0.6s ease';
    }, 400);
  });
  
  noBtn.addEventListener('click', function(e) {
    e.preventDefault();
    moveNoButton(this, noCounter1, true);
    noCounter1++;
  });
  
  // ========== ВТОРОЙ ЭКРАН ==========
  yes2.addEventListener('click', function() {
    happyKit.currentTime = 0;
    happyKit.play().catch(() => {});
    
    step2.style.animation = 'fadeOutDown 0.4s ease';
    setTimeout(() => {
      step2.classList.add('hidden');
      step3.classList.remove('hidden');
      step3.style.animation = 'fadeInUp 0.6s ease';
    }, 400);
  });
  
  no2.addEventListener('click', function(e) {
    e.preventDefault();
    moveNoButton(this, noCounter2, false);
    noCounter2++;
  });
  
  // ========== ЛОГИКА КНОПКИ "НЕТ" ==========
  function moveNoButton(button, counter, isFirstScreen) {
    // Сбрасываем стили
    button.style.transition = 'none';
    button.style.position = 'fixed';
    button.style.zIndex = '9999';
    
    // Вычисляем позицию
    const rect = button.getBoundingClientRect();
    const maxX = window.innerWidth - rect.width - 20;
    const maxY = window.innerHeight - rect.height - 100; // Отступ снизу
    
    const x = Math.random() * maxX + 10;
    const y = Math.random() * maxY + 10;
    
    // ✅ МАССШТАБ УМЕНЬШАЕТСЯ!
    const scale = Math.max(0.9 - (counter * 0.13), 0.35);
    
    button.style.left = x + 'px';
    button.style.top = y + 'px';
    button.style.transform = `scale(${scale})`;
    
    // Меняем текст
    if (counter < noTexts.length) {
      button.textContent = noTexts[counter];
    }
    
    // Возвращаем кнопку
    setTimeout(() => {
      button.style.transition = 'all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
      button.style.transform = 'scale(1) translateY(-10px)';
      
      setTimeout(() => {
        button.style.position = '';
        button.style.left = '';
        button.style.top = '';
        button.style.zIndex = '';
        button.style.transform = '';
        button.style.transition = '';
        
        // Возвращаем в контейнер
        const container = button.closest('.buttons');
        container.appendChild(button);
      }, 500);
    }, 1200);
  }
});
