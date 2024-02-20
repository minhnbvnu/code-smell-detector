function appendElementToBody(tagName, text) {
  var el = document.createElement(tagName),
      textNode;

  if (text) {
    textNode = document.createTextNode(text);
    el.append(textNode);
  }

  document.body.append(el);
  return el;
}