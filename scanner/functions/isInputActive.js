function isInputActive(doc = document) {
  const activeEl = getActiveElement(doc);
  return activeEl?.tagName == "INPUT" || activeEl?.tagName == "TEXTAREA";
}