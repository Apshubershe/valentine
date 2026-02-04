// ✅ НОВАЯ ЛОГИКА КНОПКИ "НЕТ"
function moveNoButton(button, counter, isFirstScreen) {
  // Полностью фиксируем кнопку
  button.style.transition = 'none';
  button.style.position = 'fixed';
  button.style.zIndex = '9999';
  button.classList.add('no-button-flying');
  
  // ✅ ХАОТИЧНЫЕ КООРДИНАТЫ ПО ВСЕМУ ЭКРАНУ
  const x = Math.random() * (window.innerWidth - 140);
  const y = Math.random() * (window.innerHeight - 80);
  
  // ✅ УМЕНЬШАЕТСЯ С КАЖДЫМ НАЖАТИЕМ (не возвращается!)
  const scale = Math.max(0.92 - (counter * 0.16), 0.2);
  
  button.style.left = x + 'px';
  button.style.top = y + 'px';
  button.style.transform = `scale(${scale}) rotate(${Math.random() * 20 - 10}deg)`;
  
  // Меняем текст
  if (counter < noTexts.length) {
    button.textContent = noTexts[counter];
  } else {
    button.textContent = '😿😿😿';
  }
  
  // ✅ НЕ ВОЗВРАЩАЕТСЯ! Просто улетает навсегда
  // Добавляем эффект дрожания
  setTimeout(() => {
    button.style.transition = 'transform 0.3s ease';
    button.style.transform += ' translateX(' + (Math.random() * 40 - 20) + 'px)';
  }, 100);
}
