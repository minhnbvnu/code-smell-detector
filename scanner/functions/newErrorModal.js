function newErrorModal(message, informativeText) {
  const modal = COSAlertWindow.new();
  modal.setMessageText(message);
  modal.setInformativeText(informativeText);
  modal.runModal()
}