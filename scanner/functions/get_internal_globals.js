function get_internal_globals(globals2, helpers) {
    return globals2.length > 0 && {
      type: "VariableDeclaration",
      kind: "const",
      declarations: [{
        type: "VariableDeclarator",
        id: {
          type: "ObjectPattern",
          properties: globals2.map((g2) => ({
            type: "Property",
            method: false,
            shorthand: false,
            computed: false,
            key: { type: "Identifier", name: g2.name },
            value: g2.alias,
            kind: "init"
          }))
        },
        init: helpers.find(({ name: name2 }) => name2 === "globals").alias
      }]
    };
  }