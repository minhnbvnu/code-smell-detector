function walkBoundDeclChildren(preAst, parent, walker) {
            if(preAst.id) {
                preAst.id = walker.walk(preAst.id, preAst);
            }
            if(preAst.init) {
                preAst.init = walker.walk(preAst.init, preAst);
            }
            if((preAst.typeExpr) && (walker.options.goNextSibling)) {
                preAst.typeExpr = walker.walk(preAst.typeExpr, preAst);
            }
        }