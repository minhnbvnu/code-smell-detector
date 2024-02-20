function transformAndReplaceLatePaintedStatements(statements) {
                while (length(lateMarkedStatements)) {
                    const i = lateMarkedStatements.shift();
                    if (!isLateVisibilityPaintedStatement(i)) {
                        return Debug.fail(`Late replaced statement was found which is not handled by the declaration transformer!: ${Debug.formatSyntaxKind(i.kind)}`);
                    }
                    const priorNeedsDeclare = needsDeclare;
                    needsDeclare = i.parent && isSourceFile(i.parent) && !(isExternalModule(i.parent) && isBundledEmit);
                    const result = transformTopLevelDeclaration(i);
                    needsDeclare = priorNeedsDeclare;
                    lateStatementReplacementMap.set(getOriginalNodeId(i), result);
                }
                return visitNodes2(statements, visitLateVisibilityMarkedStatements, isStatement);
                function visitLateVisibilityMarkedStatements(statement) {
                    if (isLateVisibilityPaintedStatement(statement)) {
                        const key = getOriginalNodeId(statement);
                        if (lateStatementReplacementMap.has(key)) {
                            const result = lateStatementReplacementMap.get(key);
                            lateStatementReplacementMap.delete(key);
                            if (result) {
                                if (isArray(result) ? some(result, needsScopeMarker) : needsScopeMarker(result)) {
                                    needsScopeFixMarker = true;
                                }
                                if (isSourceFile(statement.parent) && (isArray(result) ? some(result, isExternalModuleIndicator) : isExternalModuleIndicator(result))) {
                                    resultHasExternalModuleIndicator = true;
                                }
                            }
                            return result;
                        }
                    }
                    return statement;
                }
            }