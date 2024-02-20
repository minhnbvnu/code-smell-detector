function deleteUnusedImportsInVariableDeclaration(sourceFile, varDecl, changes, isUnused) {
            const { name } = varDecl;
            switch (name.kind) {
                case 79 /* Identifier */:
                    if (isUnused(name)) {
                        if (varDecl.initializer && isRequireCall(varDecl.initializer, 
                        /*requireStringLiteralLikeArgument*/
                        true)) {
                            changes.delete(sourceFile, isVariableDeclarationList(varDecl.parent) && length(varDecl.parent.declarations) === 1 ? varDecl.parent.parent : varDecl);
                        }
                        else {
                            changes.delete(sourceFile, name);
                        }
                    }
                    break;
                case 204 /* ArrayBindingPattern */:
                    break;
                case 203 /* ObjectBindingPattern */:
                    if (name.elements.every((e) => isIdentifier(e.name) && isUnused(e.name))) {
                        changes.delete(sourceFile, isVariableDeclarationList(varDecl.parent) && varDecl.parent.declarations.length === 1 ? varDecl.parent.parent : varDecl);
                    }
                    else {
                        for (const element of name.elements) {
                            if (isIdentifier(element.name) && isUnused(element.name)) {
                                changes.delete(sourceFile, element.name);
                            }
                        }
                    }
                    break;
            }
        }