function progressbar (ref) {
  var loaded = ref.loaded;
  var total = ref.total;
  var step = ref.step;

  var num;

  !barEl && init();

  if (step) {
    num = parseInt(barEl.style.width || 0, 10) + step;
    num = num > 80 ? 80 : num;
  } else {
    num = Math.floor(loaded / total * 100);
  }

  barEl.style.opacity = 1;
  barEl.style.width = num >= 95 ? '100%' : num + '%';

  if (num >= 95) {
    clearTimeout(timeId);
    timeId = setTimeout(function (_) {
      barEl.style.opacity = 0;
      barEl.style.width = '0%';
    }, 200);
  }
}