function get_const_tags(children, component, node2, parent) {
    const const_tags = [];
    const others = [];
    for (const child of children) {
      if (child.type === "ConstTag") {
        const_tags.push(child);
      } else {
        others.push(child);
      }
    }
    const consts_nodes = const_tags.map((tag2) => new ConstTag(component, node2, node2.scope, tag2));
    const sorted_consts_nodes = sort_consts_nodes(consts_nodes, component);
    sorted_consts_nodes.forEach((node3) => node3.parse_expression());
    const children_nodes = map_children(component, parent, node2.scope, others);
    return [sorted_consts_nodes, children_nodes];
  }