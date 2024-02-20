function walkIfStatementChildren(preAst, parent, walker) {
            preAst.cond = walker.walk(preAst.cond, preAst);
            if(preAst.thenBod && (walker.options.goNextSibling)) {
                preAst.thenBod = walker.walk(preAst.thenBod, preAst);
            }
            if(preAst.elseBod && (walker.options.goNextSibling)) {
                preAst.elseBod = walker.walk(preAst.elseBod, preAst);
            }
        }