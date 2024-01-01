function createEnterARButton (onClick, xrMode) {
  var arButton;
  var wrapper;

  // Create elements.
  wrapper = document.createElement('div');
  wrapper.classList.add(ENTER_AR_CLASS);
  if (xrMode) { wrapper.classList.add('xr'); }
  wrapper.setAttribute(constants.AFRAME_INJECTED, '');
  arButton = document.createElement('button');
  arButton.className = ENTER_AR_BTN_CLASS;
  arButton.setAttribute('title',
    'Enter AR mode with a headset or handheld device.');
  arButton.setAttribute(constants.AFRAME_INJECTED, '');
  if (utils.device.isMobile()) { applyStickyHoverFix(arButton); }
  // Insert elements.
  wrapper.appendChild(arButton);
  arButton.addEventListener('click', function (evt) {
    onClick();
    evt.stopPropagation();
  });
  return wrapper;
}