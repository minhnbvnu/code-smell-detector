function removeReturns(stmts, prevArgName, transformer, seenReturnStatement) {
            const ret = [];
            for (const stmt of stmts) {
                if (isReturnStatement(stmt)) {
                    if (stmt.expression) {
                        const possiblyAwaitedExpression = isPromiseTypedExpression(stmt.expression, transformer.checker) ? factory.createAwaitExpression(stmt.expression) : stmt.expression;
                        if (prevArgName === void 0) {
                            ret.push(factory.createExpressionStatement(possiblyAwaitedExpression));
                        }
                        else if (isSynthIdentifier(prevArgName) && prevArgName.hasBeenDeclared) {
                            ret.push(factory.createExpressionStatement(factory.createAssignment(referenceSynthIdentifier(prevArgName), possiblyAwaitedExpression)));
                        }
                        else {
                            ret.push(factory.createVariableStatement(
                            /*modifiers*/
                            void 0, factory.createVariableDeclarationList([factory.createVariableDeclaration(declareSynthBindingName(prevArgName), 
                                /*exclamationToken*/
                                void 0, 
                                /*type*/
                                void 0, possiblyAwaitedExpression)], 2 /* Const */)));
                        }
                    }
                }
                else {
                    ret.push(getSynthesizedDeepClone(stmt));
                }
            }
            if (!seenReturnStatement && prevArgName !== void 0) {
                ret.push(factory.createVariableStatement(
                /*modifiers*/
                void 0, factory.createVariableDeclarationList([factory.createVariableDeclaration(declareSynthBindingName(prevArgName), 
                    /*exclamationToken*/
                    void 0, 
                    /*type*/
                    void 0, factory.createIdentifier("undefined"))], 2 /* Const */)));
            }
            return ret;
        }