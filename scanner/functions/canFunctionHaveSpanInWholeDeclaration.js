function canFunctionHaveSpanInWholeDeclaration(functionDeclaration) {
                    return hasSyntacticModifier(functionDeclaration, 1 /* Export */) || functionDeclaration.parent.kind === 260 /* ClassDeclaration */ && functionDeclaration.kind !== 173 /* Constructor */;
                }