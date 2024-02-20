function addRestParameterIfNeeded(statements, node, inConstructorWithSynthesizedSuper) {
                const prologueStatements = [];
                const parameter = lastOrUndefined(node.parameters);
                if (!shouldAddRestParameter(parameter, inConstructorWithSynthesizedSuper)) {
                    return false;
                }
                const declarationName = parameter.name.kind === 79 /* Identifier */ ? setParent(setTextRange(factory2.cloneNode(parameter.name), parameter.name), parameter.name.parent) : factory2.createTempVariable(
                /*recordTempVariable*/
                void 0);
                setEmitFlags(declarationName, 96 /* NoSourceMap */);
                const expressionName = parameter.name.kind === 79 /* Identifier */ ? factory2.cloneNode(parameter.name) : declarationName;
                const restIndex = node.parameters.length - 1;
                const temp = factory2.createLoopVariable();
                prologueStatements.push(setEmitFlags(setTextRange(factory2.createVariableStatement(
                /*modifiers*/
                void 0, factory2.createVariableDeclarationList([
                    factory2.createVariableDeclaration(declarationName, 
                    /*exclamationToken*/
                    void 0, 
                    /*type*/
                    void 0, factory2.createArrayLiteralExpression([]))
                ])), 
                /*location*/
                parameter), 2097152 /* CustomPrologue */));
                const forStatement = factory2.createForStatement(setTextRange(factory2.createVariableDeclarationList([
                    factory2.createVariableDeclaration(temp, 
                    /*exclamationToken*/
                    void 0, 
                    /*type*/
                    void 0, factory2.createNumericLiteral(restIndex))
                ]), parameter), setTextRange(factory2.createLessThan(temp, factory2.createPropertyAccessExpression(factory2.createIdentifier("arguments"), "length")), parameter), setTextRange(factory2.createPostfixIncrement(temp), parameter), factory2.createBlock([
                    startOnNewLine(setTextRange(factory2.createExpressionStatement(factory2.createAssignment(factory2.createElementAccessExpression(expressionName, restIndex === 0 ? temp : factory2.createSubtract(temp, factory2.createNumericLiteral(restIndex))), factory2.createElementAccessExpression(factory2.createIdentifier("arguments"), temp))), 
                    /*location*/
                    parameter))
                ]));
                setEmitFlags(forStatement, 2097152 /* CustomPrologue */);
                startOnNewLine(forStatement);
                prologueStatements.push(forStatement);
                if (parameter.name.kind !== 79 /* Identifier */) {
                    prologueStatements.push(setEmitFlags(setTextRange(factory2.createVariableStatement(
                    /*modifiers*/
                    void 0, factory2.createVariableDeclarationList(flattenDestructuringBinding(parameter, visitor, context, 0 /* All */, expressionName))), parameter), 2097152 /* CustomPrologue */));
                }
                insertStatementsAfterCustomPrologue(statements, prologueStatements);
                return true;
            }