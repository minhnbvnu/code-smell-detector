function walkRecordChildren(preAst, parent, walker) {
            preAst.name = walker.walk(preAst.name, preAst);
            if(walker.options.goNextSibling && preAst.members) {
                preAst.members = walker.walk(preAst.members, preAst);
            }
        }