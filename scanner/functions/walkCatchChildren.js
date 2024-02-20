function walkCatchChildren(preAst, parent, walker) {
            if(preAst.param) {
                preAst.param = walker.walk(preAst.param, preAst);
            }
            if((preAst.body) && walker.options.goNextSibling) {
                preAst.body = walker.walk(preAst.body, preAst);
            }
        }