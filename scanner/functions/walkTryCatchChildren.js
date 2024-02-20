function walkTryCatchChildren(preAst, parent, walker) {
            if(preAst.tryNode) {
                preAst.tryNode = walker.walk(preAst.tryNode, preAst);
            }
            if((preAst.catchNode) && walker.options.goNextSibling) {
                preAst.catchNode = walker.walk(preAst.catchNode, preAst);
            }
        }