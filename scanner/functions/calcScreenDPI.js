function calcScreenDPI() {
  const el = document.createElement('div');
  el.style.width = '1in';
  document.body.appendChild(el);
  const dpi = el.offsetWidth;
  document.body.removeChild(el);

  // Do you believe in magic... numbers? We tested on some devices, and the displayed
  // size of `width: 1in` was less than desired. On @pezvi's mac, it was ~75% ; on
  // @cdrini's laptop it was ~85%. Since we want to avoid things appearing too small,
  // let's just use a multiplier of 1.25
  const screenDPI = dpi * 1.25;
  // This will return 0 in testing; never want it to be 0!
  return screenDPI == 0 ? 100 : screenDPI;
}