function randomSpan() {
  let r = Math.random();
  if (r < 0.8) {
    return 'gt-sm-1';
  } else if (r < 0.9) {
    return 'gt-sm-2';
  } else {
    return 'gt-sm-3';
  }
}