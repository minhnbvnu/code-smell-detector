function runBindingEffect(inst, path, props, oldProps, info, hasPaths, nodeList) {
    let node = nodeList[info.index];
    let binding = info.binding;
    let part = info.part;
    // Subpath notification: transform path and set to client
    // e.g.: foo="{{obj.sub}}", path: 'obj.sub.prop', set 'foo.prop'=obj.sub.prop
    if (hasPaths && part.source && (path.length > part.source.length) &&
        (binding.kind == 'property') && !binding.isCompound &&
        node.__isPropertyEffectsClient &&
        node.__dataHasAccessor && node.__dataHasAccessor[binding.target]) {
      let value = props[path];
      path = Polymer.Path.translate(part.source, binding.target, path);
      if (node._setPendingPropertyOrPath(path, value, false, true)) {
        inst._enqueueClient(node);
      }
    } else {
      let value = info.evaluator._evaluateBinding(inst, part, path, props, oldProps, hasPaths);
      // Propagate value to child
      applyBindingValue(inst, node, binding, part, value);
    }
  }