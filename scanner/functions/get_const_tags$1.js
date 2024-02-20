function get_const_tags$1(const_tags) {
    if (const_tags.length === 0)
      return null;
    return {
      type: "VariableDeclaration",
      kind: "let",
      declarations: const_tags.map((const_tag) => {
        const assignment = const_tag.node.expression;
        return {
          type: "VariableDeclarator",
          id: assignment.left,
          init: assignment.right
        };
      })
    };
  }