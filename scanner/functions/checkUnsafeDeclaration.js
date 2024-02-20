function checkUnsafeDeclaration(scope, node, unsafeKind) {
                const variable = scope.set.get(node.name);
                if (!variable) {
                    return;
                }
                const defs = variable.defs;
                if (defs.length <= 1) {
                    return;
                }
                if (defs.some(def => def.node.type === unsafeKind)) {
                    context.report({
                        node,
                        messageId: 'unsafeMerging',
                    });
                }
            }