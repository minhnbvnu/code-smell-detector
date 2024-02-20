function _upgradeElement(window, el, upgradeTagName) {
  const constructor = window.customElements.get(upgradeTagName);
  constructor && window.customElements.upgrade(el, constructor);
}