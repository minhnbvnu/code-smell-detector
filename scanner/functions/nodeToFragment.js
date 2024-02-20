function nodeToFragment(node) {
    // if its a template tag and the browser supports it,
    // its content is already a document fragment. However, iOS Safari has
    // bug when using directly cloned template content with touch
    // events and can cause crashes when the nodes are removed from DOM, so we
    // have to treat template elements as string templates. (#2805)
    /* istanbul ignore if */
    if (isRealTemplate(node)) {
      return stringToFragment(node.innerHTML);
    }
    // script template
    if (node.tagName === 'SCRIPT') {
      return stringToFragment(node.textContent);
    }
    // normal node, clone it to avoid mutating the original
    var clonedNode = cloneNode(node);
    var frag = document.createDocumentFragment();
    var child;
    /* eslint-disable no-cond-assign */
    while (child = clonedNode.firstChild) {
      /* eslint-enable no-cond-assign */
      frag.appendChild(child);
    }
    trimNode(frag);
    return frag;
  }