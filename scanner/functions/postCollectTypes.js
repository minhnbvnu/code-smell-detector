function postCollectTypes(ast, parent, walker) {
        var context = walker.state;
        if(ast.nodeType == TypeScript.NodeType.ModuleDeclaration) {
            TypeScript.popTypeCollectionScope(context);
        } else {
            if(ast.nodeType == TypeScript.NodeType.ClassDeclaration) {
                TypeScript.popTypeCollectionScope(context);
            } else {
                if(ast.nodeType == TypeScript.NodeType.InterfaceDeclaration) {
                    TypeScript.popTypeCollectionScope(context);
                }
            }
        }
        return ast;
    }