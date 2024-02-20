function walkTryFinallyChildren(preAst, parent, walker) {
            if(preAst.tryNode) {
                preAst.tryNode = walker.walk(preAst.tryNode, preAst);
            }
            if(preAst.finallyNode && walker.options.goNextSibling) {
                preAst.finallyNode = walker.walk(preAst.finallyNode, preAst);
            }
        }