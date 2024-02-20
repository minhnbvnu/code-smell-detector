function SignonSelected() {
  let selections = GetTreeSelections();
  if (selections.length) {
    removeButton.removeAttribute("disabled");
  } else {
    removeButton.setAttribute("disabled", true);
  }
}