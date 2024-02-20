function walkBlockChildren(preAst, parent, walker) {
            if(preAst.statements) {
                preAst.statements = walker.walk(preAst.statements, preAst);
            }
        }