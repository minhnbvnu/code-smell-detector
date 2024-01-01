function createPermissionDialog (
  denyText, allowText, dialogText, onAllowClicked, onDenyClicked) {
  var buttonsContainer;
  var denyButton;
  var acceptButton;

  buttonsContainer = document.createElement('div');
  buttonsContainer.classList.add(DIALOG_BUTTONS_CONTAINER_CLASS);

  // Buttons
  denyButton = document.createElement('button');
  denyButton.classList.add(DIALOG_BUTTON_CLASS, DIALOG_DENY_BUTTON_CLASS);
  denyButton.setAttribute(constants.AFRAME_INJECTED, '');
  denyButton.innerHTML = denyText;
  buttonsContainer.appendChild(denyButton);

  acceptButton = document.createElement('button');
  acceptButton.classList.add(DIALOG_BUTTON_CLASS, DIALOG_ALLOW_BUTTON_CLASS);
  acceptButton.setAttribute(constants.AFRAME_INJECTED, '');
  acceptButton.innerHTML = allowText;
  buttonsContainer.appendChild(acceptButton);

  // Ask for sensor events to be used
  acceptButton.addEventListener('click', function (evt) {
    evt.stopPropagation();
    onAllowClicked();
  });

  denyButton.addEventListener('click', function (evt) {
    evt.stopPropagation();
    onDenyClicked();
  });

  return createDialog(dialogText, buttonsContainer);
}