function getSwitchClauseTypeOfWitnesses(switchStatement) {
                if (some(switchStatement.caseBlock.clauses, (clause) => clause.kind === 292 /* CaseClause */ && !isStringLiteralLike(clause.expression))) {
                    return void 0;
                }
                const witnesses = [];
                for (const clause of switchStatement.caseBlock.clauses) {
                    const text = clause.kind === 292 /* CaseClause */ ? clause.expression.text : void 0;
                    witnesses.push(text && !contains(witnesses, text) ? text : void 0);
                }
                return witnesses;
            }