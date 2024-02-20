function walkLabeledStatementChildren(preAst, parent, walker) {
            preAst.labels = walker.walk(preAst.labels, preAst);
            if(walker.options.goNextSibling) {
                preAst.stmt = walker.walk(preAst.stmt, preAst);
            }
        }