function unblockTransitions(element, className) {
        var prop = TRANSITION_PROP + PROPERTY_KEY;
        var node = extractElementNode(element);
        if(node.style[prop] && node.style[prop].length > 0) {
          node.style[prop] = '';
        }
        element.removeClass(NG_ANIMATE_BLOCK_CLASS_NAME);
      }