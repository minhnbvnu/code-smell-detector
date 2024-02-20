function isTypeParameterPossiblyReferenced(tp, node) {
                if (tp.symbol && tp.symbol.declarations && tp.symbol.declarations.length === 1) {
                    const container = tp.symbol.declarations[0].parent;
                    for (let n = node; n !== container; n = n.parent) {
                        if (!n || n.kind === 238 /* Block */ || n.kind === 191 /* ConditionalType */ && forEachChild(n.extendsType, containsReference)) {
                            return true;
                        }
                    }
                    return containsReference(node);
                }
                return true;
                function containsReference(node2) {
                    switch (node2.kind) {
                        case 194 /* ThisType */:
                            return !!tp.isThisType;
                        case 79 /* Identifier */:
                            return !tp.isThisType && isPartOfTypeNode(node2) && maybeTypeParameterReference(node2) && getTypeFromTypeNodeWorker(node2) === tp;
                        case 183 /* TypeQuery */:
                            const entityName = node2.exprName;
                            const firstIdentifier = getFirstIdentifier(entityName);
                            const firstIdentifierSymbol = getResolvedSymbol(firstIdentifier);
                            const tpDeclaration = tp.symbol.declarations[0];
                            let tpScope;
                            if (tpDeclaration.kind === 165 /* TypeParameter */) {
                                tpScope = tpDeclaration.parent;
                            }
                            else if (tp.isThisType) {
                                tpScope = tpDeclaration;
                            }
                            else {
                                return true;
                            }
                            if (firstIdentifierSymbol.declarations) {
                                return some(firstIdentifierSymbol.declarations, (idDecl) => isNodeDescendantOf(idDecl, tpScope)) || some(node2.typeArguments, containsReference);
                            }
                            return true;
                        case 171 /* MethodDeclaration */:
                        case 170 /* MethodSignature */:
                            return !node2.type && !!node2.body || some(node2.typeParameters, containsReference) || some(node2.parameters, containsReference) || !!node2.type && containsReference(node2.type);
                    }
                    return !!forEachChild(node2, containsReference);
                }
            }