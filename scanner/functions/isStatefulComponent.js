function isStatefulComponent(instance) {
    return instance.vnode.shapeFlag & 4;
  }