function wrapPlainTraceback() {
  const plainTraceback = document.querySelector("div.plain textarea");
  const wrapper = document.createElement("pre");
  const textNode = document.createTextNode(plainTraceback.textContent);
  wrapper.appendChild(textNode);
  plainTraceback.replaceWith(wrapper);
}