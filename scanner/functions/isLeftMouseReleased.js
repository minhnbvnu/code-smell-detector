function isLeftMouseReleased(event) {
  if ("buttons" in event) {
    return !(event.buttons & 1);
  }

  const chrome = window.chrome;
  const isChrome15OrOpera15plus = chrome && (chrome.webstore || chrome.app);
  const isSafari6plus = /Apple/.test(navigator.vendor) && /Version\/([6-9]\d*|[1-5]\d+)/.test(navigator.userAgent);

  if (isChrome15OrOpera15plus || isSafari6plus) {
    return event.which === 0;
  }

  return false;
}