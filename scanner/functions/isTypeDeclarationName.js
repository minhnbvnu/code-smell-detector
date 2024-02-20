function isTypeDeclarationName(name) {
                return name.kind === 79 /* Identifier */ && isTypeDeclaration(name.parent) && getNameOfDeclaration(name.parent) === name;
            }