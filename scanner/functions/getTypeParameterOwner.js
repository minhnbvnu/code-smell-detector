function getTypeParameterOwner(d) {
            if (d && d.kind === 165 /* TypeParameter */) {
                for (let current = d; current; current = current.parent) {
                    if (isFunctionLike(current) || isClassLike(current) || current.kind === 261 /* InterfaceDeclaration */) {
                        return current;
                    }
                }
            }
        }