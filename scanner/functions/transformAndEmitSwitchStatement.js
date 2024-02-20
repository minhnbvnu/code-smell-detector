function transformAndEmitSwitchStatement(node) {
                if (containsYield(node.caseBlock)) {
                    const caseBlock = node.caseBlock;
                    const numClauses = caseBlock.clauses.length;
                    const endLabel = beginSwitchBlock();
                    const expression = cacheExpression(Debug.checkDefined(visitNode(node.expression, visitor, isExpression)));
                    const clauseLabels = [];
                    let defaultClauseIndex = -1;
                    for (let i = 0; i < numClauses; i++) {
                        const clause = caseBlock.clauses[i];
                        clauseLabels.push(defineLabel());
                        if (clause.kind === 293 /* DefaultClause */ && defaultClauseIndex === -1) {
                            defaultClauseIndex = i;
                        }
                    }
                    let clausesWritten = 0;
                    let pendingClauses = [];
                    while (clausesWritten < numClauses) {
                        let defaultClausesSkipped = 0;
                        for (let i = clausesWritten; i < numClauses; i++) {
                            const clause = caseBlock.clauses[i];
                            if (clause.kind === 292 /* CaseClause */) {
                                if (containsYield(clause.expression) && pendingClauses.length > 0) {
                                    break;
                                }
                                pendingClauses.push(factory2.createCaseClause(Debug.checkDefined(visitNode(clause.expression, visitor, isExpression)), [
                                    createInlineBreak(clauseLabels[i], 
                                    /*location*/
                                    clause.expression)
                                ]));
                            }
                            else {
                                defaultClausesSkipped++;
                            }
                        }
                        if (pendingClauses.length) {
                            emitStatement(factory2.createSwitchStatement(expression, factory2.createCaseBlock(pendingClauses)));
                            clausesWritten += pendingClauses.length;
                            pendingClauses = [];
                        }
                        if (defaultClausesSkipped > 0) {
                            clausesWritten += defaultClausesSkipped;
                            defaultClausesSkipped = 0;
                        }
                    }
                    if (defaultClauseIndex >= 0) {
                        emitBreak(clauseLabels[defaultClauseIndex]);
                    }
                    else {
                        emitBreak(endLabel);
                    }
                    for (let i = 0; i < numClauses; i++) {
                        markLabel(clauseLabels[i]);
                        transformAndEmitStatements(caseBlock.clauses[i].statements);
                    }
                    endSwitchBlock();
                }
                else {
                    emitStatement(visitNode(node, visitor, isStatement));
                }
            }