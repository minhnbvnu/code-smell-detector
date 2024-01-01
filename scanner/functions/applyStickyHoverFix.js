function applyStickyHoverFix (buttonEl) {
  buttonEl.addEventListener('touchstart', function () {
    buttonEl.classList.remove('resethover');
  });
  buttonEl.addEventListener('touchend', function () {
    buttonEl.classList.add('resethover');
  });
}