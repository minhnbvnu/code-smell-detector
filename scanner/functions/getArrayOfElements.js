function getArrayOfElements(selector) {
  if (selector instanceof Element) {
    return [selector]
  }

  if (Array.isArray(selector)) {
    return selector
  }

  return [].slice.call(document.querySelectorAll(selector))
}