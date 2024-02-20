function convertForOfStatementForArray(node, outermostLabeledStatement, convertedLoopBodyStatements) {
                const expression = visitNode(node.expression, visitor, isExpression);
                Debug.assert(expression);
                const counter = factory2.createLoopVariable();
                const rhsReference = isIdentifier(expression) ? factory2.getGeneratedNameForNode(expression) : factory2.createTempVariable(
                /*recordTempVariable*/
                void 0);
                setEmitFlags(expression, 96 /* NoSourceMap */ | getEmitFlags(expression));
                const forStatement = setTextRange(factory2.createForStatement(
                /*initializer*/
                setEmitFlags(setTextRange(factory2.createVariableDeclarationList([
                    setTextRange(factory2.createVariableDeclaration(counter, 
                    /*exclamationToken*/
                    void 0, 
                    /*type*/
                    void 0, factory2.createNumericLiteral(0)), moveRangePos(node.expression, -1)),
                    setTextRange(factory2.createVariableDeclaration(rhsReference, 
                    /*exclamationToken*/
                    void 0, 
                    /*type*/
                    void 0, expression), node.expression)
                ]), node.expression), 4194304 /* NoHoisting */), 
                /*condition*/
                setTextRange(factory2.createLessThan(counter, factory2.createPropertyAccessExpression(rhsReference, "length")), node.expression), 
                /*incrementor*/
                setTextRange(factory2.createPostfixIncrement(counter), node.expression), 
                /*statement*/
                convertForOfStatementHead(node, factory2.createElementAccessExpression(rhsReference, counter), convertedLoopBodyStatements)), 
                /*location*/
                node);
                setEmitFlags(forStatement, 512 /* NoTokenTrailingSourceMaps */);
                setTextRange(forStatement, node);
                return factory2.restoreEnclosingLabel(forStatement, outermostLabeledStatement, convertedLoopState && resetLabel);
            }