// Ждём загрузки DOM
document.addEventListener('DOMContentLoaded', function() {

  // Все элементы
  const slider = document.getElementById('envelopeSlider');
  const flap = document.getElementById('envelopeFlap');
  const text = document.getElementById('envelopeText');
  const container = document.getElementById('envelopeContainer');
  const hint = document.getElementById('sliderHint');
  
  const step1 = document.getElementById('step1');
  const step2 = document.getElementById('step2');
  const step3 = document.getElementById('step3');
  
  const yes1 = document.getElementById('yesBtn');
  const no1 = document.getElementById('noBtn');
  const yes2 = document.getElementById('yes2');
  const no2 = document.getElementById('no2');
  
  const sound1 = document.getElementById('sound1');
  const sound2 = document.getElementById('sound2');
  
  let noClicks1 = 0;
  let noClicks2 = 0;
  
  const noPhrases = ['Нет 😈', 'Ты уверена?', 'Точно нет?', 'Ну пожалуйста…', 'Последний шанс! 🥺'];
  
  // 1. КОНВЕРТ - РАБОТАЕТ ГАРАНТИРОВАННО
  slider.addEventListener('input', function() {
    let progress = this.value;
    
    // Прогресс-бар (визуально)
    let gradient = `linear-gradient(to right, #e9ecef ${progress}%, #f8f9fa ${progress}%)`;
    this.style.background = gradient;
    
    // Открытие клапана
    let angle = -120 * (progress / 100);
    flap.style.transform = `rotateX(${angle}deg)`;
    
    // Эффекты текста
    if (progress > 70) {
      text.style.opacity = '0.3';
      hint.textContent = 'Открывается... ✨';
    }
    
    // ✅ ПОЛНОЕ ОТКРЫТИЕ
    if (progress == 100) {
      setTimeout(() => {
        container.style.opacity = '0';
        container.style.transform = 'scale(0.9)';
        setTimeout(() => {
          container.style.display = 'none';
          step1.classList.add('active');
        }, 300);
      }, 600);
    }
  });
  
  // 2. ПЕРВЫЙ ЭКРАН
  yes1.onclick = function() {
    sound1.currentTime = 0;
    sound1.play().catch(() => {});
    step1.classList.remove('active');
    setTimeout(() => step2.classList.add('active'), 300);
  };
  
  no1.onclick = function(e) {
    e.preventDefault();
    makeNoButtonFly(no1, noClicks1, noPhrases);
    noClicks1++;
    replaceNoButton('noBtn', noClicks1);
  };
  
  // 3. ВТОРОЙ ЭКРАН
  yes2.onclick = function() {
    sound2.currentTime = 0;
    sound2.play().catch(() => {});
    step2.classList.remove('active');
    setTimeout(() => step3.classList.add('active'), 300);
  };
  
  no2.onclick = function(e) {
    e.preventDefault();
    makeNoButtonFly(no2, noClicks2, noPhrases);
    noClicks2++;
    replaceNoButton('no2', noClicks2);
  };
  
  // ФУНКЦИЯ: КНОПКА "НЕТ" УЛЕТАЕТ
  function makeNoButtonFly(button, clicks, phrases) {
    button.classList.add('flying');
    button.style.position = 'fixed';
    button.style.zIndex = '9999';
    button.style.transition = 'none';
    
    // СЛУЧАЙНЫЕ КООРДИНАТЫ
    let x = Math.random() * (window.innerWidth - 120);
    let y = Math.random() * (window.innerHeight - 80);
    
    // УМЕНЬШАЕТСЯ
    let scale = Math.max(0.9 - clicks * 0.15, 0.25);
    
    button.style.left = x + 'px';
    button.style.top = y + 'px';
    button.style.transform = `scale(${scale}) rotate(${Math.random()*20-10}deg)`;
    
    // ТЕКСТ
    if (clicks < phrases.length) {
      button.textContent = phrases[clicks];
    } else {
      button.textContent = '😿😿😿';
    }
  }
  
  // ФУНКЦИЯ: НОВАЯ КНОПКА "НЕТ"
  function replaceNoButton(buttonId, clicks) {
    let container = document.querySelector('.buttons');
    let newBtn = document.createElement('button');
    newBtn.id = buttonId;
    newBtn.textContent = 'Нет 😈';
    newBtn.className = buttonId;
    
    if (buttonId === 'noBtn') {
      newBtn.onclick = function(e) {
        e.preventDefault();
        makeNoButtonFly(this, clicks, noPhrases);
        noClicks1++;
        replaceNoButton('noBtn', noClicks1);
      };
    } else {
      newBtn.onclick = function(e) {
        e.preventDefault();
        makeNoButtonFly(this, clicks, noPhrases);
        noClicks2++;
        replaceNoButton('no2', noClicks2);
      };
    }
    
    // Заменяем
    let oldBtn = document.getElementById(buttonId);
    container.replaceChild(newBtn, oldBtn);
  }
});
