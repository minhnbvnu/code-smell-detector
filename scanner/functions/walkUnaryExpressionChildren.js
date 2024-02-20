function walkUnaryExpressionChildren(preAst, parent, walker) {
            if(preAst.castTerm) {
                preAst.castTerm = walker.walk(preAst.castTerm, preAst);
            }
            if(preAst.operand) {
                preAst.operand = walker.walk(preAst.operand, preAst);
            }
        }