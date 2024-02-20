function hydrateTeleport(node, vnode, parentComponent, parentSuspense, slotScopeIds, optimized, {
    o: { nextSibling, parentNode, querySelector }
  }, hydrateChildren) {
    const target = vnode.target = resolveTarget(
      vnode.props,
      querySelector
    );
    if (target) {
      const targetNode = target._lpa || target.firstChild;
      if (vnode.shapeFlag & 16) {
        if (isTeleportDisabled(vnode.props)) {
          vnode.anchor = hydrateChildren(
            nextSibling(node),
            vnode,
            parentNode(node),
            parentComponent,
            parentSuspense,
            slotScopeIds,
            optimized
          );
          vnode.targetAnchor = targetNode;
        } else {
          vnode.anchor = nextSibling(node);
          let targetAnchor = targetNode;
          while (targetAnchor) {
            targetAnchor = nextSibling(targetAnchor);
            if (targetAnchor && targetAnchor.nodeType === 8 && targetAnchor.data === "teleport anchor") {
              vnode.targetAnchor = targetAnchor;
              target._lpa = vnode.targetAnchor && nextSibling(vnode.targetAnchor);
              break;
            }
          }
          hydrateChildren(
            targetNode,
            vnode,
            target,
            parentComponent,
            parentSuspense,
            slotScopeIds,
            optimized
          );
        }
      }
      updateCssVars(vnode);
    }
    return vnode.anchor && nextSibling(vnode.anchor);
  }