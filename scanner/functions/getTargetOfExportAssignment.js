function getTargetOfExportAssignment(node, dontResolveAlias) {
                const expression = isExportAssignment(node) ? node.expression : node.right;
                const resolved = getTargetOfAliasLikeExpression(expression, dontResolveAlias);
                markSymbolOfAliasDeclarationIfTypeOnly(node, 
                /*immediateTarget*/
                void 0, resolved, 
                /*overwriteEmpty*/
                false);
                return resolved;
            }