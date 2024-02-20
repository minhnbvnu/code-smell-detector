function walkImportDeclChildren(preAst, parent, walker) {
            if(preAst.id) {
                preAst.id = walker.walk(preAst.id, preAst);
            }
            if(preAst.alias) {
                preAst.alias = walker.walk(preAst.alias, preAst);
            }
        }