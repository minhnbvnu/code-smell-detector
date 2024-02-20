function backspace() {
   restoreDrawingSurface();
   currentText = currentText.slice(0, -1);
   eraseTextCursor();
}