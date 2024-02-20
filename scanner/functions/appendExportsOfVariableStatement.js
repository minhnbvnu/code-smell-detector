function appendExportsOfVariableStatement(statements, node, exportSelf) {
                if (moduleInfo.exportEquals) {
                    return statements;
                }
                for (const decl of node.declarationList.declarations) {
                    if (decl.initializer || exportSelf) {
                        statements = appendExportsOfBindingElement(statements, decl, exportSelf);
                    }
                }
                return statements;
            }