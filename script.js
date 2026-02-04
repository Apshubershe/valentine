\document.addEventListener('DOMContentLoaded', function() {
  // Элементы
  const envelopeScreen = document.getElementById('envelopeScreen');
  const step1 = document.getElementById('step1');
  const step2 = document.getElementById('step2');
  const step3 = document.getElementById('step3');
  
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

  let noCount1 = 0;
  let noCount2 = 0;
  const phrases = ['Точно нет? 😈', 'Ну пожалуйста 🥺', 'Последний шанс! 💔', '😿😿😿'];

  // ✅ ПОЛЗУНОК РАБОТАЕТ
  slider.addEventListener('input', function() {
    const value = this.value;
    
    console.log('Ползунок:', value); // ✅ ОТЛАДКА
    
    // Меняем цвет ползунка
    this.style.background = `linear-gradient(to right, #ff6f91 ${value}%, #e9ecef ${value}%)`;
    
    // Двигаем крышку конверта
    flap.style.transform = `translateY(${-value * 2}px) rotateX(${value * 0.4}deg)`;
    
    // Текст тускнеет
    if (value > 70) {
      text.style.opacity = '0.3';
      hint.textContent = 'Открывается... ✨';
    }
    
    // ✅ ПЕРЕХОД НА СЛЕДУЮЩИЙ ЭКРАН
    if (value == 100) {
      setTimeout(() => {
        envelopeScreen.classList.remove('active');
        envelopeScreen.style.display = 'none';
        step1.classList.add('active');
      }, 500);
    }
  });

  // Да - первый экран
  yesBtn1.onclick = function() {
    playSound(yepSound);
    step1.classList.remove('active');
    setTimeout(() => step2.classList.add('active'), 300);
  };

  // Нет - первый экран
  noBtn1.onclick = function() {
    flyNoButton(this, noCount1++, phrases, step1);
  };

  // Да - второй экран
  yesBtn2.onclick = function() {
    playSound(happySound);
    step2.classList.remove('active');
    setTimeout(() => step3.classList.add('active'), 300);
  };

  // Нет - второй экран
  noBtn2.onclick = function() {
    flyNoButton(this, noCount2++, phrases, step2);
  };

  function playSound(sound) {
    sound.currentTime = 0;
    sound.play().catch(() => {});
  }

  function flyNoButton(button, count, phrases, screen) {
    button.style.position = 'fixed';
    button.style.zIndex = '9999';
    button.style.transition = 'all 0.8s ease';
    button.style.transform = `translate(${Math.random()*400-200}px, ${Math.random()*400-200}px) rotate(720deg) scale(0.3)`;
    button.textContent = phrases[count] || '😿';
    
    setTimeout(() => {
      createNewNoButton(screen, count + 1, phrases);
    }, 400);
  }

  function createNewNoButton(screen, count, phrases) {
    const buttons = screen.querySelector('.buttons');
    const newBtn = document.createElement('button');
    newBtn.className = 'btn-no';
    newBtn.textContent = phrases[count % phrases.length] || 'Нет 😈';
    newBtn.onclick = () => flyNoButton(newBtn, count, phrases, screen);
    buttons.appendChild(newBtn);
  }
});
