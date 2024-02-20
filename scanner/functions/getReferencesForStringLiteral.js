function getReferencesForStringLiteral(node, sourceFiles, checker, cancellationToken) {
                        const type = getContextualTypeFromParentOrAncestorTypeNode(node, checker);
                        const references = flatMap(sourceFiles, (sourceFile) => {
                            cancellationToken.throwIfCancellationRequested();
                            return mapDefined(getPossibleSymbolReferenceNodes(sourceFile, node.text), (ref) => {
                                if (isStringLiteralLike(ref) && ref.text === node.text) {
                                    if (type) {
                                        const refType = getContextualTypeFromParentOrAncestorTypeNode(ref, checker);
                                        if (type !== checker.getStringType() && type === refType) {
                                            return nodeEntry(ref, 2 /* StringLiteral */);
                                        }
                                    }
                                    else {
                                        return isNoSubstitutionTemplateLiteral(ref) && !rangeIsOnSingleLine(ref, sourceFile) ? void 0 : nodeEntry(ref, 2 /* StringLiteral */);
                                    }
                                }
                            });
                        });
                        return [{
                                definition: { type: 4 /* String */, node },
                                references
                            }];
                    }