function walkReturnStatementChildren(preAst, parent, walker) {
            if(preAst.returnExpression) {
                preAst.returnExpression = walker.walk(preAst.returnExpression, preAst);
            }
        }