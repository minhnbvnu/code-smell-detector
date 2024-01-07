function updateOverlay() {
  if (!mapWindow) {
    return;
  }
  const externalMapTarget = mapWindow.document.getElementById('map');
  if (!externalMapTarget) {
    return;
  }
  if (document.visibilityState === 'visible') {
    // Show controls and enable keyboard input
    externalMapTarget.classList.remove('unusable');
    externalMapTarget.setAttribute('tabindex', '0');
    externalMapTarget.focus();
  } else {
    // Hide all controls and disable keyboard input
    externalMapTarget.removeAttribute('tabindex');
    externalMapTarget.classList.add('unusable');
  }
}