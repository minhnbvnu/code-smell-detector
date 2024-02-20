function updateContextMenu() {
  var lockCol = PREF_IS_LOCKED;
  var typeCol = nsIPrefBranch.PREF_STRING;
  var valueCol = "";
  var copyDisabled = true;
  var prefSelected = view.selection.currentIndex >= 0;

  if (prefSelected) {
    var prefRow = gPrefView[view.selection.currentIndex];
    lockCol = prefRow.lockCol;
    typeCol = prefRow.typeCol;
    valueCol = prefRow.valueCol;
    copyDisabled = false;
  }

  var copyPref = document.getElementById("copyPref");
  copyPref.setAttribute("disabled", copyDisabled);

  var copyName = document.getElementById("copyName");
  copyName.setAttribute("disabled", copyDisabled);

  var copyValue = document.getElementById("copyValue");
  copyValue.setAttribute("disabled", copyDisabled);

  var resetSelected = document.getElementById("resetSelected");
  resetSelected.setAttribute("disabled", lockCol != PREF_IS_MODIFIED);

  var canToggle = typeCol == nsIPrefBranch.PREF_BOOL && valueCol != "";
  // indicates that a pref is locked or no pref is selected at all
  var isLocked = lockCol == PREF_IS_LOCKED;

  var modifySelected = document.getElementById("modifySelected");
  modifySelected.setAttribute("disabled", isLocked);
  modifySelected.hidden = canToggle;

  var toggleSelected = document.getElementById("toggleSelected");
  toggleSelected.setAttribute("disabled", isLocked);
  toggleSelected.hidden = !canToggle;
}