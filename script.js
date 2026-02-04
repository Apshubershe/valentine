\document.addEventListener('DOMContentLoaded', function() {
  // === ЭЛЕМЕНТЫ ===
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

  // === ЗВУКИ ===
  const yepSound = document.getElementById('yepSound');
  const happyKit = document.getElementById('happyKit');

  let noCount1 = 0;
  let noCount2 = 0;

  const phrases = [
    'Точно нет? 😈',
    'Ну пожалуйста… 🥺', 
    'Последний шанс! 💔',
    '😿😿😿',
    'Пожалеешь! 😤'
  ];

  // === 1. КОНВЕРТ ===
  slider.addEventListener('input', function() {
    const val = parseInt(this.value);
    
    // CSS переменная для стиля
    document.documentElement.style.setProperty('--progress', val + '%');
    
    flap.style.transform = `translateY(${-2.1 * val}px) rotateX(${val * 0.3}deg)`;

    if (val > 70) {
      text.style.opacity = '0.3';
      hint.innerHTML = 'Открывается... ✨';
    }

    if (val === 100) {
      container.style.transition = 'all 0.6s cubic-bezier(0.23, 1, 0.32, 1)';
      container.style.opacity = '0';
      container.style.transform = 'scale(0.9)';

      setTimeout(() => {
        container.style.display = 'none';
        step1.classList.add('active'); // ✅ Показываем первый шаг
      }, 600);
    }
  });

  // === 2. ПЕРВЫЙ ЭКРАН ===
  yes1.onclick = function() {
    playSound(yepSound);
    step1.classList.remove('active');
    setTimeout(() => step2.classList.add('active'), 400);
  };

  no1.onclick = function(e) {
    e.preventDefault();
    flyNoButton(no1, noCount1, phrases);
    noCount1++;
    replaceNoButton(step1, noCount1, phrases);
  };

  // === 3. ВТОРОЙ ЭКРАН ===
  yes2.onclick = function() {
    playSound(happyKit);
    step2.classList.remove('active');
    setTimeout(() => {
      step3.classList.add('active');
      // ✅ Автоскролл к финалу
      step3.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 400);
  };

  no2.onclick = function(e) {
    e.preventDefault();
    flyNoButton(no2, noCount2, phrases);
    noCount2++;
    replaceNoButton(step2, noCount2, phrases);
  };

  // === УЛУЧШЕННЫЕ ФУНКЦИИ ===
  function playSound(sound) {
    sound.currentTime = 0;
    sound.play().catch(() => {}); // Игнорируем ошибки автоплея
  }

  function flyNoButton(btn, count, phrases) {
    btn.classList.add('no-button-flying', 'flying');
    btn.style.position = 'fixed';
    btn.style.zIndex = '9999';
    btn.style.transition = 'all 1s cubic-bezier(0.68, -0.55, 0.265, 1.55)';

    const rect = btn.getBoundingClientRect();
    const x = Math.random() * (window.innerWidth - rect.width);
    const y = Math.random() * (window.innerHeight - rect.height);
    const scale = Math.max(0.8 - count * 0.12, 0.3);

    btn.style.left = x + 'px';
    btn.style.top = y + 'px';
    btn.style.transform = `scale(${scale}) rotate(${Math.random() * 720 - 360}deg)`;

    // Меняем текст улетающей кнопки
    btn.innerHTML = phrases[count] || '😿💔';
  }

  function replaceNoButton(card, count, phrases) {
    const container = card.querySelector('.buttons');
    const newBtn = document.createElement('button');
    
    newBtn.className = 'no';
    newBtn.innerHTML = count > 0 ? phrases[count - 1] || 'Нет 😈' : 'Нет 😈';

    newBtn.onclick = function(e) {
      e.preventDefault();
      const newCount = card.id === 'step1' ? ++noCount1 : ++noCount2;
      flyNoButton(newBtn, newCount - 1, phrases);
      replaceNoButton(card, newCount, phrases);
    };

    const oldBtn = container.querySelector('.no:not(.flying)');
    if (oldBtn) container.replaceChild(newBtn, oldBtn);
  }

  // ✅ Блокировка скролла на мобилках
  document.addEventListener('touchmove', e => {
    if (document.querySelector('.card.active')) e.preventDefault();
  }, { passive: false });
});
