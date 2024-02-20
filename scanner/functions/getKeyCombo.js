function getKeyCombo(savedAs, def) {
  if (localStorage[savedAs] && localStorage[savedAs].startsWith("{")) {
    return new ShortcutKey(JSON.parse(localStorage[savedAs]));
  } else {
    return new ShortcutKey(def);
  }
}