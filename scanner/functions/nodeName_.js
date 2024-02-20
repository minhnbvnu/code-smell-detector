function nodeName_(element) {
  return lowercase(element.nodeName || (element[0] && element[0].nodeName));
}