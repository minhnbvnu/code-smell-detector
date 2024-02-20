function readAttribute_Opera(element, name) {
    if (name === 'title') return element.title;
    return element.getAttribute(name);
  }