function collectTypeParameters(checker, selection, enclosingNode, file) {
            const result = [];
            return visitor(selection) ? void 0 : result;
            function visitor(node) {
                if (isTypeReferenceNode(node)) {
                    if (isIdentifier(node.typeName)) {
                        const typeName = node.typeName;
                        const symbol = checker.resolveName(typeName.text, typeName, 262144 /* TypeParameter */, 
                        /* excludeGlobals */
                        true);
                        for (const decl of (symbol == null ? void 0 : symbol.declarations) || emptyArray) {
                            if (isTypeParameterDeclaration(decl) && decl.getSourceFile() === file) {
                                if (decl.name.escapedText === typeName.escapedText && rangeContainsSkipTrivia(decl, selection, file)) {
                                    return true;
                                }
                                if (rangeContainsSkipTrivia(enclosingNode, decl, file) && !rangeContainsSkipTrivia(selection, decl, file)) {
                                    pushIfUnique(result, decl);
                                    break;
                                }
                            }
                        }
                    }
                }
                else if (isInferTypeNode(node)) {
                    const conditionalTypeNode = findAncestor(node, (n) => isConditionalTypeNode(n) && rangeContainsSkipTrivia(n.extendsType, node, file));
                    if (!conditionalTypeNode || !rangeContainsSkipTrivia(selection, conditionalTypeNode, file)) {
                        return true;
                    }
                }
                else if (isTypePredicateNode(node) || isThisTypeNode(node)) {
                    const functionLikeNode = findAncestor(node.parent, isFunctionLike);
                    if (functionLikeNode && functionLikeNode.type && rangeContainsSkipTrivia(functionLikeNode.type, node, file) && !rangeContainsSkipTrivia(selection, functionLikeNode, file)) {
                        return true;
                    }
                }
                else if (isTypeQueryNode(node)) {
                    if (isIdentifier(node.exprName)) {
                        const symbol = checker.resolveName(node.exprName.text, node.exprName, 111551 /* Value */, 
                        /* excludeGlobals */
                        false);
                        if ((symbol == null ? void 0 : symbol.valueDeclaration) && rangeContainsSkipTrivia(enclosingNode, symbol.valueDeclaration, file) && !rangeContainsSkipTrivia(selection, symbol.valueDeclaration, file)) {
                            return true;
                        }
                    }
                    else {
                        if (isThisIdentifier(node.exprName.left) && !rangeContainsSkipTrivia(selection, node.parent, file)) {
                            return true;
                        }
                    }
                }
                if (file && isTupleTypeNode(node) && getLineAndCharacterOfPosition(file, node.pos).line === getLineAndCharacterOfPosition(file, node.end).line) {
                    setEmitFlags(node, 1 /* SingleLine */);
                }
                return forEachChild(node, visitor);
            }
        }