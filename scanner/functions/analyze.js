function analyze(expression) {
    const map = /* @__PURE__ */ new WeakMap();
    const globals2 = /* @__PURE__ */ new Map();
    const scope = new Scope$1(null, false);
    const references = [];
    let current_scope = scope;
    walk(expression, {
      enter(node2, parent) {
        switch (node2.type) {
          case "Identifier":
            if (parent && is_reference(node2, parent)) {
              references.push([current_scope, node2]);
            }
            break;
          case "ImportDeclaration":
            node2.specifiers.forEach((specifier) => {
              current_scope.declarations.set(specifier.local.name, specifier);
            });
            break;
          case "FunctionExpression":
          case "FunctionDeclaration":
          case "ArrowFunctionExpression":
            if (node2.type === "FunctionDeclaration") {
              if (node2.id) {
                current_scope.declarations.set(node2.id.name, node2);
              }
              map.set(node2, current_scope = new Scope$1(current_scope, false));
            } else {
              map.set(node2, current_scope = new Scope$1(current_scope, false));
              if (node2.type === "FunctionExpression" && node2.id) {
                current_scope.declarations.set(node2.id.name, node2);
              }
            }
            node2.params.forEach((param) => {
              extract_names(param).forEach((name2) => {
                current_scope.declarations.set(name2, node2);
              });
            });
            break;
          case "ForStatement":
          case "ForInStatement":
          case "ForOfStatement":
            map.set(node2, current_scope = new Scope$1(current_scope, true));
            break;
          case "BlockStatement":
            map.set(node2, current_scope = new Scope$1(current_scope, true));
            break;
          case "ClassDeclaration":
          case "VariableDeclaration":
            current_scope.add_declaration(node2);
            break;
          case "CatchClause":
            map.set(node2, current_scope = new Scope$1(current_scope, true));
            if (node2.param) {
              extract_names(node2.param).forEach((name2) => {
                if (node2.param) {
                  current_scope.declarations.set(name2, node2.param);
                }
              });
            }
            break;
        }
      },
      leave(node2) {
        if (map.has(node2) && current_scope !== null && current_scope.parent) {
          current_scope = current_scope.parent;
        }
      }
    });
    for (let i = references.length - 1; i >= 0; --i) {
      const [scope2, reference] = references[i];
      if (!scope2.references.has(reference.name)) {
        add_reference(scope2, reference.name);
      }
      if (!scope2.find_owner(reference.name)) {
        globals2.set(reference.name, reference);
      }
    }
    return { map, scope, globals: globals2 };
  }