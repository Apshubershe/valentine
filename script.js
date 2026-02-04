document.addEventListener('DOMContentLoaded', () => {
  const slider = document.getElementById('envelopeSlider');
  const flap = document.getElementById('envelopeFlap');
  const container = document.getElementById('envelopeContainer');
  const videoCat = document.getElementById('videoCat');
  
  // Звуки
  const yepSound = document.getElementById('yepSound');
  const happyKit = document.getElementById('happyKit');

  // Шаги
  const steps = [
    document.getElementById('step1'),
    document.getElementById('step2'),
    document.getElementById('step3')
  ];

  let noCount = 0;
  const phrases = [
    'Точно нет? 😈', 
    'Ну пожалуйста… 🥺', 
    'Последний шанс! 💔', 
    '😿😿😿', 
    'Пожалеешь! 😤', 
    'Я всё равно тебя люблю 💖'
  ];

  // 1. ОТКРЫТИЕ КОНВЕРТА
  slider.addEventListener('input', (e) => {
    const val = e.target.value;
    flap.style.transform = `rotateX(${val * 1.8}deg)`;
    
    if (val >= 100) {
      container.style.opacity = '0';
      setTimeout(() => {
        container.classList.add('hidden');
        steps[0].classList.add('active');
      }, 400);
    }
  });

  // 2. ФУНКЦИЯ УБЕГАНИЯ КНОПКИ
  const runAway = (btn) => {
    noCount++;
    
    // Случайная позиция в пределах окна
    const x = Math.random() * (window.innerWidth - btn.offsetWidth);
    const y = Math.random() * (window.innerHeight - btn.offsetHeight);
    
    // Уменьшение размера (минимум 30% от оригинала)
    const scale = Math.max(1 - noCount * 0.1, 0.3);
    
    btn.style.position = 'fixed';
    btn.style.zIndex = '1000';
    btn.style.left = `${x}px`;
    btn.style.top = `${y}px`;
    btn.style.transform = `scale(${scale})`;
    
    // Меняем текст кнопки
    if (noCount <= phrases.length) {
      btn.innerText = phrases[noCount - 1];
    }
  };

  // Навешиваем событие на обе кнопки "Нет"
  document.getElementById('noBtn').addEventListener('mouseover', function() { runAway(this); });
  document.getElementById('noBtn').addEventListener('click', function() { runAway(this); });
  document.getElementById('no2').addEventListener('click', function() { runAway(this); });

  // 3. КНОПКИ "ДА"
  document.getElementById('yesBtn').addEventListener('click', () => {
    yepSound.play().catch(() => console.log("Audio play blocked by browser"));
    steps[0].classList.remove('active');
    steps[0].classList.add('hidden');
    steps[1].classList.add('active');
    
    // Запуск видео со звуком
    videoCat.muted = false;
    videoCat.play();
  });

  document.getElementById('yes2').addEventListener('click', () => {
    happyKit.play().catch(() => {});
    steps[1].classList.remove('active');
    steps[1].classList.add('hidden');
    steps[2].classList.add('active');
  });
});
