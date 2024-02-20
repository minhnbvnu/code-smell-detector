function add_tag_name() {
      if (node2.tag_expr.node.type === "Literal") {
        renderer.add_string(node2.tag_expr.node.value);
      } else {
        renderer.add_expression(node2.tag_expr.node);
      }
    }