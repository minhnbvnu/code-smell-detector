function mountSuspense(vnode, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, rendererInternals) {
    const {
      p: patch,
      o: { createElement }
    } = rendererInternals;
    const hiddenContainer = createElement("div");
    const suspense = vnode.suspense = createSuspenseBoundary(
      vnode,
      parentSuspense,
      parentComponent,
      container,
      hiddenContainer,
      anchor,
      isSVG,
      slotScopeIds,
      optimized,
      rendererInternals
    );
    patch(
      null,
      suspense.pendingBranch = vnode.ssContent,
      hiddenContainer,
      null,
      parentComponent,
      suspense,
      isSVG,
      slotScopeIds
    );
    if (suspense.deps > 0) {
      triggerEvent(vnode, "onPending");
      triggerEvent(vnode, "onFallback");
      patch(
        null,
        vnode.ssFallback,
        container,
        anchor,
        parentComponent,
        null,
        // fallback tree will not have suspense context
        isSVG,
        slotScopeIds
      );
      setActiveBranch(suspense, vnode.ssFallback);
    } else {
      suspense.resolve(false, true);
    }
  }