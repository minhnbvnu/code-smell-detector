function walkClassDeclChildren(preAst, parent, walker) {
            walkNamedTypeChildren(preAst, parent, walker);
            if(walker.options.goNextSibling && preAst.extendsList) {
                preAst.extendsList = walker.walk(preAst.extendsList, preAst);
            }
            if(walker.options.goNextSibling && preAst.implementsList) {
                preAst.implementsList = walker.walk(preAst.implementsList, preAst);
            }
        }