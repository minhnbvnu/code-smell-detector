function isNotOverload(declaration) {
            return declaration.kind !== 259 /* FunctionDeclaration */ && declaration.kind !== 171 /* MethodDeclaration */ || !!declaration.body;
        }