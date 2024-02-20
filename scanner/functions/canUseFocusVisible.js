function canUseFocusVisible() {
  if (typeof _canUseFocusVisible === "boolean") {
    return _canUseFocusVisible;
  }

  if (!canUseDOM()) {
    _canUseFocusVisible = false;
    return _canUseFocusVisible;
  } // Check to see if the document supports the focus-visible element


  const styleElement = document.createElement("style"); // If nonces are present on the page, use it when creating the style element
  // to test focus-visible support.

  const styleNonce = getNonce();

  if (styleNonce !== null) {
    styleElement.setAttribute("nonce", styleNonce);
  }

  document.head.appendChild(styleElement);

  try {
    styleElement.sheet.insertRule("foo:focus-visible {color:inherit}", 0);
    _canUseFocusVisible = true;
  } catch (e) {
    _canUseFocusVisible = false;
  } finally {
    document.head.removeChild(styleElement);
  }

  return _canUseFocusVisible;
}