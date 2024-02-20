function walkFuncDeclChildren(preAst, parent, walker) {
            if(preAst.name) {
                preAst.name = walker.walk(preAst.name, preAst);
            }
            if(preAst.arguments && (preAst.arguments.members.length > 0) && (walker.options.goNextSibling)) {
                preAst.arguments = walker.walk(preAst.arguments, preAst);
            }
            if(preAst.returnTypeAnnotation && (walker.options.goNextSibling)) {
                preAst.returnTypeAnnotation = walker.walk(preAst.returnTypeAnnotation, preAst);
            }
            if(preAst.bod && (preAst.bod.members.length > 0) && (walker.options.goNextSibling)) {
                preAst.bod = walker.walk(preAst.bod, preAst);
            }
        }