function walkFinallyChildren(preAst, parent, walker) {
            if(preAst.body) {
                preAst.body = walker.walk(preAst.body, preAst);
            }
        }