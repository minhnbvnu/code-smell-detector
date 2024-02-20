function removeChildren(e) {
  for (var count = e.childNodes.length; count > 0; --count)
    { e.removeChild(e.firstChild); }
  return e
}