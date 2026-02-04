document.addEventListener('DOMContentLoaded', function() {

  // ===== ЭЛЕМЕНТЫ =====
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

  // ===== ЗВУКИ (ТОЛЬКО НУЖНЫЕ) =====
  const yepSound = document.getElementById('yepSound');     // yepiii.mp3
  const happyKit = document.getElementById('happyKit');     // happykit.mp3

  let noCount1 = 0;
  let noCount2 = 0;

  const phrases = [
    'Нет 😈',
    'Ты уверена?',
    'Точно нет?',
    'Ну пожалуйста…',
    'Последний шанс! 🥺',
    '😿😿😿'
  ];

  // ===============================
  // 1. КОНВЕРТ (ПОЛЗУНОК)
  // ===============================
  slider.addEventListener('input', function () {
    const val = parseInt(this.value);

    this.style.background =
      `linear-gradient(to right, #ff6f91 ${val}%, #e9ecef ${val}%)`;

    flap.style.transform = `translateY(${-2.1 * val}px)`;

    if (val > 70) {
      text.style.opacity = '0.3';
      hint.textContent = 'Открывается... ✨';
    }

    if (val === 100) {
      container.style.opacity = '0';
      container.style.transform = 'scale(0.95)';

      setTimeout(() => {
        container.style.display = 'none';
        step1.classList.add('active');
      }, 500);
    }
  });

  // ===============================
  // 2. ПЕРВЫЙ ЭКРАН
  // ===============================
  yes1.onclick = function () {
    yepSound.currentTime = 0;
    yepSound.play().catch(() => {});

    step1.classList.remove('active');
    setTimeout(() => step2.classList.add('active'), 300);
  };

  no1.onclick = function (e) {
    e.preventDefault();
    flyNoButton(no1, noCount1);
    noCount1++;
    replaceNoButton(step1, noCount1);
  };

  // ===============================
  // 3. ВТОРОЙ ЭКРАН
  // ===============================
  yes2.onclick = function () {
    happyKit.currentTime = 0;
    happyKit.play().catch(() => {});

    step2.classList.remove('active');
    setTimeout(() => step3.classList.add('active'), 300);
  };

  no2.onclick = function (e) {
    e.preventDefault();
    flyNoButton(no2, noCount2);
    noCount2++;
    replaceNoButton(step2, noCount2);
  };

  // ===============================
  // КНОПКА "НЕТ" УЛЕТАЕТ И УМЕНЬШАЕТСЯ
  // ===============================
  function flyNoButton(btn, count) {
    btn.style.position = 'fixed';
    btn.style.zIndex = '9999';
    btn.style.transition = 'none';

    const x = Math.random() * (window.innerWidth - 140);
    const y = Math.random() * (window.innerHeight - 90);
    const scale = Math.max(0.9 - count * 0.15, 0.25);

    btn.style.left = x + 'px';
    btn.style.top = y + 'px';
    btn.style.transform =
      `scale(${scale}) rotate(${Math.random() * 30 - 15}deg)`;

    btn.textContent = phrases[count] || '😿';
  }

  // ===============================
  // ЗАМЕНА КНОПКИ "НЕТ"
  // ===============================
  function replaceNoButton(card, count) {
    const container = card.querySelector('.buttons');
    const newBtn = document.createElement('button');

    newBtn.className = 'no';
    newBtn.textContent = 'Нет 😈';

    newBtn.onclick = function (e) {
      e.preventDefault();
      flyNoButton(newBtn, count);

      if (card.id === 'step1') {
        noCount1++;
        replaceNoButton(step1, noCount1);
      } else {
        noCount2++;
        replaceNoButton(step2, noCount2);
      }
    };

    const oldBtn = container.querySelector('.no');
    container.replaceChild(newBtn, oldBtn);
  }

});
