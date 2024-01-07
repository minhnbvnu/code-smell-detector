function acceleratorForKeystroke(keystroke) {
  if (!keystroke) {
    return null;
  }
  let modifiers = keystroke.split(/-(?=.)/);
  const key = modifiers
    .pop()
    .toUpperCase()
    .replace('+', 'Plus');

  modifiers = modifiers.map(modifier =>
    modifier
      .replace(/shift/gi, 'Shift')
      .replace(/cmd/gi, 'Command')
      .replace(/ctrl/gi, 'Ctrl')
      .replace(/alt/gi, 'Alt')
  );

  const keys = [...modifiers, key];
  return keys.join('+');
}