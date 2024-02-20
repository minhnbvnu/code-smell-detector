function walkDoWhileStatementChildren(preAst, parent, walker) {
            preAst.cond = walker.walk(preAst.cond, preAst);
            if(preAst.body && (walker.options.goNextSibling)) {
                preAst.body = walker.walk(preAst.body, preAst);
            }
        }