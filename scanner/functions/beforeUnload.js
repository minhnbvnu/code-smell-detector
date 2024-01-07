function beforeUnload(evt) {
  evt.preventDefault();
  evt.returnValue = "";
  return false;
}