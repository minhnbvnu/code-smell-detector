function typeToDisplayParts(typechecker, type, enclosingDeclaration, flags = 0 /* None */) {
            return mapToDisplayParts((writer) => {
                typechecker.writeType(type, enclosingDeclaration, flags | 1024 /* MultilineObjectLiterals */ | 16384 /* UseAliasDefinedOutsideCurrentScope */, writer);
            });
        }