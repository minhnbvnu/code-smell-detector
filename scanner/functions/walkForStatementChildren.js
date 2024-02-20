function walkForStatementChildren(preAst, parent, walker) {
            if(preAst.init) {
                preAst.init = walker.walk(preAst.init, preAst);
            }
            if(preAst.cond && walker.options.goNextSibling) {
                preAst.cond = walker.walk(preAst.cond, preAst);
            }
            if(preAst.incr && walker.options.goNextSibling) {
                preAst.incr = walker.walk(preAst.incr, preAst);
            }
            if(preAst.body && walker.options.goNextSibling) {
                preAst.body = walker.walk(preAst.body, preAst);
            }
        }