function addBinding(constructor, templateInfo, nodeInfo, kind, target, parts, literal) {
    // Create binding metadata and add to nodeInfo
    nodeInfo.bindings = nodeInfo.bindings || [];
    let /** Binding */ binding = { kind, target, parts, literal, isCompound: (parts.length !== 1) };
    nodeInfo.bindings.push(binding);
    // Add listener info to binding metadata
    if (shouldAddListener(binding)) {
      let {event, negate} = binding.parts[0];
      binding.listenerEvent = event || (CaseMap.camelToDashCase(target) + '-changed');
      binding.listenerNegate = negate;
    }
    // Add "propagate" property effects to templateInfo
    let index = templateInfo.nodeInfoList.length;
    for (let i=0; i<binding.parts.length; i++) {
      let part = binding.parts[i];
      part.compoundIndex = i;
      addEffectForBindingPart(constructor, templateInfo, binding, part, index);
    }
  }