function walkScriptChildren(preAst, parent, walker) {
            if(preAst.bod) {
                preAst.bod = walker.walk(preAst.bod, preAst);
            }
        }