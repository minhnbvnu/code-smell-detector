function composedTreeWalk(node, callback, shadowRootAncestor) {
    if (node.nodeType == Node.ELEMENT_NODE) {
      const element = /** @type {!HTMLElement} */ (node);
      if (callback) {
        callback(element);
      }

      // Descend into node:
      // If it has a ShadowRoot, ignore all child elements - these will be picked
      // up by the <content> or <shadow> elements. Descend straight into the
      // ShadowRoot.
      const shadowRoot = /** @type {!HTMLElement} */ (element).shadowRoot;
      if (shadowRoot) {
        composedTreeWalk(shadowRoot, callback, shadowRoot);
        return;
      }

      // If it is a <content> element, descend into distributed elements - these
      // are elements from outside the shadow root which are rendered inside the
      // shadow DOM.
      if (element.localName == 'content') {
        const content = /** @type {!HTMLContentElement} */ (element);
        // Verifies if ShadowDom v0 is supported.
        const distributedNodes = content.getDistributedNodes ?
          content.getDistributedNodes() : [];
        for (let i = 0; i < distributedNodes.length; i++) {
          composedTreeWalk(distributedNodes[i], callback, shadowRootAncestor);
        }
        return;
      }

      // If it is a <slot> element, descend into assigned nodes - these
      // are elements from outside the shadow root which are rendered inside the
      // shadow DOM.
      if (element.localName == 'slot') {
        const slot = /** @type {!HTMLSlotElement} */ (element);
        // Verify if ShadowDom v1 is supported.
        const distributedNodes = slot.assignedNodes ?
          slot.assignedNodes({flatten: true}) : [];
        for (let i = 0; i < distributedNodes.length; i++) {
          composedTreeWalk(distributedNodes[i], callback, shadowRootAncestor);
        }
        return;
      }
    }

    // If it is neither the parent of a ShadowRoot, a <content> element, a <slot>
    // element, nor a <shadow> element recurse normally.
    let child = node.firstChild;
    while (child != null) {
      composedTreeWalk(child, callback, shadowRootAncestor);
      child = child.nextSibling;
    }
  }