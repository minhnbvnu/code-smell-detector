function createDialog (text, buttonsContainerEl) {
  var modalContainer;
  var dialog;
  var dialogTextContainer;
  var dialogText;

  modalContainer = document.createElement('div');
  modalContainer.classList.add(MODAL_CLASS);
  modalContainer.setAttribute(constants.AFRAME_INJECTED, '');

  dialog = document.createElement('div');
  dialog.className = DIALOG_CLASS;
  dialog.setAttribute(constants.AFRAME_INJECTED, '');
  modalContainer.appendChild(dialog);

  dialogTextContainer = document.createElement('div');
  dialogTextContainer.classList.add(DIALOG_TEXT_CONTAINER_CLASS);
  dialog.appendChild(dialogTextContainer);

  dialogText = document.createElement('div');
  dialogText.classList.add(DIALOG_TEXT_CLASS);
  dialogText.innerHTML = text;
  dialogTextContainer.appendChild(dialogText);

  dialog.appendChild(buttonsContainerEl);

  return modalContainer;
}