function getTypeArgumentOrTypeParameterList(node) {
            if (node.kind === 180 /* TypeReference */ || node.kind === 210 /* CallExpression */) {
                return node.typeArguments;
            }
            if (isFunctionLike(node) || node.kind === 260 /* ClassDeclaration */ || node.kind === 261 /* InterfaceDeclaration */) {
                return node.typeParameters;
            }
            return void 0;
        }