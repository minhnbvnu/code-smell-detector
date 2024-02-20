function normalizeSuspenseChildren(vnode) {
    const { shapeFlag, children } = vnode;
    const isSlotChildren = shapeFlag & 32;
    vnode.ssContent = normalizeSuspenseSlot(
      isSlotChildren ? children.default : children
    );
    vnode.ssFallback = isSlotChildren ? normalizeSuspenseSlot(children.fallback) : createVNode(Comment);
  }