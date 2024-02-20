function isVariableStatementOfTypeScriptClassWrapper(node) {
                return node.declarationList.declarations.length === 1 && !!node.declarationList.declarations[0].initializer && !!(getInternalEmitFlags(node.declarationList.declarations[0].initializer) & 1 /* TypeScriptClassWrapper */);
            }