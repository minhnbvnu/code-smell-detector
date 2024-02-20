function cjs(program, name2, banner, sveltePath, internal_path, helpers, globals2, imports, module_exports, exports_from) {
    const internal_requires = {
      type: "VariableDeclaration",
      kind: "const",
      declarations: [{
        type: "VariableDeclarator",
        id: {
          type: "ObjectPattern",
          properties: helpers.map((h2) => ({
            type: "Property",
            method: false,
            shorthand: false,
            computed: false,
            key: { type: "Identifier", name: h2.name },
            value: h2.alias,
            kind: "init"
          }))
        },
        init: x`require("${internal_path}")`
      }]
    };
    const internal_globals = get_internal_globals(globals2, helpers);
    const user_requires = imports.map((node2) => {
      const init = x`require("${edit_source(node2.source.value, sveltePath)}")`;
      if (node2.specifiers.length === 0) {
        return b`${init};`;
      }
      return {
        type: "VariableDeclaration",
        kind: "const",
        declarations: [{
          type: "VariableDeclarator",
          id: node2.specifiers[0].type === "ImportNamespaceSpecifier" ? { type: "Identifier", name: node2.specifiers[0].local.name } : {
            type: "ObjectPattern",
            properties: node2.specifiers.map((s) => ({
              type: "Property",
              method: false,
              shorthand: false,
              computed: false,
              key: s.type === "ImportSpecifier" ? s.imported : { type: "Identifier", name: "default" },
              value: s.local,
              kind: "init"
            }))
          },
          init
        }]
      };
    });
    const exports = module_exports.map((x2) => b`exports.${{ type: "Identifier", name: x2.as }} = ${{ type: "Identifier", name: x2.name }};`);
    const user_exports_from = exports_from.map((node2) => {
      const init = x`require("${edit_source(node2.source.value, sveltePath)}")`;
      return node2.specifiers.map((specifier) => {
        return b`exports.${specifier.exported} = ${init}.${specifier.local};`;
      });
    });
    program.body = b`
		/* ${banner} */

		"use strict";
		${internal_requires}
		${internal_globals}
		${user_requires}
		${user_exports_from}

		${program.body}

		exports.default = ${name2};
		${exports}
	`;
  }