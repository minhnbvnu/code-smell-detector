function clearElementAnimationState(element) {
      var node = getDomNode(element);
      node.removeAttribute(NG_ANIMATE_ATTR_NAME);
      activeAnimationsLookup.remove(node);
    }