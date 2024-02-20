function addCustomContent(content, customBlocks) {
  if (customBlocks.css) {
    content.css += '\r\t/* Custom CSS */\r\t' + customBlocks.css.join('\r\t') + '\r';
  }
  if (customBlocks['html-before']) {
    content.html = '<!-- Custom HTML -->\r' + customBlocks['html-before'].join('\r') + '\r' + content.html + '\r';
  }
  if (customBlocks['html-after']) {
    content.html += '\r<!-- Custom HTML -->\r' + customBlocks['html-after'].join('\r') + '\r';
  }
  // deprecated
  if (customBlocks.html) {
    content.html += '\r<!-- Custom HTML -->\r' + customBlocks.html.join('\r') + '\r';
  }
  // TODO: assumed JS contained in <script> tag -- verify this?
  if (customBlocks.js) {
    content.js += '\r<!-- Custom JS -->\r' + customBlocks.js.join('\r') + '\r';
  }
}