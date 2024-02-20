function walkTypeReferenceChildren(preAst, parent, walker) {
            if(preAst.term) {
                preAst.term = walker.walk(preAst.term, preAst);
            }
        }