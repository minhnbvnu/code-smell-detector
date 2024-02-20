function walkForInStatementChildren(preAst, parent, walker) {
            preAst.lval = walker.walk(preAst.lval, preAst);
            if(walker.options.goNextSibling) {
                preAst.obj = walker.walk(preAst.obj, preAst);
            }
            if(preAst.body && (walker.options.goNextSibling)) {
                preAst.body = walker.walk(preAst.body, preAst);
            }
        }