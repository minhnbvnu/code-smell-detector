function map_children(component, parent, scope, children) {
    let last = null;
    let ignores = [];
    return children.map((child) => {
      const constructor = get_constructor(child.type);
      const use_ignores = child.type !== "Text" && child.type !== "Comment" && ignores.length;
      if (use_ignores)
        component.push_ignores(ignores);
      const node2 = new constructor(component, parent, scope, child);
      if (use_ignores)
        component.pop_ignores(), ignores = [];
      if (node2.type === "Comment" && node2.ignores.length) {
        push_array$1(ignores, node2.ignores);
      }
      if (last)
        last.next = node2;
      node2.prev = last;
      last = node2;
      return node2;
    });
  }