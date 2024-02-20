function applyBindingValue(inst, node, binding, part, value) {
    value = computeBindingValue(node, value, binding, part);
    if (Polymer.sanitizeDOMValue) {
      value = Polymer.sanitizeDOMValue(value, binding.target, binding.kind, node);
    }
    if (binding.kind == 'attribute') {
      // Attribute binding
      inst._valueToNodeAttribute(/** @type {Element} */(node), value, binding.target);
    } else {
      // Property binding
      let prop = binding.target;
      if (node.__isPropertyEffectsClient &&
          node.__dataHasAccessor && node.__dataHasAccessor[prop]) {
        if (!node[TYPES.READ_ONLY] || !node[TYPES.READ_ONLY][prop]) {
          if (node._setPendingProperty(prop, value)) {
            inst._enqueueClient(node);
          }
        }
      } else  {
        inst._setUnmanagedPropertyToNode(node, prop, value);
      }
    }
  }