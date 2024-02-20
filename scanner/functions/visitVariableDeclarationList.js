function visitVariableDeclarationList(node) {
                if (node.flags & 3 /* BlockScoped */ || node.transformFlags & 524288 /* ContainsBindingPattern */) {
                    if (node.flags & 3 /* BlockScoped */) {
                        enableSubstitutionsForBlockScopedBindings();
                    }
                    const declarations = visitNodes2(node.declarations, node.flags & 1 /* Let */ ? visitVariableDeclarationInLetDeclarationList : visitVariableDeclaration, isVariableDeclaration);
                    const declarationList = factory2.createVariableDeclarationList(declarations);
                    setOriginalNode(declarationList, node);
                    setTextRange(declarationList, node);
                    setCommentRange(declarationList, node);
                    if (node.transformFlags & 524288 /* ContainsBindingPattern */ && (isBindingPattern(node.declarations[0].name) || isBindingPattern(last(node.declarations).name))) {
                        setSourceMapRange(declarationList, getRangeUnion(declarations));
                    }
                    return declarationList;
                }
                return visitEachChild(node, visitor, context);
            }