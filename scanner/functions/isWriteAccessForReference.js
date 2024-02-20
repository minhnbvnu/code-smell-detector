function isWriteAccessForReference(node) {
            const decl = getDeclarationFromName(node);
            return !!decl && declarationIsWriteAccess(decl) || node.kind === 88 /* DefaultKeyword */ || isWriteAccess(node);
        }