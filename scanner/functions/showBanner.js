function showBanner() {
  // eslint-disable-next-line no-console,no-control-regex -- output
  console.log(COLOR ? BANNER : BANNER.replace(/\u001B\[\d+m/g, ''));
}