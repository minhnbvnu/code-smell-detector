function createAlertDialog (closeText, dialogText, onOkClicked) {
  var buttonsContainer;
  var okButton;

  buttonsContainer = document.createElement('div');
  buttonsContainer.classList.add(DIALOG_BUTTONS_CONTAINER_CLASS);

  // Buttons
  okButton = document.createElement('button');
  okButton.classList.add(DIALOG_BUTTON_CLASS, DIALOG_OK_BUTTON_CLASS);
  okButton.setAttribute(constants.AFRAME_INJECTED, '');
  okButton.innerHTML = closeText;
  buttonsContainer.appendChild(okButton);

  // Ask for sensor events to be used
  okButton.addEventListener('click', function (evt) {
    evt.stopPropagation();
    onOkClicked();
  });

  return createDialog(dialogText, buttonsContainer);
}