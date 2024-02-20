function resetShapeFlag(vnode) {
    vnode.shapeFlag &= ~256;
    vnode.shapeFlag &= ~512;
  }