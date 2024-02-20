function createExpansionButtonForConsole() {
  const expansionButton = document.createElement("a");
  expansionButton.setAttribute("href", "#");
  expansionButton.setAttribute("class", "toggle");
  expansionButton.innerHTML = "&nbsp;&nbsp;";
  return expansionButton;
}