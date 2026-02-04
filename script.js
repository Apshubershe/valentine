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
    
    this.style.setProperty('--progress', value + '%');
    
    const rotation = -120 * (value / 100);
    envelopeFlap.style.transform = `rotateX(${rotation}deg)`;
    
    if (value > 70) {
      envelopeText.style.opacity = '0.3';
      sliderHint.textContent = 'Открывается... ✨';
    }
    
    if (value >= 98) {
      envelopeFlap.style.transition = 'all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
    }
    
    if (value
