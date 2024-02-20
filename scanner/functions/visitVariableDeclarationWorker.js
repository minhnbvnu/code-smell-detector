function visitVariableDeclarationWorker(node, exportedVariableStatement2) {
                if (isBindingPattern(node.name) && node.name.transformFlags & 65536 /* ContainsObjectRestOrSpread */) {
                    return flattenDestructuringBinding(node, visitor, context, 1 /* ObjectRest */, 
                    /*rval*/
                    void 0, exportedVariableStatement2);
                }
                return visitEachChild(node, visitor, context);
            }