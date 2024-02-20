function addNotifyListener(node, inst, binding) {
    if (binding.listenerEvent) {
      let part = binding.parts[0];
      node.addEventListener(binding.listenerEvent, function(e) {
        handleNotification(e, inst, binding.target, part.source, part.negate);
      });
    }
  }