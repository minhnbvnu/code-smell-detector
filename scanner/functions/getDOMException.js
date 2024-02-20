function getDOMException (errorMessage) {
  return globalThis.DOMException === undefined
    ? new Error(errorMessage)
    : new DOMException(errorMessage)
}