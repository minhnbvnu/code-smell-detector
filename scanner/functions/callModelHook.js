function callModelHook(el, binding, vnode, prevVNode, hook) {
    const modelToUse = resolveDynamicModel(
      el.tagName,
      vnode.props && vnode.props.type
    );
    const fn = modelToUse[hook];
    fn && fn(el, binding, vnode, prevVNode);
  }