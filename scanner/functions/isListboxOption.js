function isListboxOption(el) {
  return isHTMLElement(el) && (el.getAttribute("role") === "option" || el instanceof HTMLOptionElement);
}