function checkTryStatement(node) {
                checkGrammarStatementInAmbientContext(node);
                checkBlock(node.tryBlock);
                const catchClause = node.catchClause;
                if (catchClause) {
                    if (catchClause.variableDeclaration) {
                        const declaration = catchClause.variableDeclaration;
                        checkVariableLikeDeclaration(declaration);
                        const typeNode = getEffectiveTypeAnnotationNode(declaration);
                        if (typeNode) {
                            const type = getTypeFromTypeNode(typeNode);
                            if (type && !(type.flags & 3 /* AnyOrUnknown */)) {
                                grammarErrorOnFirstToken(typeNode, Diagnostics.Catch_clause_variable_type_annotation_must_be_any_or_unknown_if_specified);
                            }
                        }
                        else if (declaration.initializer) {
                            grammarErrorOnFirstToken(declaration.initializer, Diagnostics.Catch_clause_variable_cannot_have_an_initializer);
                        }
                        else {
                            const blockLocals = catchClause.block.locals;
                            if (blockLocals) {
                                forEachKey(catchClause.locals, (caughtName) => {
                                    const blockLocal = blockLocals.get(caughtName);
                                    if ((blockLocal == null ? void 0 : blockLocal.valueDeclaration) && (blockLocal.flags & 2 /* BlockScopedVariable */) !== 0) {
                                        grammarErrorOnNode(blockLocal.valueDeclaration, Diagnostics.Cannot_redeclare_identifier_0_in_catch_clause, caughtName);
                                    }
                                });
                            }
                        }
                    }
                    checkBlock(catchClause.block);
                }
                if (node.finallyBlock) {
                    checkBlock(node.finallyBlock);
                }
            }