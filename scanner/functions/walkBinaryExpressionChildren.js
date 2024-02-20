function walkBinaryExpressionChildren(preAst, parent, walker) {
            if(walker.options.reverseSiblings) {
                if(preAst.operand2) {
                    preAst.operand2 = walker.walk(preAst.operand2, preAst);
                }
                if((preAst.operand1) && (walker.options.goNextSibling)) {
                    preAst.operand1 = walker.walk(preAst.operand1, preAst);
                }
            } else {
                if(preAst.operand1) {
                    preAst.operand1 = walker.walk(preAst.operand1, preAst);
                }
                if((preAst.operand2) && (walker.options.goNextSibling)) {
                    preAst.operand2 = walker.walk(preAst.operand2, preAst);
                }
            }
        }