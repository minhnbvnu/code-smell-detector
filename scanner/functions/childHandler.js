function childHandler(child) {
    if (child) {
      parent.appendChild(goog.isString(child) ? doc.createTextNode(child) : child);
    }
  }