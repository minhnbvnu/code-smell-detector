function createConsoleInput() {
  const command = document.createElement("input");
  command.type = "text";
  command.setAttribute("autocomplete", "off");
  command.setAttribute("spellcheck", false);
  command.setAttribute("autocapitalize", "off");
  command.setAttribute("autocorrect", "off");
  return command;
}