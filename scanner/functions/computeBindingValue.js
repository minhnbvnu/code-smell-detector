function computeBindingValue(node, value, binding, part) {
    if (binding.isCompound) {
      let storage = node.__dataCompoundStorage[binding.target];
      storage[part.compoundIndex] = value;
      value = storage.join('');
    }
    if (binding.kind !== 'attribute') {
      // Some browsers serialize `undefined` to `"undefined"`
      if (binding.target === 'textContent' ||
          (binding.target === 'value' &&
            (node.localName === 'input' || node.localName === 'textarea'))) {
        value = value == undefined ? '' : value;
      }
    }
    return value;
  }