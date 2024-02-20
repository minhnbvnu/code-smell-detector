function windowIsOpen(window) {
  return (window && typeof(window) != 'undefined' && !window.closed)
}