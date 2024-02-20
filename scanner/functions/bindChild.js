function bindChild(ctxlzr, next) {
  // If prev has one child already, branch the context and update the child.
  if (ctxlzr.child) {
    // When the branch-point is the 2nd through nth link in the chain, it is
    // necessary to track its segment separately so the branches can parent
    // their segments on the branch-point.
    if (ctxlzr.parentIdx !== -1) {
      ctxlzr.idx = ctxlzr.context.branch()
    }

    // The first child needs to be updated to have its own branch as well. And
    // each of that child's children must be updated with the new parent index.
    // This is the only non-constant-time action for linking, but it only
    // happens with branching promise chains specifically when the 2nd branch
    // is added.
    //
    // Note: This does not account for branches of branches. That may result
    // in improperly parented segments.
    let parent = ctxlzr
    let child = ctxlzr.child
    const branchIdx = ctxlzr.context.branch()
    do {
      child.parentIdx = parent.idx
      child.idx = branchIdx
      parent = child
      child = child.child
    } while (child)

    // We set the child to something falsey that isn't `null` so we can
    // distinguish between having no child, having one child, and having
    // multiple children.
    ctxlzr.child = false
  }

  // If this is a branching link then create a new branch for the next promise.
  // Otherwise, we can just piggy-back on the previous link's spot.
  const idx = ctxlzr.child === false ? ctxlzr.context.branch() : ctxlzr.idx

  // Create a new context for this next promise.
  next[symbols.context] = new Contextualizer(idx, ctxlzr.context)
  next[symbols.context].parentIdx = ctxlzr.idx

  // If this was our first child, remember it in case we have a 2nd.
  if (ctxlzr.child === null) {
    ctxlzr.child = next[symbols.context]
  }
}