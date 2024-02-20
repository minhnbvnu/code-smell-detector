function isRouteInternal(me, you) {
  if (me === null) { return false; }
  if (me === you) { return true; }

  for (let i = 0, len = me.children.length; i < len; i++) {
    const child = me.children[i];

    if (child.visited !== true) {
      child.visited = true;
      const found = isRouteInternal(child, you);
      if (found === true) return true;
    }
  }

  return false;
}