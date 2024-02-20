function hoistStatic(root, context) {
    walk(
      root,
      context,
      // Root node is unfortunately non-hoistable due to potential parent
      // fallthrough attributes.
      isSingleElementRoot(root, root.children[0])
    );
  }