function walkWithStatementChildren(preAst, parent, walker) {
            if(preAst.expr) {
                preAst.expr = walker.walk(preAst.expr, preAst);
            }
            if(preAst.body && walker.options.goNextSibling) {
                preAst.body = walker.walk(preAst.body, preAst);
            }
        }