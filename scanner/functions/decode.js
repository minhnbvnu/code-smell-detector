function decode(s) {
  if (s) {
    s = s.replace(/\+/g, '%20');
    s = decodeURIComponent(s);
  }

  return s;
}