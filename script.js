document.addEventListener('DOMContentLoaded', function() {
  // Элементы
  const screens = {
    envelope: document.getElementById('envelopeScreen'),
    step1: document.getElementById('step1'),
    step2: document.getElementById('step2'),
    step3: document.getElementById('step3')
  };

  const slider = document.getElementById('envelopeSlider');
  const flap = document.getElementById('envelopeFlap');
  const text = document.getElementById('envelopeText');
  const hint = document.getElementById('sliderHint');

  const yesBtn1 = document.getElementById('yesBtn1');
  const noBtn1 = document.getElementById('noBtn1');
  const yesBtn2 = document.getElementById('yesBtn2');
  const noBtn2 = document.getElementById('noBtn2');

  const yepSound = document.getElementById('yepSound');
  const happySound = document.getElementById('happySound');

  let noClicks1 = 0;
  let noClicks2 = 0;

  const noPhrases = ['Точно нет? 😈', 'Ну пожалуйста 🥺', 'Последний шанс! 💔', '😿😿😿'];

  // 1. Конверт
  slider.addEventListener('input', function() {
    const value = parseInt(this.value);
    
    // Ползунок
    this.style.background = `linear-gradient(to right, #ff6f91 ${value}%, #e9ecef ${value}%)`;
    
    // Крышка конверта
    flap.style.transform = `translateY(${-value * 2.1}px) rotateX(${value * 0.3}deg)`;
    
    if (value > 70) {
      text.style.opacity = '0.3';
      hint.textContent = 'Открывается... ✨';
    }
    
    if (value === 100) {
      setTimeout(() => {
        screens.envelope.classList.remove('active');
        screens.step1.classList.add('active');
      }, 600);
    }
  });

  // 2. Первый экран - ДА
  yesBtn1.onclick = function() {
    playSound(yepSound);
    screens.step1.classList.remove('active');
    setTimeout(() => screens.step2.classList.add('active'), 400);
  };

  // 2. Первый экран - НЕТ
  noBtn1.onclick = handleNoClick(screens.step1, () => noClicks1++, noPhrases);

  // 3. Второй экран - ДА
  yesBtn2.onclick = function() {
    playSound(happySound);
    screens.step2.classList.remove('active');
    setTimeout(() => screens.step3.classList.add('active'), 400);
  };

  // 3. Второй экран - НЕТ
  noBtn2.onclick = handleNoClick(screens.step2, () => noClicks2++, noPhrases);

  // Функции
  function playSound(sound) {
    sound.currentTime = 0;
    sound.play().catch(() => {});
  }

  function handleNoClick(screen, counter, phrases) {
    return function(e) {
      e.preventDefault();
      
      // Улетает кнопка НЕТ
      this.style.position = 'fixed';
      this.style.zIndex = '1000';
      this.style.transition = 'all 0.8s ease';
      this.style.transform = `translate(${Math.random()*500-250}px, ${Math.random()*500-250}px) rotate(720deg) scale(0.5)`;
      this.innerHTML = phrases[counter()] || '😿';
      
      setTimeout(() => {
        createNewNoButton(screen, counter, phrases);
      }, 400);
    };
  }

  function createNewNoButton(screen, counter, phrases) {
    const buttons = screen.querySelector('.buttons');
    const newBtn = document.createElement('button');
    
    newBtn.className = 'btn-no';
    newBtn.textContent = phrases[counter()] || 'Нет 😈';
    
    newBtn.onclick = handleNoClick(screen, counter, phrases);
    
    buttons.querySelector('.btn-no').remove();
    buttons.appendChild(newBtn);
  }

  // Мобильная оптимизация
  document.addEventListener('touchstart', function() {}, { passive: false });
});
