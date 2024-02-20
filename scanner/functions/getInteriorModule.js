function getInteriorModule(decl) {
            return decl.body && isModuleDeclaration(decl.body) ? getInteriorModule(decl.body) : decl;
        }