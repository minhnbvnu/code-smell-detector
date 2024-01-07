function humanizeKeystrokes(keystroke) {
  let keystrokes = keystroke.split(' ');
  keystrokes = keystrokes.map(stroke => _.humanizeKeystroke(stroke));
  return keystrokes.join(' ');
}