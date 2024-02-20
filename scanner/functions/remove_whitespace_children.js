function remove_whitespace_children(children, next) {
    const nodes = [];
    let last_child;
    let i = children.length;
    while (i--) {
      const child = children[i];
      if (child.type === "Text") {
        if (child.should_skip()) {
          continue;
        }
        let { data: data2 } = child;
        if (nodes.length === 0) {
          const should_trim = next ? next.type === "Text" && regex_starts_with_whitespace.test(next.data) && trimmable_at$1(child, next) : !child.has_ancestor("EachBlock");
          if (should_trim && !child.keep_space()) {
            data2 = trim_end(data2);
            if (!data2)
              continue;
          }
        }
        if (last_child && last_child.type === "Text") {
          last_child.data = data2 + last_child.data;
          continue;
        }
        nodes.unshift(child);
        link(last_child, last_child = child);
      } else {
        nodes.unshift(child);
        link(last_child, last_child = child);
      }
    }
    const first = nodes[0];
    if (first && first.type === "Text" && !first.keep_space()) {
      first.data = trim_start(first.data);
      if (!first.data) {
        first.var = null;
        nodes.shift();
        if (nodes[0]) {
          nodes[0].prev = null;
        }
      }
    }
    return nodes;
  }