function setKeyCombo(saveAs, key) {
  localStorage[saveAs] = JSON.stringify(key);
}