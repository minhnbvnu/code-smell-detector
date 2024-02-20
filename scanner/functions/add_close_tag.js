function add_close_tag() {
      if (node2.tag_expr.node.type === "Literal") {
        if (!is_void(node2.tag_expr.node.value)) {
          renderer.add_string("</");
          add_tag_name();
          renderer.add_string(">");
        }
        return;
      }
      renderer.add_expression(x`@is_void(#tag) ? '' : \`</\${#tag}>\``);
    }