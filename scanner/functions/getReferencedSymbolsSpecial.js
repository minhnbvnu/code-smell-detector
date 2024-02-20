function getReferencedSymbolsSpecial(node, sourceFiles, cancellationToken) {
                        if (isTypeKeyword(node.kind)) {
                            if (node.kind === 114 /* VoidKeyword */ && isVoidExpression(node.parent)) {
                                return void 0;
                            }
                            if (node.kind === 146 /* ReadonlyKeyword */ && !isReadonlyTypeOperator(node)) {
                                return void 0;
                            }
                            return getAllReferencesForKeyword(sourceFiles, node.kind, cancellationToken, node.kind === 146 /* ReadonlyKeyword */ ? isReadonlyTypeOperator : void 0);
                        }
                        if (isImportMeta(node.parent) && node.parent.name === node) {
                            return getAllReferencesForImportMeta(sourceFiles, cancellationToken);
                        }
                        if (isStaticModifier(node) && isClassStaticBlockDeclaration(node.parent)) {
                            return [{ definition: { type: 2 /* Keyword */, node }, references: [nodeEntry(node)] }];
                        }
                        if (isJumpStatementTarget(node)) {
                            const labelDefinition = getTargetLabel(node.parent, node.text);
                            return labelDefinition && getLabelReferencesInNode(labelDefinition.parent, labelDefinition);
                        }
                        else if (isLabelOfLabeledStatement(node)) {
                            return getLabelReferencesInNode(node.parent, node);
                        }
                        if (isThis(node)) {
                            return getReferencesForThisKeyword(node, sourceFiles, cancellationToken);
                        }
                        if (node.kind === 106 /* SuperKeyword */) {
                            return getReferencesForSuperKeyword(node);
                        }
                        return void 0;
                    }