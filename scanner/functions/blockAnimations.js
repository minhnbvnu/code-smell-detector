function blockAnimations(node, bool) {
        node.style[ANIMATION_PROP + ANIMATION_PLAYSTATE_KEY] = bool ? 'paused' : '';
      }