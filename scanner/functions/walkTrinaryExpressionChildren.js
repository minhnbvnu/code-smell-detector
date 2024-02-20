function walkTrinaryExpressionChildren(preAst, parent, walker) {
            if(preAst.operand1) {
                preAst.operand1 = walker.walk(preAst.operand1, preAst);
            }
            if(preAst.operand2 && (walker.options.goNextSibling)) {
                preAst.operand2 = walker.walk(preAst.operand2, preAst);
            }
            if(preAst.operand3 && (walker.options.goNextSibling)) {
                preAst.operand3 = walker.walk(preAst.operand3, preAst);
            }
        }