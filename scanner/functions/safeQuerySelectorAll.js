function safeQuerySelectorAll(selector) {
  let elements
  try {
    elements = document.querySelectorAll(selector);
  } catch (e) {
    elements = []
  }
  return elements
}