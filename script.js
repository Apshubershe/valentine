document.addEventListener('DOMContentLoaded', function() {
  // Элементы
  const screens = [
    document.getElementById('screen1'),
    document.getElementById('screen2'),
    document.getElementById('screen3'),
    document.getElementById('screen4')
  ];
  
  const slider = document.getElementById('slider');
  const flap = document.getElementById('flap');
  const envelopeText = document.getElementById('envelopeText');
  const sliderHint = document.getElementById('sliderHint');
  
  const yes1 = document.getElementById('yes1');
  const no1 = document.getElementById('no1');
  const yes2 = document.getElementById('yes2');
  const no2 = document.getElementById('no2');
  
  const clickSound = document.getElementById('clickSound');
  const happySound = document.getElementById('happySound');
  
  let currentScreen = 0;
  let noCount = 0;
  const noTexts = ['Точно нет? 😈', 'Ну пожалуйста 🥺', 'Последний шанс 💔', '😿😿😿'];

  // Ползунок конверта
  slider.addEventListener('input', function() {
    const value = parseInt(this.value);
    
    // Цвет ползунка
    this.style.background = `linear-gradient(to right, #ff6f91 ${value}%, #eee ${value}%)`;
    
    // Открытие конверта
    flap.style.transform = `rotateX(${value * 0.8}deg) translateY(${-value}px)`;
    
    if (value > 70) {
      envelopeText.style.opacity = '0.4';
      sliderHint.textContent = 'Открывается... ✨';
    }
    
    // Переход к первому вопросу
    if (value === 100) {
      setTimeout(() => {
        screens[0].classList.remove('active');
        screens[1].classList.add('active');
        currentScreen = 1;
      }, 500);
    }
  });

  // Первый экран - ДА
  yes1.onclick = function() {
    playSound(clickSound);
    screens[1].classList.remove('active');
    setTimeout(() => {
      screens[2].classList.add('active');
      currentScreen = 2;
    }, 300);
  };

  // Первый экран - НЕТ
  no1.onclick = function() {
    flyNoButton(this, 1);
  };

  // Второй экран - ДА
  yes2.onclick = function() {
    playSound(happySound);
    screens[2].classList.remove('active');
    setTimeout(() => {
      screens[3].classList.add('active');
      currentScreen = 3;
    }, 300);
  };

  // Второй экран - НЕТ
  no2.onclick = function() {
    flyNoButton(this, 2);
  };

  function playSound(sound) {
    sound.currentTime = 0;
    sound.play().catch(() => {});
  }

  function flyNoButton(button, screenNum) {
    noCount++;
    button.style.position = 'fixed';
    button.style.zIndex = '1000';
    button.style.transition = 'all 0.7s ease';
    button.style.transform = `translate(${Math.random()*300-150}px, ${Math.random()*300-150}px) rotate(360deg) scale(0.6)`;
    button.innerHTML = noTexts[noCount % noTexts.length] || '😿';
    
    setTimeout(() => {
      button.remove();
      createNewNoButton(screenNum);
    }, 500);
  }

  function createNewNoButton(screenNum) {
    const screen = screens[screenNum - 1];
    const buttons = screen.querySelector('.buttons');
    
    const newBtn = document.createElement('button');
    newBtn.className = 'no';
    newBtn.innerHTML = noTexts[noCount % noTexts.length] || 'Нет 😈';
    newBtn.onclick = () => flyNoButton(newBtn, screenNum);
    
    buttons.appendChild(newBtn);
  }
});
