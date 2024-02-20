function transformES2019(context) {
            const factory2 = context.factory;
            return chainBundle(context, transformSourceFile);
            function transformSourceFile(node) {
                if (node.isDeclarationFile) {
                    return node;
                }
                return visitEachChild(node, visitor, context);
            }
            function visitor(node) {
                if ((node.transformFlags & 64 /* ContainsES2019 */) === 0) {
                    return node;
                }
                switch (node.kind) {
                    case 295 /* CatchClause */:
                        return visitCatchClause(node);
                    default:
                        return visitEachChild(node, visitor, context);
                }
            }
            function visitCatchClause(node) {
                if (!node.variableDeclaration) {
                    return factory2.updateCatchClause(node, factory2.createVariableDeclaration(factory2.createTempVariable(
                    /*recordTempVariable*/
                    void 0)), visitNode(node.block, visitor, isBlock));
                }
                return visitEachChild(node, visitor, context);
            }
        }