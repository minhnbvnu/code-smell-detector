function keyboardPreventDefault(e) {
  if (e.target.tagName !== 'TEXTAREA') {
    e.preventDefault();
  }
}