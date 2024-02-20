function visitVariableDeclaration(node) {
                const ancestorFacts = enterSubtree(32 /* ExportedVariableStatement */, 0 /* None */);
                let updated;
                if (isBindingPattern(node.name)) {
                    updated = flattenDestructuringBinding(node, visitor, context, 0 /* All */, 
                    /*value*/
                    void 0, (ancestorFacts & 32 /* ExportedVariableStatement */) !== 0);
                }
                else {
                    updated = visitEachChild(node, visitor, context);
                }
                exitSubtree(ancestorFacts, 0 /* None */, 0 /* None */);
                return updated;
            }