function searchKeyHandler(e) {
  // switch to search mode if backspace is pressed and no filter text has been entered
  if (
    e.code == "Backspace" &&
    logins.length > 0 &&
    e.target.value.length == 0
  ) {
    e.preventDefault();
    logins = resultLogins = [];
    e.target.value = fillOnSubmit ? "" : domain;
    domain = "";
    showFilterHint(false);
  }
}