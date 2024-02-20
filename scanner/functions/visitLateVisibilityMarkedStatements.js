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