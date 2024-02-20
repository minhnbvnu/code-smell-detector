function e_preventDefault(e) {
  if (e.preventDefault) { e.preventDefault(); }
  else { e.returnValue = false; }
}