function isMajor(tickVal) {
  const remain = tickVal / (Math.pow(10, log10Floor(tickVal)));
  return remain === 1;
}